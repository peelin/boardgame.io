/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

const Koa = require('koa');
const Router = require('koa-router');
const koaBody = require('koa-body');
const uuid = require('shortid').generate;
const cors = require('@koa/cors');

function sanitizeString(str) {
  str = str.replace(/[^a-z0-9áéíóúñü .,_-]/gim, '');
  return str.trim();
}

import { InitializeGame } from '../core/reducer';

const isGameMetadataKey = (key, gameName) =>
  key.match(gameName + ':.*:metadata');
const createGameMetadata = gameName => ({
  players: {},
  gameName,
});

const GameMetadataKey = gameID => `${gameID}:metadata`;

/**
 * Creates a new game.
 *
 * @param {object} db - The storage API.
 * @param {object} game - The game config object.
 * @param {number} numPlayers - The number of players.
 * @param {object} setupData - User-defined object that's available
 *                             during game setup.
 * @param {object } lobbyConfig - Configuration options for the lobby.
 */
const JoinGame = async (db, ctx, gameID, playerName) => {
  // Gets credentials for a new player
  const gameMetadata = await db.get(GameMetadataKey(gameID));

  const players = gameMetadata.players;
  if (!gameMetadata) {
    ctx.throw(404, 'Game ' + gameID + ' not found');
  }

  // Find an empty slot and join it
  var credentials = undefined;
  var playerID = undefined;

  //debug code
  console.log('Attempting to find slot for player');
  console.log(players);

  for (let i = 0; i < Object.keys(players).length; i++) {
    console.log('Checking slot ' + i);
    if (typeof players[i].name === 'undefined') {
      //Join the game
      playerID = i.toString();
      players[i].name = playerName;
      credentials = players[i].credentials;
      await db.set(GameMetadataKey(gameID), gameMetadata);
      break;
    }
  }

  // First player becomes host and gets admin powers
  // (all player credentials)
  var adminData = undefined;
  if (playerID === '0') {
    adminData = gameMetadata;
  }

  if (typeof credentials === 'undefined') {
    ctx.throw(409, 'Game is full!');
  }

  return {
    gameID,
    gameName: gameMetadata.gameName,
    credentials,
    playerID,
    adminData,
  };
};

export const CreateGame = async (
  db,
  game,
  numPlayers,
  setupData,
  lobbyConfig
) => {
  const gameMetadata = createGameMetadata(game.name);

  const state = InitializeGame({
    game,
    numPlayers,
    setupData,
  });

  for (let playerIndex = 0; playerIndex < numPlayers; playerIndex++) {
    const credentials = uuid();
    gameMetadata.players[playerIndex] = { id: playerIndex, credentials };
  }

  const gameID = lobbyConfig.uuid();

  await db.set(GameMetadataKey(gameID), gameMetadata);
  await db.set(gameID, state);

  return gameID;
};

export const createApiServer = ({ db, games, lobbyConfig }) => {
  const app = new Koa();
  return addApiToServer({ app, db, games, lobbyConfig });
};

export const addApiToServer = ({ app, db, games, lobbyConfig }) => {
  if (!lobbyConfig) {
    lobbyConfig = {};
  }
  if (!lobbyConfig.uuid) {
    lobbyConfig = { ...lobbyConfig, uuid };
  }
  const router = new Router();

  router.get('/games', async ctx => {
    ctx.body = games.map(game => game.name);
  });

  router.post('/games/:name/create', koaBody(), async ctx => {
    console.log('create version 2');
    const playerName = sanitizeString(ctx.request.body.playerName);
    // The name of the game (for example: tic-tac-toe).
    const gameName = sanitizeString(ctx.params.name);
    // User-data to pass to the game setup function.
    const setupData = ctx.request.body.setupData;
    // The number of players for this game instance.
    let numPlayers = parseInt(ctx.request.body.numPlayers);
    if (!numPlayers) {
      numPlayers = 2;
    }

    const game = games.find(g => g.name === gameName);
    const gameID = await CreateGame(
      db,
      game,
      numPlayers,
      setupData,
      lobbyConfig
    );
    const gameInfo = await JoinGame(db, ctx, gameID, playerName);
    ctx.body = gameInfo;
  });

  router.get('/games/:id', async ctx => {
    const gameID = sanitizeString(ctx.params.id);
    const room = await db.get(GameMetadataKey(gameID));
    if (!room) {
      ctx.throw(404, 'Room ' + gameID + ' not found');
    }
    const strippedRoom = {
      gameID,
      players: Object.values(room.players).map(player => {
        return { id: player.id, name: player.name };
      }),
    };
    ctx.body = strippedRoom;
  });

  router.post('/games/:id/join', koaBody(), async ctx => {
    const playerName = sanitizeString(ctx.request.body.playerName);
    const gameID = sanitizeString(ctx.params.id);
    if (!playerName) {
      ctx.throw(403, 'playerName is required');
    }

    const gameInfo = await JoinGame(db, ctx, gameID, playerName);
    ctx.body = gameInfo;
  });

  router.post('/games/:id/leave', koaBody(), async ctx => {
    const gameID = sanitizeString(ctx.params.id);
    const playerID = sanitizeString(ctx.request.body.playerID);
    const credentials = sanitizeString(ctx.request.body.credentials);
    const gameMetadata = await db.get(GameMetadataKey(gameID));
    if (typeof playerID === 'undefined') {
      ctx.throw(403, 'playerID is required');
    }

    if (!gameMetadata) {
      ctx.throw(404, 'Game ' + gameID + ' not found');
    }
    if (!gameMetadata.players[playerID]) {
      ctx.throw(404, 'Player ' + playerID + ' not found');
    }
    if (credentials !== gameMetadata.players[playerID].credentials) {
      ctx.throw(403, 'Invalid credentials ' + credentials);
    }

    delete gameMetadata.players[playerID].name;
    if (Object.values(gameMetadata.players).some(val => val.name)) {
      await db.set(GameMetadataKey(gameID), gameMetadata);
    } else {
      // remove room
      await db.remove(gameID);
      await db.remove(GameMetadataKey(gameID));
    }
    ctx.body = {};
  });

  router.post('/games/:id/rename', koaBody(), async ctx => {
    const gameID = sanitizeString(ctx.params.id);
    const playerID = sanitizeString(ctx.request.body.playerID);
    const credentials = sanitizeString(ctx.request.body.credentials);
    const newName = sanitizeString(ctx.request.body.newName);
    const gameMetadata = await db.get(GameMetadataKey(gameID));
    if (typeof playerID === 'undefined') {
      ctx.throw(403, 'playerID is required');
    }
    if (!newName) {
      ctx.throw(403, 'newName is required');
    }
    if (!gameMetadata) {
      ctx.throw(404, 'Game ' + gameID + ' not found');
    }
    if (!gameMetadata.players[playerID]) {
      ctx.throw(404, 'Player ' + playerID + ' not found');
    }
    if (credentials !== gameMetadata.players[playerID].credentials) {
      ctx.throw(403, 'Invalid credentials ' + credentials);
    }

    gameMetadata.players[playerID].name = newName;
    await db.set(GameMetadataKey(gameID), gameMetadata);
    ctx.body = {};
  });

  app.use(cors());

  // If API_SECRET is set, then require that requests set an
  // api-secret header that is set to the same value.
  app.use(async (ctx, next) => {
    if (
      !!process.env.API_SECRET &&
      ctx.request.headers['api-secret'] !== process.env.API_SECRET
    ) {
      ctx.throw(403, 'Invalid API secret');
    }

    await next();
  });

  app.use(router.routes()).use(router.allowedMethods());

  return app;
};
