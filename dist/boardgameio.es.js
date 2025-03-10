import { createStore, compose, applyMiddleware } from 'redux';
import io from 'socket.io-client';
import { parse, stringify } from 'flatted';
import produce from 'immer';
import React from 'react';
import PropTypes from 'prop-types';
import Mousetrap from 'mousetrap';
import { Vector3, Box3, Mesh, BoxBufferGeometry, MeshLambertMaterial, Object3D, BoxGeometry, TextureLoader, Group } from 'three';
import { Draggable, DragComponent } from 'react-dragtastic';
import TWEEN from '@tweenjs/tween.js';

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
var MAKE_MOVE = 'MAKE_MOVE';
var GAME_EVENT = 'GAME_EVENT';
var REDO = 'REDO';
var RESET = 'RESET';
var SYNC = 'SYNC';
var UNDO = 'UNDO';
var UPDATE = 'UPDATE';

/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
/**
 * Generate a move to be dispatched to the game move reducer.
 *
 * @param {string} type - The move type.
 * @param {Array}  args - Additional arguments.
 * @param {string}  playerID - The ID of the player making this action.
 * @param {string}  credentials - (optional) The credentials for the player making this action.
 */

var makeMove = function makeMove(type, args, playerID, credentials) {
  return {
    type: MAKE_MOVE,
    payload: {
      type: type,
      args: args,
      playerID: playerID,
      credentials: credentials
    }
  };
};
/**
 * Generate a game event to be dispatched to the flow reducer.
 *
 * @param {string} type - The event type.
 * @param {Array}  args - Additional arguments.
 * @param {string}  playerID - The ID of the player making this action.
 * @param {string}  credentials - (optional) The credentials for the player making this action.
 */

var gameEvent = function gameEvent(type, args, playerID, credentials) {
  return {
    type: GAME_EVENT,
    payload: {
      type: type,
      args: args,
      playerID: playerID,
      credentials: credentials
    }
  };
};
/**
 * Generate an automatic game event that is a side-effect of a move.
 * @param {string} type - The event type.
 * @param {Array}  args - Additional arguments.
 * @param {string}  playerID - The ID of the player making this action.
 * @param {string}  credentials - (optional) The credentials for the player making this action.
 */

var automaticGameEvent = function automaticGameEvent(type, args, playerID, credentials) {
  return {
    type: GAME_EVENT,
    payload: {
      type: type,
      args: args,
      playerID: playerID,
      credentials: credentials
    },
    automatic: true
  };
};
/**
 * Used to reset the Redux store's state on a sync.
 * @param {object} state - The state to restore.
 * @param {Array} log - The log to restore.
 */

var sync = function sync(state, log) {
  return {
    type: SYNC,
    state: state,
    log: log,
    clientOnly: true
  };
};
/**
 * Used to update the Redux store's state in response to
 * an action coming from another player.
 * @param {object} state - The state to restore.
 * @param {Array} deltalog - A log delta.
 */

var update = function update(state, deltalog) {
  return {
    type: UPDATE,
    state: state,
    deltalog: deltalog,
    clientOnly: true
  };
};
/**
 * Used to reset the game state.
 * @param {object} state - The initial state.
 */

var reset = function reset(state) {
  return {
    type: RESET,
    state: state,
    clientOnly: true
  };
};
/**
 * Used to undo the last move.
 */

var undo = function undo() {
  return {
    type: UNDO
  };
};
/**
 * Used to redo the last undone move.
 */

var redo = function redo() {
  return {
    type: REDO
  };
};

var ActionCreators = /*#__PURE__*/Object.freeze({
  makeMove: makeMove,
  gameEvent: gameEvent,
  automaticGameEvent: automaticGameEvent,
  sync: sync,
  update: update,
  reset: reset,
  undo: undo,
  redo: redo
});

/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
function error(error) {
}

/**
 * SocketIO
 *
 * Transport interface that interacts with the Master via socket.io.
 */

var SocketIO =
/*#__PURE__*/
function () {
  /**
   * Creates a new Mutiplayer instance.
   * @param {object} socket - Override for unit tests.
   * @param {object} socketOpts - Options to pass to socket.io.
   * @param {string} gameID - The game ID to connect to.
   * @param {string} playerID - The player ID associated with this client.
   * @param {string} gameName - The game type (the `name` field in `Game`).
   * @param {string} numPlayers - The number of players.
   * @param {string} server - The game server in the form of 'hostname:port'. Defaults to the server serving the client if not provided.
   */
  function SocketIO() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        socket = _ref.socket,
        socketOpts = _ref.socketOpts,
        store = _ref.store,
        gameID = _ref.gameID,
        playerID = _ref.playerID,
        gameName = _ref.gameName,
        numPlayers = _ref.numPlayers,
        server = _ref.server;

    _classCallCheck(this, SocketIO);

    this.server = server;
    this.socket = socket;
    this.store = store;
    this.socketOpts = socketOpts;
    this.gameName = gameName || 'default';
    this.gameID = gameID || 'default';
    this.playerID = playerID || null;
    this.numPlayers = numPlayers || 2;
    this.gameID = this.gameName + ':' + this.gameID;
    this.isConnected = false;

    this.callback = function () {};

    this.gameMetadataCallback = function () {};
  }
  /**
   * Called when an action that has to be relayed to the
   * game master is made.
   */


  _createClass(SocketIO, [{
    key: "onAction",
    value: function onAction(state, action) {
      this.socket.emit('update', action, state._stateID, this.gameID, this.playerID);
    }
    /**
     * Connect to the server.
     */

  }, {
    key: "connect",
    value: function connect() {
      var _this = this;

      if (!this.socket) {
        if (this.server) {
          var server = this.server;

          if (server.search(/^https?:\/\//) == -1) {
            server = 'http://' + this.server;
          }

          if (server.substr(-1) != '/') {
            // add trailing slash if not already present
            server = server + '/';
          }

          this.socket = io(server + this.gameName, this.socketOpts);
        } else {
          this.socket = io('/' + this.gameName, this.socketOpts);
        }
      } // Called when another player makes a move and the
      // master broadcasts the update to other clients (including
      // this one).


      this.socket.on('update', function (gameID, state, deltalog) {
        var currentState = _this.store.getState();

        if (gameID == _this.gameID && state._stateID >= currentState._stateID) {
          var action = update(state, deltalog);

          _this.store.dispatch(action);
        }
      }); // Called when the client first connects to the master
      // and requests the current game state.

      this.socket.on('sync', function (gameID, state, log, gameMetadata) {
        if (gameID == _this.gameID) {
          var action = sync(state, log);

          _this.store.dispatch(action);

          _this.gameMetadataCallback(gameMetadata);
        }
      }); // Initial sync to get game state.

      this.socket.emit('sync', this.gameID, this.playerID, this.numPlayers); // Keep track of connection status.

      this.socket.on('connect', function () {
        _this.isConnected = true;

        _this.callback();
      });
      this.socket.on('disconnect', function () {
        _this.isConnected = false;

        _this.callback();
      });
    }
    /**
     * Subscribe to connection state changes.
     */

  }, {
    key: "subscribe",
    value: function subscribe(fn) {
      this.callback = fn;
    }
  }, {
    key: "subscribeGameMetadata",
    value: function subscribeGameMetadata(fn) {
      this.gameMetadataCallback = fn;
    }
    /**
     * Updates the game id.
     * @param {string} id - The new game id.
     */

  }, {
    key: "updateGameID",
    value: function updateGameID(id) {
      this.gameID = this.gameName + ':' + id;
      var action = reset(null);
      this.store.dispatch(action);

      if (this.socket) {
        this.socket.emit('sync', this.gameID, this.playerID, this.numPlayers);
      }
    }
    /**
     * Updates the player associated with this client.
     * @param {string} id - The new player id.
     */

  }, {
    key: "updatePlayerID",
    value: function updatePlayerID(id) {
      this.playerID = id;
      var action = reset(null);
      this.store.dispatch(action);

      if (this.socket) {
        this.socket.emit('sync', this.gameID, this.playerID, this.numPlayers);
      }
    }
  }]);

  return SocketIO;
}();

/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

/**
 * InMemory data storage.
 */
var InMemory =
/*#__PURE__*/
function () {
  /**
   * Creates a new InMemory storage.
   */
  function InMemory() {
    _classCallCheck(this, InMemory);

    this.games = new Map();
  }
  /**
   * Connect.
   * No-op for the InMemory instance.
   */


  _createClass(InMemory, [{
    key: "connect",
    value: function connect() {
      return;
    }
    /**
     * Write the game state to the in-memory object.
     * @param {string} id - The game id.
     * @param {object} store - A game state to persist.
     */

  }, {
    key: "set",
    value: function set(id, state) {
      return this.games.set(id, state);
    }
    /**
     * Read the game state from the in-memory object.
     * @param {string} id - The game id.
     * @returns {object} - A game state, or undefined
     *                     if no game is found with this id.
     */

  }, {
    key: "get",
    value: function get(id) {
      return this.games.get(id);
    }
    /**
     * Check if a particular game id exists.
     * @param {string} id - The game id.
     * @returns {boolean} - True if a game with this id exists.
     */

  }, {
    key: "has",
    value: function has(id) {
      return this.games.has(id);
    }
    /**
     * Remove the game state from the in-memory object.
     * @param {string} id - The game id.
     */

  }, {
    key: "remove",
    value: function remove(id) {
      if (!this.games.has(id)) return;
      this.games.delete(id);
    }
    /**
     * Return all keys.
     * @returns {array} - Array of keys (strings)
     */

  }, {
    key: "list",
    value: function list() {
      return _toConsumableArray(this.games.keys());
    }
  }]);

  return InMemory;
}();

// Inlined version of Alea from https://github.com/davidbau/seedrandom.

/*
 * Copyright 2015 David Bau.
 *
 * Permission is hereby granted, free of charge,
 * to any person obtaining a copy of this software
 * and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the
 * Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall
 * be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */
function Alea(seed) {
  var me = this,
      mash = Mash();

  me.next = function () {
    var t = 2091639 * me.s0 + me.c * 2.3283064365386963e-10; // 2^-32

    me.s0 = me.s1;
    me.s1 = me.s2;
    return me.s2 = t - (me.c = t | 0);
  }; // Apply the seeding algorithm from Baagoe.


  me.c = 1;
  me.s0 = mash(' ');
  me.s1 = mash(' ');
  me.s2 = mash(' ');
  me.s0 -= mash(seed);

  if (me.s0 < 0) {
    me.s0 += 1;
  }

  me.s1 -= mash(seed);

  if (me.s1 < 0) {
    me.s1 += 1;
  }

  me.s2 -= mash(seed);

  if (me.s2 < 0) {
    me.s2 += 1;
  }

  mash = null;
}

function copy(f, t) {
  t.c = f.c;
  t.s0 = f.s0;
  t.s1 = f.s1;
  t.s2 = f.s2;
  return t;
}

function Mash() {
  var n = 0xefc8249d;

  var mash = function mash(data) {
    data = data.toString();

    for (var i = 0; i < data.length; i++) {
      n += data.charCodeAt(i);
      var h = 0.02519603282416938 * n;
      n = h >>> 0;
      h -= n;
      h *= n;
      n = h >>> 0;
      h -= n;
      n += h * 0x100000000; // 2^32
    }

    return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
  };

  return mash;
}

function alea(seed, opts) {
  var xg = new Alea(seed),
      state = opts && opts.state,
      prng = xg.next;
  prng.quick = prng;

  if (state) {
    if (_typeof(state) == 'object') copy(state, xg);

    prng.state = function () {
      return copy(xg, {});
    };
  }

  return prng;
}

/**
 * Random
 *
 * Calls that require a pseudorandom number generator.
 * Uses a seed from ctx, and also persists the PRNG
 * state in ctx so that moves can stay pure.
 */

var Random =
/*#__PURE__*/
function () {
  /**
   * constructor
   * @param {object} ctx - The ctx object to initialize from.
   */
  function Random(ctx) {
    _classCallCheck(this, Random);

    // If we are on the client, the seed is not present.
    // Just use a temporary seed to execute the move without
    // crashing it. The move state itself is discarded,
    // so the actual value doesn't matter.
    this.state = ctx._random || {
      seed: '0'
    };
  }
  /**
   * Updates ctx with the PRNG state.
   * @param {object} ctx - The ctx object to update.
   */


  _createClass(Random, [{
    key: "update",
    value: function update(state) {
      var ctx = _objectSpread({}, state.ctx, {
        _random: this.state
      });

      return _objectSpread({}, state, {
        ctx: ctx
      });
    }
    /**
     * Attaches the Random API to ctx.
     * @param {object} ctx - The ctx object to attach to.
     */

  }, {
    key: "attach",
    value: function attach(ctx) {
      return _objectSpread({}, ctx, {
        random: this._api()
      });
    }
    /**
     * Generate a random number.
     */

  }, {
    key: "_random",
    value: function _random() {
      var R = this.state;
      var fn;

      if (R.prngstate === undefined) {
        // No call to a random function has been made.
        fn = new alea(R.seed, {
          state: true
        });
      } else {
        fn = new alea('', {
          state: R.prngstate
        });
      }

      var number = fn();
      this.state = _objectSpread({}, R, {
        prngstate: fn.state()
      });
      return number;
    }
  }, {
    key: "_api",
    value: function _api() {
      var random = this._random.bind(this);

      var SpotValue = {
        D4: 4,
        D6: 6,
        D8: 8,
        D10: 10,
        D12: 12,
        D20: 20
      }; // Generate functions for predefined dice values D4 - D20.

      var predefined = {};

      var _loop = function _loop(key) {
        var spotvalue = SpotValue[key];

        predefined[key] = function (diceCount) {
          if (diceCount === undefined) {
            return Math.floor(random() * spotvalue) + 1;
          } else {
            return _toConsumableArray(new Array(diceCount).keys()).map(function () {
              return Math.floor(random() * spotvalue) + 1;
            });
          }
        };
      };

      for (var key in SpotValue) {
        _loop(key);
      }

      return _objectSpread({}, predefined, {
        /**
         * Roll a die of specified spot value.
         *
         * @param {number} spotvalue - The die dimension (default: 6).
         * @param {number} diceCount - number of dice to throw.
         *                             if not defined, defaults to 1 and returns the value directly.
         *                             if defined, returns an array containing the random dice values.
         */
        Die: function Die(spotvalue, diceCount) {
          if (spotvalue === undefined) {
            spotvalue = 6;
          }

          if (diceCount === undefined) {
            return Math.floor(random() * spotvalue) + 1;
          } else {
            return _toConsumableArray(new Array(diceCount).keys()).map(function () {
              return Math.floor(random() * spotvalue) + 1;
            });
          }
        },

        /**
         * Generate a random number between 0 and 1.
         */
        Number: function Number() {
          return random();
        },

        /**
         * Shuffle an array.
         *
         * @param {Array} deck - The array to shuffle. Does not mutate
         *                       the input, but returns the shuffled array.
         */
        Shuffle: function Shuffle(deck) {
          var clone = deck.slice(0);
          var srcIndex = deck.length;
          var dstIndex = 0;
          var shuffled = new Array(srcIndex);

          while (srcIndex) {
            var randIndex = srcIndex * random() | 0;
            shuffled[dstIndex++] = clone[randIndex];
            clone[randIndex] = clone[--srcIndex];
          }

          return shuffled;
        }
      });
    }
  }]);

  return Random;
}();
/**
 * Removes the attached Random api from ctx.
 *
 * @param {object} ctx - The ctx object with the Random API attached.
 * @returns {object} A plain ctx object without the Random API.
 */

Random.detach = function (ctx) {
  var random = ctx.random,
      rest = _objectWithoutProperties(ctx, ["random"]); // eslint-disable-line no-unused-vars


  return rest;
};
/**
 * Generates a new seed from the current date / time.
 */


Random.seed = function () {
  return (+new Date()).toString(36).slice(-10);
};

/**
 * Events
 */

var Events =
/*#__PURE__*/
function () {
  function Events(flow, playerID) {
    _classCallCheck(this, Events);

    this.flow = flow;
    this.playerID = playerID;
    this.dispatch = [];
  }
  /**
   * Attaches the Events API to ctx.
   * @param {object} ctx - The ctx object to attach to.
   */


  _createClass(Events, [{
    key: "attach",
    value: function attach(ctx) {
      var _this = this;

      var events = {};
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        var _loop = function _loop() {
          var key = _step.value;

          events[key] = function () {
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }

            _this.dispatch.push({
              key: key,
              args: args
            });
          };
        };

        for (var _iterator = this.flow.eventNames[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          _loop();
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return _objectSpread({}, ctx, {
        events: events
      });
    }
    /**
     * Updates ctx with the triggered events.
     * @param {object} state - The state object { G, ctx }.
     */

  }, {
    key: "update",
    value: function update$$1(state) {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.dispatch[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var item = _step2.value;
          var action = automaticGameEvent(item.key, item.args, this.playerID);
          state = _objectSpread({}, state, this.flow.processGameEvent(state, action));
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return state;
    }
  }]);

  return Events;
}();
/**
 * Detaches the Events API from ctx.
 * @param {object} ctx - The ctx object to strip.
 */

Events.detach = function (ctx) {
  var events = ctx.events,
      rest = _objectWithoutProperties(ctx, ["events"]); // eslint-disable-line no-unused-vars


  return rest;
};

/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
/**
 * Plugin that allows using Immer to make immutable changes
 * to G by just mutating it.
 */

var PluginImmer = {
  fnWrap: function fnWrap(move) {
    return produce(move);
  }
};

/**
 * List of plugins that are always added.
 */

var DEFAULT_PLUGINS = [PluginImmer];
/**
 * Applies the provided plugins to ctx before processing a move / event.
 *
 * @param {object} ctx - The ctx object.
 * @param {object} game - The game object.
 */

var CtxPreMove = function CtxPreMove(ctx, game) {
  [].concat(DEFAULT_PLUGINS, _toConsumableArray(game.plugins)).filter(function (plugin) {
    return plugin.ctx !== undefined;
  }).filter(function (plugin) {
    return plugin.ctx.preMove !== undefined;
  }).forEach(function (plugin) {
    ctx = plugin.ctx.preMove(ctx, game);
  });
  return ctx;
};
/**
 * Applies the provided plugins to G before processing a move / event.
 *
 * @param {object} G - The G object.
 * @param {object} game - The game object.
 */


var GPreMove = function GPreMove(G, game) {
  [].concat(DEFAULT_PLUGINS, _toConsumableArray(game.plugins)).filter(function (plugin) {
    return plugin.G !== undefined;
  }).filter(function (plugin) {
    return plugin.G.preMove !== undefined;
  }).forEach(function (plugin) {
    G = plugin.G.preMove(G, game);
  });
  return G;
};
/**
 * Postprocesses G after a move / event.
 *
 * @param {object} G - The G object.
 * @param {object} game - The game object.
 */


var GPostMove = function GPostMove(G, game) {
  [].concat(DEFAULT_PLUGINS, _toConsumableArray(game.plugins)).filter(function (plugin) {
    return plugin.G !== undefined;
  }).filter(function (plugin) {
    return plugin.G.postMove !== undefined;
  }).forEach(function (plugin) {
    G = plugin.G.postMove(G, game);
  });
  return G;
};
/**
 * Applies the provided plugins to the given move / flow function.
 *
 * @param {function} fn - The move function or trigger to apply the plugins to.
 * @param {object} game - The game object.
 */


var FnWrap = function FnWrap(fn, game) {
  var reducer = function reducer(acc, _ref) {
    var fnWrap = _ref.fnWrap;
    return fnWrap(acc, game);
  };

  var g = [].concat(DEFAULT_PLUGINS, _toConsumableArray(game.plugins)).filter(function (plugin) {
    return plugin.fnWrap !== undefined;
  }).reduce(reducer, fn);
  return function (G, ctx) {
    G = GPreMove(G, game);
    ctx = CtxPreMove(ctx, game);

    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    G = g.apply(void 0, [G, ctx].concat(args));
    G = GPostMove(G, game);
    return G;
  };
};
var G = {
  /**
   * Applies the provided plugins to G during game setup.
   *
   * @param {object} G - The G object.
   * @param {object} ctx - The ctx object.
   * @param {object} game - The game object.
   */
  setup: function setup(G, ctx, game) {
    [].concat(DEFAULT_PLUGINS, _toConsumableArray(game.plugins)).filter(function (plugin) {
      return plugin.G !== undefined;
    }).filter(function (plugin) {
      return plugin.G.setup !== undefined;
    }).forEach(function (plugin) {
      G = plugin.G.setup(G, ctx, game);
    });
    return G;
  },

  /**
   * Applies the provided plugins to G during the beginning of the phase.
   *
   * @param {object} G - The G object.
   * @param {object} ctx - The ctx object.
   * @param {object} game - The game object.
   */
  onPhaseBegin: function onPhaseBegin(G, ctx, game) {
    [].concat(DEFAULT_PLUGINS, _toConsumableArray(game.plugins)).filter(function (plugin) {
      return plugin.G !== undefined;
    }).filter(function (plugin) {
      return plugin.G.onPhaseBegin !== undefined;
    }).forEach(function (plugin) {
      G = plugin.G.onPhaseBegin(G, ctx, game);
    });
    return G;
  }
};
var ctx = {
  /**
   * Applies the provided plugins to ctx during game setup.
   *
   * @param {object} ctx - The ctx object.
   * @param {object} game - The game object.
   */
  setup: function setup(ctx, game) {
    [].concat(DEFAULT_PLUGINS, _toConsumableArray(game.plugins)).filter(function (plugin) {
      return plugin.ctx !== undefined;
    }).filter(function (plugin) {
      return plugin.ctx.setup !== undefined;
    }).forEach(function (plugin) {
      ctx = plugin.ctx.setup(ctx, game);
    });
    return ctx;
  },

  /**
   * Applies the provided plugins to ctx during the beginning of the phase.
   *
   * @param {object} ctx - The ctx object.
   * @param {object} game - The game object.
   */
  onPhaseBegin: function onPhaseBegin(ctx, game) {
    [].concat(DEFAULT_PLUGINS, _toConsumableArray(game.plugins)).filter(function (plugin) {
      return plugin.ctx !== undefined;
    }).filter(function (plugin) {
      return plugin.ctx.onPhaseBegin !== undefined;
    }).forEach(function (plugin) {
      ctx = plugin.ctx.onPhaseBegin(ctx, game);
    });
    return ctx;
  }
};

/**
 * Moves can return this when they want to indicate
 * that the combination of arguments is illegal and
 * the move ought to be discarded.
 */

var INVALID_MOVE = 'INVALID_MOVE';
/**
 * Context API to allow writing custom logs in games.
 */

var GameLoggerCtxAPI =
/*#__PURE__*/
function () {
  function GameLoggerCtxAPI() {
    _classCallCheck(this, GameLoggerCtxAPI);

    this._payload = undefined;
  }

  _createClass(GameLoggerCtxAPI, [{
    key: "_api",
    value: function _api() {
      var _this = this;

      return {
        setPayload: function setPayload(payload) {
          _this._payload = payload;
        }
      };
    }
  }, {
    key: "attach",
    value: function attach(ctx$$1) {
      return _objectSpread({}, ctx$$1, {
        log: this._api()
      });
    }
  }, {
    key: "update",
    value: function update(state) {
      if (this._payload === undefined) {
        return state;
      } // attach the payload to the last log event


      var deltalog = state.deltalog;
      deltalog[deltalog.length - 1] = _objectSpread({}, deltalog[deltalog.length - 1], {
        payload: this._payload
      });
      this._payload = undefined;
      return _objectSpread({}, state, {
        deltalog: deltalog
      });
    }
  }], [{
    key: "detach",
    value: function detach(ctx$$1) {
      var log = ctx$$1.log,
          ctxWithoutLog = _objectWithoutProperties(ctx$$1, ["log"]); // eslint-disable-line no-unused-vars


      return ctxWithoutLog;
    }
  }]);

  return GameLoggerCtxAPI;
}();
/**
 * This class is used to attach/detach various utility objects
 * onto a ctx, without having to manually attach/detach them
 * all separately.
 */

var ContextEnhancer =
/*#__PURE__*/
function () {
  function ContextEnhancer(ctx$$1, game, player) {
    _classCallCheck(this, ContextEnhancer);

    this.random = new Random(ctx$$1);
    this.events = new Events(game.flow, player);
    this.log = new GameLoggerCtxAPI();
  }

  _createClass(ContextEnhancer, [{
    key: "attachToContext",
    value: function attachToContext(ctx$$1) {
      var ctxWithAPI = this.random.attach(ctx$$1);
      ctxWithAPI = this.events.attach(ctxWithAPI);
      ctxWithAPI = this.log.attach(ctxWithAPI);
      return ctxWithAPI;
    }
  }, {
    key: "_update",
    value: function _update(state, updateEvents) {
      var newState = updateEvents ? this.events.update(state) : state;
      newState = this.random.update(newState);
      newState = this.log.update(newState);
      return newState;
    }
  }, {
    key: "updateAndDetach",
    value: function updateAndDetach(state, updateEvents) {
      var newState = this._update(state, updateEvents);

      newState.ctx = ContextEnhancer.detachAllFromContext(newState.ctx);
      return newState;
    }
  }], [{
    key: "detachAllFromContext",
    value: function detachAllFromContext(ctx$$1) {
      var ctxWithoutAPI = Random.detach(ctx$$1);
      ctxWithoutAPI = Events.detach(ctxWithoutAPI);
      ctxWithoutAPI = GameLoggerCtxAPI.detach(ctxWithoutAPI);
      return ctxWithoutAPI;
    }
  }]);

  return ContextEnhancer;
}();
/**
 * InitializeGame
 *
 * Creates the initial game state.
 *
 * @param {...object} game - Return value of Game().
 * @param {...object} numPlayers - The number of players.
 * @param {...object} multiplayer - Set to true if we are in a multiplayer client.
 */

function InitializeGame(_ref) {
  var game = _ref.game,
      numPlayers = _ref.numPlayers,
      setupData = _ref.setupData;

  if (!numPlayers) {
    numPlayers = 2;
  }

  var ctx$$1 = game.flow.ctx(numPlayers);
  var seed = game.seed;

  if (seed === undefined) {
    seed = Random.seed();
  }

  ctx$$1._random = {
    seed: seed
  }; // Pass ctx through all the plugins that want to modify it.

  ctx$$1 = ctx.setup(ctx$$1, game); // Augment ctx with the enhancers (TODO: move these into plugins).

  var apiCtx = new ContextEnhancer(ctx$$1, game, ctx$$1.currentPlayer);
  var ctxWithAPI = apiCtx.attachToContext(ctx$$1);
  var initialG = game.setup(ctxWithAPI, setupData); // Pass G through all the plugins that want to modify it.

  initialG = G.setup(initialG, ctxWithAPI, game);
  var initial = {
    // User managed state.
    G: initialG,
    // Framework managed state.
    ctx: ctx$$1,
    // List of {G, ctx} pairs that can be undone.
    _undo: [],
    // List of {G, ctx} pairs that can be redone.
    _redo: [],
    // A monotonically non-decreasing ID to ensure that
    // state updates are only allowed from clients that
    // are at the same version that the server.
    _stateID: 0,
    // A snapshot of this object so that actions can be
    // replayed over it to view old snapshots.
    // TODO: This will no longer be necessary once the
    // log stops replaying actions (but reads the actual
    // game states instead).
    _initial: {}
  };
  var state = game.flow.init({
    G: initial.G,
    ctx: ctxWithAPI
  });
  initial.G = state.G;
  initial._undo = state._undo;
  state = apiCtx.updateAndDetach(state, true);
  initial.ctx = state.ctx;

  var deepCopy = function deepCopy(obj) {
    return parse(stringify(obj));
  };

  initial._initial = deepCopy(initial);
  return initial;
}
/**
 * CreateGameReducer
 *
 * Creates the main game state reducer.
 * @param {...object} game - Return value of Game().
 * @param {...object} numPlayers - The number of players.
 * @param {...object} multiplayer - Set to true if we are in a multiplayer client.
 */

function CreateGameReducer(_ref2) {
  var game = _ref2.game,
      multiplayer = _ref2.multiplayer;

  /**
   * GameReducer
   *
   * Redux reducer that maintains the overall game state.
   * @param {object} state - The state before the action.
   * @param {object} action - A Redux action.
   */
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var action = arguments.length > 1 ? arguments[1] : undefined;

    switch (action.type) {
      case GAME_EVENT:
        {
          state = _objectSpread({}, state, {
            deltalog: []
          }); // Process game events only on the server.
          // These events like `endTurn` typically
          // contain code that may rely on secret state
          // and cannot be computed on the client.

          if (multiplayer) {
            return state;
          } // Ignore the event if the player isn't allowed to make it.


          if (action.payload.playerID !== null && action.payload.playerID !== undefined && !game.flow.canPlayerCallEvent(state.G, state.ctx, action.payload.playerID)) {
            return state;
          }

          var apiCtx = new ContextEnhancer(state.ctx, game, action.payload.playerID);
          state.ctx = apiCtx.attachToContext(state.ctx);
          var newState = game.flow.processGameEvent(state, action);
          newState = apiCtx.updateAndDetach(newState, true);
          return _objectSpread({}, newState, {
            _stateID: state._stateID + 1
          });
        }

      case MAKE_MOVE:
        {
          state = _objectSpread({}, state, {
            deltalog: []
          }); // Check whether the game knows the move at all.

          if (!game.moveNames.includes(action.payload.type)) {
            return state;
          } // Ignore the move if it isn't allowed at this point.


          if (!game.flow.canMakeMove(state.G, state.ctx, action.payload.type)) {
            return state;
          } // Ignore the move if the player isn't allowed to make it.


          if (action.payload.playerID !== null && action.payload.playerID !== undefined && !game.flow.canPlayerMakeMove(state.G, state.ctx, action.payload.playerID)) {
            return state;
          }

          var _apiCtx = new ContextEnhancer(state.ctx, game, action.payload.playerID);

          var ctxWithAPI = _apiCtx.attachToContext(state.ctx); // Process the move.


          var G$$1 = game.processMove(state.G, action.payload, ctxWithAPI);

          if (G$$1 === INVALID_MOVE) {
            // the game declared the move as invalid.
            return state;
          } // Create a log entry for this move.


          var logEntry = {
            action: action,
            _stateID: state._stateID,
            turn: state.ctx.turn,
            phase: state.ctx.phase
          }; // don't call into events here

          var _newState = _apiCtx.updateAndDetach(_objectSpread({}, state, {
            deltalog: [logEntry]
          }), false);

          var ctx$$1 = _newState.ctx; // Undo changes to G if the move should not run on the client.

          if (multiplayer && !game.flow.optimisticUpdate(G$$1, ctx$$1, action.payload)) {
            G$$1 = state.G;
          }

          state = _objectSpread({}, _newState, {
            G: G$$1,
            ctx: ctx$$1,
            _stateID: state._stateID + 1
          }); // If we're on the client, just process the move
          // and no triggers in multiplayer mode.
          // These will be processed on the server, which
          // will send back a state update.

          if (multiplayer) {
            return state;
          } // Allow the flow reducer to process any triggers that happen after moves.


          ctxWithAPI = _apiCtx.attachToContext(state.ctx);
          state = game.flow.processMove(_objectSpread({}, state, {
            ctx: ctxWithAPI
          }), action.payload);
          state = _apiCtx.updateAndDetach(state, true);
          state._undo[state._undo.length - 1].ctx = state.ctx;
          return state;
        }

      case RESET:
      case UPDATE:
      case SYNC:
        {
          return action.state;
        }

      case UNDO:
        {
          var _state = state,
              _undo = _state._undo,
              _redo = _state._redo;

          if (_undo.length < 2) {
            return state;
          }

          var last = _undo[_undo.length - 1];
          var restore = _undo[_undo.length - 2]; // Only allow undoable moves to be undone.

          if (!game.flow.canUndoMove(state.G, state.ctx, last.moveType)) {
            return state;
          }

          return _objectSpread({}, state, {
            G: restore.G,
            ctx: restore.ctx,
            _undo: _undo.slice(0, _undo.length - 1),
            _redo: [last].concat(_toConsumableArray(_redo))
          });
        }

      case REDO:
        {
          var _state2 = state,
              _undo2 = _state2._undo,
              _redo2 = _state2._redo;

          if (_redo2.length == 0) {
            return state;
          }

          var first = _redo2[0];
          return _objectSpread({}, state, {
            G: first.G,
            ctx: first.ctx,
            _undo: [].concat(_toConsumableArray(_undo2), [first]),
            _redo: _redo2.slice(1)
          });
        }

      default:
        {
          return state;
        }
    }
  };
}

var GameMetadataKey = function GameMetadataKey(gameID) {
  return "".concat(gameID, ":metadata");
};
/**
 * Redact the log.
 *
 * @param {Array} redactedMoves - List of moves to redact.
 * @param {Array} log - The game log (or deltalog).
 * @param {String} playerID - The playerID that this log is
 *                            to be sent to.
 */


function redactLog(redactedMoves, log, playerID) {
  if (redactedMoves === undefined || log === undefined) {
    return log;
  }

  return log.map(function (logEvent) {
    // filter for all other players and a spectator
    if (playerID !== null && +playerID === +logEvent.action.payload.playerID) {
      return logEvent;
    } // only filter moves


    if (logEvent.action.type !== 'MAKE_MOVE') {
      return logEvent;
    }

    var moveName = logEvent.action.payload.type;
    var filteredEvent = logEvent;

    if (redactedMoves.includes(moveName)) {
      var newPayload = _objectSpread({}, filteredEvent.action.payload, {
        args: undefined,
        argsRedacted: true
      });

      filteredEvent = _objectSpread({}, filteredEvent, {
        action: _objectSpread({}, filteredEvent.action, {
          payload: newPayload
        })
      });
    }

    return filteredEvent;
  });
}
/**
 * Verifies that the move came from a player with the
 * appropriate credentials.
 */

var isActionFromAuthenticPlayer = function isActionFromAuthenticPlayer(_ref) {
  var action = _ref.action,
      gameMetadata = _ref.gameMetadata,
      playerID = _ref.playerID;

  if (!gameMetadata) {
    return true;
  }

  if (!action.payload) {
    return true;
  }

  var hasCredentials = Object.keys(gameMetadata.players).some(function (key) {
    return !!(gameMetadata.players[key] && gameMetadata.players[key].credentials);
  });

  if (!hasCredentials) {
    return true;
  }

  if (!action.payload.credentials) {
    return false;
  }

  if (action.payload.credentials !== gameMetadata.players[playerID].credentials) {
    return false;
  }

  return true;
};
/**
 * Master
 *
 * Class that runs the game and maintains the authoritative state.
 * It uses the transportAPI to communicate with clients and the
 * storageAPI to communicate with the database.
 */

var Master =
/*#__PURE__*/
function () {
  function Master(game, storageAPI, transportAPI, auth) {
    _classCallCheck(this, Master);

    this.game = game;
    this.storageAPI = storageAPI;
    this.transportAPI = transportAPI;

    this.auth = function () {
      return true;
    };

    if (auth === true) {
      this.auth = isActionFromAuthenticPlayer;
    } else if (typeof auth === 'function') {
      this.auth = auth;
    }
  }
  /**
   * Called on each move / event made by the client.
   * Computes the new value of the game state and returns it
   * along with a deltalog.
   */


  _createClass(Master, [{
    key: "onUpdate",
    value: async function onUpdate(action, stateID, gameID, playerID) {
      var _this = this;

      var isActionAuthentic;

      if (this.executeSynchronously) {
        var gameMetadata = this.storageAPI.get(GameMetadataKey(gameID));
        isActionAuthentic = this.auth({
          action: action,
          gameMetadata: gameMetadata,
          gameID: gameID,
          playerID: playerID
        });
      } else {
        var _gameMetadata = await this.storageAPI.get(GameMetadataKey(gameID));

        isActionAuthentic = this.auth({
          action: action,
          gameMetadata: _gameMetadata,
          gameID: gameID,
          playerID: playerID
        });
      }

      if (!isActionAuthentic) {
        return {
          error: 'unauthorized action'
        };
      }

      var key = gameID;
      var state;

      if (this.executeSynchronously) {
        state = this.storageAPI.get(key);
      } else {
        state = await this.storageAPI.get(key);
      }

      if (state === undefined) {
        return {
          error: 'game not found'
        };
      }

      var reducer = CreateGameReducer({
        game: this.game,
        numPlayers: state.ctx.numPlayers
      });
      var store = createStore(reducer, state); // Only allow UNDO / REDO if there is exactly one player
      // that can make moves right now and the person doing the
      // action is that player.

      if (action.type == UNDO || action.type == REDO) {
        if (state.ctx.currentPlayer !== playerID || state.ctx.actionPlayers.length != 1 || state.ctx.actionPlayers[0] !== playerID) {
          return;
        }
      } // Check whether the player is allowed to make the move.


      if (action.type == MAKE_MOVE && !this.game.flow.canPlayerMakeMove(state.G, state.ctx, playerID)) {
        return;
      } // Check whether the player is allowed to call the event.


      if (action.type == GAME_EVENT && !this.game.flow.canPlayerCallEvent(state.G, state.ctx, playerID)) {
        return;
      }

      if (state._stateID !== stateID) {
        error("invalid stateID, was=[".concat(stateID, "], expected=[").concat(state._stateID, "]"));
        return;
      }

      var log = store.getState().log || []; // Update server's version of the store.

      store.dispatch(action);
      state = store.getState();
      this.transportAPI.sendAll(function (playerID) {
        var filteredState = _objectSpread({}, state, {
          G: _this.game.playerView(state.G, state.ctx, playerID),
          ctx: _objectSpread({}, state.ctx, {
            _random: undefined
          }),
          log: undefined,
          deltalog: undefined,
          _undo: [],
          _redo: [],
          _initial: _objectSpread({}, state._initial, {
            _undo: [],
            _redo: []
          })
        });

        var log = redactLog(_this.game.flow.redactedMoves, state.deltalog, playerID);
        return {
          type: 'update',
          args: [gameID, filteredState, log]
        };
      }); // TODO: We currently attach the log back into the state
      // object before storing it, but this should probably
      // sit in a different part of the database eventually.

      log = [].concat(_toConsumableArray(log), _toConsumableArray(state.deltalog));

      var stateWithLog = _objectSpread({}, state, {
        log: log
      });

      if (this.executeSynchronously) {
        this.storageAPI.set(key, stateWithLog);
      } else {
        await this.storageAPI.set(key, stateWithLog);
      }
    }
    /**
     * Called when the client connects / reconnects.
     * Returns the latest game state and the entire log.
     */

  }, {
    key: "onSync",
    value: async function onSync(gameID, playerID, numPlayers) {
      var key = gameID;
      var state, gameMetadata, filteredGameMetadata;

      if (this.executeSynchronously) {
        state = this.storageAPI.get(key);
        gameMetadata = this.storageAPI.get(GameMetadataKey(gameID));
      } else {
        state = await this.storageAPI.get(key);
        gameMetadata = await this.storageAPI.get(GameMetadataKey(gameID));
      }

      if (gameMetadata) {
        filteredGameMetadata = Object.values(gameMetadata.players).map(function (player) {
          return {
            id: player.id,
            name: player.name
          };
        });
      } // If the game doesn't exist, then create one on demand.
      // TODO: Move this out of the sync call.


      if (state === undefined) {
        state = InitializeGame({
          game: this.game,
          numPlayers: numPlayers
        });

        if (this.executeSynchronously) {
          this.storageAPI.set(key, state);
          state = this.storageAPI.get(key);
        } else {
          await this.storageAPI.set(key, state);
          state = await this.storageAPI.get(key);
        }
      }

      var filteredState = _objectSpread({}, state, {
        G: this.game.playerView(state.G, state.ctx, playerID),
        ctx: _objectSpread({}, state.ctx, {
          _random: undefined
        }),
        log: undefined,
        deltalog: undefined,
        _undo: [],
        _redo: [],
        _initial: _objectSpread({}, state._initial, {
          _undo: [],
          _redo: []
        })
      });

      var log = redactLog(this.game.flow.redactedMoves, state.log, playerID);
      this.transportAPI.send({
        playerID: playerID,
        type: 'sync',
        args: [gameID, filteredState, log, filteredGameMetadata]
      });
      return;
    }
  }]);

  return Master;
}();

/**
 * Creates a local version of the master that the client
 * can interact with.
 */

function LocalMaster(game) {
  var clientCallbacks = {};

  var send = function send(_ref) {
    var type = _ref.type,
        playerID = _ref.playerID,
        args = _ref.args;
    var callback = clientCallbacks[playerID];

    if (callback !== undefined) {
      callback.apply(null, [type].concat(_toConsumableArray(args)));
    }
  };

  var sendAll = function sendAll(arg) {
    for (var playerID in clientCallbacks) {
      var _arg = arg(playerID),
          type = _arg.type,
          args = _arg.args;

      send({
        type: type,
        playerID: playerID,
        args: args
      });
    }
  };

  var master = new Master(game, new InMemory(), {
    send: send,
    sendAll: sendAll
  }, false);
  master.executeSynchronously = true;

  master.connect = function (gameID, playerID, callback) {
    clientCallbacks[playerID] = callback;
  };

  return master;
}
/**
 * Local
 *
 * Transport interface that embeds a GameMaster within it
 * that you can connect multiple clients to.
 */

var Local =
/*#__PURE__*/
function () {
  /**
   * Creates a new Mutiplayer instance.
   * @param {object} socket - Override for unit tests.
   * @param {object} socketOpts - Options to pass to socket.io.
   * @param {string} gameID - The game ID to connect to.
   * @param {string} playerID - The player ID associated with this client.
   * @param {string} gameName - The game type (the `name` field in `Game`).
   * @param {string} numPlayers - The number of players.
   * @param {string} server - The game server in the form of 'hostname:port'. Defaults to the server serving the client if not provided.
   */
  function Local(_ref2) {
    var master = _ref2.master,
        store = _ref2.store,
        gameID = _ref2.gameID,
        playerID = _ref2.playerID,
        gameName = _ref2.gameName,
        numPlayers = _ref2.numPlayers;

    _classCallCheck(this, Local);

    this.master = master;
    this.store = store;
    this.gameName = gameName || 'default';
    this.gameID = gameID || 'default';
    this.playerID = playerID || null;
    this.numPlayers = numPlayers || 2;
    this.gameID = this.gameName + ':' + this.gameID;
    this.isConnected = true;
  }
  /**
   * Called when another player makes a move and the
   * master broadcasts the update to other clients (including
   * this one).
   */


  _createClass(Local, [{
    key: "onUpdate",
    value: function onUpdate(gameID, state, deltalog) {
      var currentState = this.store.getState();

      if (gameID == this.gameID && state._stateID >= currentState._stateID) {
        var action = update(state, deltalog);
        this.store.dispatch(action);
      }
    }
    /**
     * Called when the client first connects to the master
     * and requests the current game state.
     */

  }, {
    key: "onSync",
    value: function onSync(gameID, state, log) {
      if (gameID == this.gameID) {
        var action = sync(state, log);
        this.store.dispatch(action);
      }
    }
    /**
     * Called when an action that has to be relayed to the
     * game master is made.
     */

  }, {
    key: "onAction",
    value: function onAction(state, action) {
      this.master.onUpdate(action, state._stateID, this.gameID, this.playerID);
    }
    /**
     * Connect to the server.
     */

  }, {
    key: "connect",
    value: function connect() {
      var _this = this;

      this.master.connect(this.gameID, this.playerID, function (type) {
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        if (type == 'sync') {
          _this.onSync.apply(_this, args);
        }

        if (type == 'update') {
          _this.onUpdate.apply(_this, args);
        }
      });
      this.master.onSync(this.gameID, this.playerID, this.numPlayers);
    }
    /**
     * Subscribe to connection state changes.
     */

  }, {
    key: "subscribe",
    value: function subscribe() {}
  }, {
    key: "subscribeGameMetadata",
    value: function subscribeGameMetadata(_metadata) {} // eslint-disable-line no-unused-vars

    /**
     * Updates the game id.
     * @param {string} id - The new game id.
     */

  }, {
    key: "updateGameID",
    value: function updateGameID(id) {
      this.gameID = this.gameName + ':' + id;
      var action = reset(null);
      this.store.dispatch(action);
      this.master.onSync(this.gameID, this.playerID, this.numPlayers);
    }
    /**
     * Updates the player associated with this client.
     * @param {string} id - The new player id.
     */

  }, {
    key: "updatePlayerID",
    value: function updatePlayerID(id) {
      this.playerID = id;
      var action = reset(null);
      this.store.dispatch(action);
      this.master.onSync(this.gameID, this.playerID, this.numPlayers);
    }
  }]);

  return Local;
}();

var localMaster_ = null;
/**
 * createDispatchers
 *
 * Create action dispatcher wrappers with bound playerID and credentials
 */

function createDispatchers(storeActionType, innerActionNames, store, playerID, credentials, multiplayer) {
  return innerActionNames.reduce(function (dispatchers, name) {
    dispatchers[name] = function () {
      var assumedPlayerID = playerID; // In singleplayer mode, if the client does not have a playerID
      // associated with it, we attach the currentPlayer as playerID.

      if (!multiplayer && (playerID === null || playerID === undefined)) {
        var state = store.getState();
        assumedPlayerID = state.ctx.currentPlayer;
      }

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      store.dispatch(ActionCreators[storeActionType](name, args, assumedPlayerID, credentials));
    };

    return dispatchers;
  }, {});
}
/**
 * createEventDispatchers
 *
 * Creates a set of dispatchers to dispatch game flow events.
 * @param {Array} eventNames - A list of event names.
 * @param {object} store - The Redux store to create dispatchers for.
 * @param {string} playerID - The ID of the player dispatching these events.
 * @param {string} credentials - A key indicating that the player is authorized to play.
 */


var createEventDispatchers = createDispatchers.bind(null, 'gameEvent');
/**
 * createMoveDispatchers
 *
 * Creates a set of dispatchers to make moves.
 * @param {Array} moveNames - A list of move names.
 * @param {object} store - The Redux store to create dispatchers for.
 * @param {string} playerID - The ID of the player dispatching these events.
 * @param {string} credentials - A key indicating that the player is authorized to play.
 */

var createMoveDispatchers = createDispatchers.bind(null, 'makeMove');
/**
 * Implementation of Client (see below).
 */

var _ClientImpl =
/*#__PURE__*/
function () {
  function _ClientImpl(_ref) {
    var _this = this;

    var game = _ref.game,
        ai = _ref.ai,
        numPlayers = _ref.numPlayers,
        multiplayer = _ref.multiplayer,
        socketOpts = _ref.socketOpts,
        gameID = _ref.gameID,
        playerID = _ref.playerID,
        credentials = _ref.credentials,
        enhancer = _ref.enhancer;

    _classCallCheck(this, _ClientImpl);

    this.game = game;
    this.playerID = playerID;
    this.gameID = gameID;
    this.credentials = credentials;
    this.multiplayer = multiplayer;

    this.subscribeCallback = function () {};

    this.reducer = CreateGameReducer({
      game: game,
      numPlayers: numPlayers,
      multiplayer: multiplayer
    });

    if (ai !== undefined && multiplayer === undefined) {
      var bot = new ai.bot({
        game: game,
        enumerate: ai.enumerate
      });

      this.step = async function () {
        var state = _this.store.getState();

        var playerID = state.ctx.actionPlayers[0];

        var _ref2 = await bot.play(state, playerID),
            action = _ref2.action,
            metadata = _ref2.metadata;

        if (action) {
          action.payload.metadata = metadata;

          _this.store.dispatch(action);
        }

        return action;
      };
    }

    var initialState = null;

    if (multiplayer === undefined) {
      initialState = InitializeGame({
        game: game,
        numPlayers: numPlayers
      });
    }

    this.reset = function () {
      _this.store.dispatch(reset(initialState));
    };

    this.undo = function () {
      _this.store.dispatch(undo());
    };

    this.redo = function () {
      _this.store.dispatch(redo());
    };

    this.store = null;
    this.log = [];
    /**
     * Middleware that manages the log object.
     * Reducers generate deltalogs, which are log events
     * that are the result of application of a single action.
     * The master may also send back a deltalog or the entire
     * log depending on the type of request.
     * The middleware below takes care of all these cases while
     * managing the log object.
     */

    var LogMiddleware = function LogMiddleware(store) {
      return function (next) {
        return function (action) {
          var result = next(action);
          var state = store.getState();

          switch (action.type) {
            case MAKE_MOVE:
            case GAME_EVENT:
              {
                var deltalog = state.deltalog;
                _this.log = [].concat(_toConsumableArray(_this.log), _toConsumableArray(deltalog));
                break;
              }

            case RESET:
              {
                _this.log = [];
                break;
              }

            case UPDATE:
              {
                var id = -1;

                if (_this.log.length > 0) {
                  id = _this.log[_this.log.length - 1]._stateID;
                }

                var _deltalog = action.deltalog || []; // Filter out actions that are already present
                // in the current log. This may occur when the
                // client adds an entry to the log followed by
                // the update from the master here.


                _deltalog = _deltalog.filter(function (l) {
                  return l._stateID > id;
                });
                _this.log = [].concat(_toConsumableArray(_this.log), _toConsumableArray(_deltalog));
                break;
              }

            case SYNC:
              {
                _this.log = action.log || [];
                break;
              }
          }

          return result;
        };
      };
    };
    /**
     * Middleware that intercepts actions and sends them to the master,
     * which keeps the authoritative version of the state.
     */


    var TransportMiddleware = function TransportMiddleware(store) {
      return function (next) {
        return function (action) {
          var baseState = store.getState();
          var result = next(action);

          if (action.clientOnly != true) {
            _this.transport.onAction(baseState, action);
          }

          return result;
        };
      };
    };
    /**
     * Middleware that intercepts actions and invokes the subscription callback.
     */


    var SubscriptionMiddleware = function SubscriptionMiddleware() {
      return function (next) {
        return function (action) {
          var result = next(action);

          _this.subscribeCallback();

          return result;
        };
      };
    };

    if (enhancer !== undefined) {
      enhancer = compose(applyMiddleware(SubscriptionMiddleware, TransportMiddleware, LogMiddleware), enhancer);
    } else {
      enhancer = applyMiddleware(SubscriptionMiddleware, TransportMiddleware, LogMiddleware);
    }

    this.store = createStore(this.reducer, initialState, enhancer);
    this.transport = {
      isConnected: true,
      onAction: function onAction() {},
      subscribe: function subscribe() {},
      subscribeGameMetadata: function subscribeGameMetadata(_metadata) {},
      // eslint-disable-line no-unused-vars
      connect: function connect() {},
      updateGameID: function updateGameID() {},
      updatePlayerID: function updatePlayerID() {}
    };

    if (multiplayer !== undefined) {
      if (multiplayer === true) {
        multiplayer = {
          server: ''
        };
      }

      if (multiplayer.local === true) {
        if (localMaster_ === null || localMaster_.game !== game) {
          localMaster_ = new LocalMaster(game);
        }

        this.transport = new Local({
          master: localMaster_,
          store: this.store,
          gameID: gameID,
          playerID: playerID,
          gameName: game.name,
          numPlayers: numPlayers
        });
      } else if (multiplayer.server !== undefined) {
        this.transport = new SocketIO({
          store: this.store,
          gameID: gameID,
          playerID: playerID,
          gameName: game.name,
          numPlayers: numPlayers,
          server: multiplayer.server,
          socketOpts: socketOpts
        });
      } else if (multiplayer.transport !== undefined) {
        this.transport = new multiplayer.transport({
          store: this.store,
          gameID: gameID,
          playerID: playerID,
          gameName: game.name,
          numPlayers: numPlayers
        });
      }
    }

    this.createDispatchers();
    this.transport.subscribeGameMetadata(function (metadata) {
      _this.gameMetadata = metadata;
    });
  }

  _createClass(_ClientImpl, [{
    key: "subscribe",
    value: function subscribe(fn) {
      var _this2 = this;

      var callback = function callback() {
        return fn(_this2.getState());
      };

      this.transport.subscribe(callback);
      this.subscribeCallback = callback;
    }
  }, {
    key: "getState",
    value: function getState() {
      var state = this.store.getState(); // This is the state before a sync with the game master.

      if (state === null) {
        return state;
      } // isActive.


      var isActive = true;
      var canPlayerMakeMove = this.game.flow.canPlayerMakeMove(state.G, state.ctx, this.playerID);

      if (this.multiplayer && !canPlayerMakeMove) {
        isActive = false;
      }

      if (!this.multiplayer && this.playerID !== null && this.playerID !== undefined && !canPlayerMakeMove) {
        isActive = false;
      }

      if (state.ctx.gameover !== undefined) {
        isActive = false;
      } // Secrets are normally stripped on the server,
      // but we also strip them here so that game developers
      // can see their effects while prototyping.


      var G = this.game.playerView(state.G, state.ctx, this.playerID); // Combine into return value.

      var ret = _objectSpread({}, state, {
        isActive: isActive,
        G: G,
        log: this.log
      });

      var isConnected = this.transport.isConnected;
      ret = _objectSpread({}, ret, {
        isConnected: isConnected
      });
      return ret;
    }
  }, {
    key: "connect",
    value: function connect() {
      this.transport.connect();
    }
  }, {
    key: "createDispatchers",
    value: function createDispatchers() {
      this.moves = createMoveDispatchers(this.game.moveNames, this.store, this.playerID, this.credentials, this.multiplayer);
      this.events = createEventDispatchers(this.game.flow.enabledEventNames, this.store, this.playerID, this.credentials, this.multiplayer);
    }
  }, {
    key: "updatePlayerID",
    value: function updatePlayerID(playerID) {
      this.playerID = playerID;
      this.createDispatchers();
      this.transport.updatePlayerID(playerID);
    }
  }, {
    key: "updateGameID",
    value: function updateGameID(gameID) {
      this.gameID = gameID;
      this.createDispatchers();
      this.transport.updateGameID(gameID);
    }
  }, {
    key: "updateCredentials",
    value: function updateCredentials(credentials) {
      this.credentials = credentials;
      this.createDispatchers();
    }
  }]);

  return _ClientImpl;
}();
/**
 * Client
 *
 * boardgame.io JS client.
 *
 * @param {...object} game - The return value of `Game`.
 * @param {...object} numPlayers - The number of players.
 * @param {...object} multiplayer - Set to true or { server: '<host>:<port>' }
 *                                  to make a multiplayer client. The second
 *                                  syntax specifies a non-default socket server.
 * @param {...object} socketOpts - Options to pass to socket.io.
 * @param {...object} gameID - The gameID that you want to connect to.
 * @param {...object} playerID - The playerID associated with this client.
 * @param {...string} credentials - The authentication credentials associated with this client.
 *
 * Returns:
 *   A JS object that provides an API to interact with the
 *   game by dispatching moves and events.
 */


function Client(opts) {
  return new _ClientImpl(opts);
}

/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
function AssignShortcuts(moveNames, eventNames, blacklist) {
  var shortcuts = {};
  var events = {};

  for (var name in moveNames) {
    events[name] = name;
  }

  for (var _name in eventNames) {
    events[_name] = _name;
  }

  var taken = {};

  for (var i = 0; i < blacklist.length; i++) {
    var c = blacklist[i];
    taken[c] = true;
  } // Try assigning the first char of each move as the shortcut.


  var t = taken;
  var canUseFirstChar = true;

  for (var _name2 in events) {
    var shortcut = _name2[0];

    if (t[shortcut]) {
      canUseFirstChar = false;
      break;
    }

    t[shortcut] = true;
    shortcuts[_name2] = shortcut;
  }

  if (canUseFirstChar) {
    return shortcuts;
  } // If those aren't unique, use a-z.


  t = taken;
  var next = 97;
  shortcuts = {};

  for (var _name3 in events) {
    var _shortcut = String.fromCharCode(next);

    while (t[_shortcut]) {
      next++;
      _shortcut = String.fromCharCode(next);
    }

    t[_shortcut] = true;
    shortcuts[_name3] = _shortcut;
  }

  return shortcuts;
}

/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

var Item = function Item(props) {
  return React.createElement("div", {
    className: "gameinfo-item"
  }, React.createElement("strong", null, props.name, " "), React.createElement("div", null, JSON.stringify(props.value)));
};

Item.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.any
};
var GameInfo = function GameInfo(props) {
  return React.createElement("section", {
    className: "gameinfo"
  }, React.createElement(Item, {
    name: "gameID",
    value: props.gameID
  }), React.createElement(Item, {
    name: "playerID",
    value: props.playerID
  }), React.createElement(Item, {
    name: "isActive",
    value: props.isActive
  }), props.isMultiplayer && React.createElement("span", null, React.createElement(Item, {
    name: "isConnected",
    value: props.isConnected
  }), React.createElement(Item, {
    name: "isMultiplayer",
    value: props.isMultiplayer
  })));
};
GameInfo.propTypes = {
  gameID: PropTypes.string,
  playerID: PropTypes.string,
  isActive: PropTypes.bool,
  isConnected: PropTypes.bool,
  isMultiplayer: PropTypes.bool
};

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css = "/*\n * Copyright 2017 The boardgame.io Authors\n *\n * Use of this source code is governed by a MIT-style\n * license that can be found in the LICENSE file or at\n * https://opensource.org/licenses/MIT.\n */\n\n.debug-ui {\n  text-align: left;\n  overflow-x: hidden;\n  overflow-y: scroll;\n  background: #fefefe;\n  border-left: 1px solid #ddd;\n  box-shadow: -1px 0 10px #aaa;\n  position: absolute;\n  width: 300px;\n  right: 0;\n  top: 0;\n  height: 100%;\n  font-family: monospace;\n  font-size: 14px;\n  z-index: 9999;\n}\n\n#debug-controls.docktop {\n  position: fixed;\n  display: flex;\n  flex-direction: row;\n  justify-content: space-evenly;\n  align-items: center;\n  padding-left: 10px;\n  padding-right: 10px;\n  min-width: 500px;\n  top: 0;\n  right: 300px;\n  height: 50px;\n  background: #fff;\n  box-shadow: -3px 3px 3px #ccc;\n}\n\n@media only screen and (max-device-width: 750px) {\n  .debug-ui {\n    display: none;\n  }\n}\n\n.debug-ui .gameinfo {\n  background: #ddd;\n  position: fixed;\n  bottom: 0;\n  box-sizing: border-box;\n  width: 285px;\n  margin-left: -20px;\n  margin-bottom: 0;\n  padding: 10px;\n}\n\n.debug-ui .gameinfo-item div {\n  float: right;\n  text-align: right;\n}\n\n.debug-ui .ai-visualization {\n  position: fixed;\n  opacity: 100%;\n  right: 300px;\n  height: 100%;\n  width: 100%;\n  max-width: 3000px;\n  background: #fafafa;\n  border-right: 1px solid #ddd;\n}\n\n.debug-ui .pane {\n  float: left;\n  padding: 20px;\n  box-sizing: border-box;\n  min-width: 300px;\n  max-width: 400px;\n  opacity: 0.8;\n}\n\n.debug-ui section {\n  margin-bottom: 20px;\n}\n\n.debug-ui textarea {\n  resize: none;\n}\n\n.debug-ui .move {\n  cursor: pointer;\n  margin-bottom: 10px;\n  color: #666;\n}\n\n.debug-ui .move:hover {\n  color: #333;\n}\n\n.debug-ui .move.active {\n  color: #111;\n  font-weight: bold;\n}\n\n.debug-ui .move-error {\n  color: #a00;\n  font-weight: bold;\n}\n\n.debug-ui .arg-field {\n  outline: none;\n  font-family: monospace;\n}\n\n.debug-ui .key {\n  margin-bottom: 5px;\n}\n\n.debug-ui .key-box {\n  display: inline-block;\n  cursor: pointer;\n  min-width: 10px;\n  padding-left: 5px;\n  padding-right: 5px;\n  height: 20px;\n  line-height: 20px;\n  text-align: center;\n  border: 1px solid #ccc;\n  box-shadow: 1px 1px 1px #888;\n  background: #eee;\n  color: #444;\n}\n\n.debug-ui .key-box:hover {\n  background: #ddd;\n}\n\n.debug-ui .key.active .key-box {\n  background: #ddd;\n  border: 1px solid #999;\n  box-shadow: none;\n}\n\n.debug-ui .key-child {\n  display: inline-block;\n  height: 20px;\n  margin-left: 10px;\n}\n\n.debug-ui .menu {\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n}\n\n.debug-ui .menu .item {\n  cursor: pointer;\n  margin-top: -10px;\n  margin-bottom: 20px;\n  margin-right: 10px;\n  padding: 5px;\n  min-width: 50px;\n  text-align: center;\n}\n\n.debug-ui .menu .item.active {\n  font-weight: bold;\n  border-bottom: 3px solid #ccc;\n}\n\n.debug-ui .player-box {\n  display: flex;\n  flex-direction: row;\n}\n\n.debug-ui .player {\n  cursor: pointer;\n  text-align: center;\n  width: 30px;\n  height: 30px;\n  line-height: 30px;\n  background: #eee;\n  border: 3px solid #fff;\n  box-sizing: content-box;\n}\n\n.debug-ui .player.current {\n  background: #555;\n  color: #eee;\n  font-weight: bold;\n}\n\n.debug-ui .player.active {\n  border: 3px solid #ff7f50;\n}\n";
styleInject(css);

/**
 * KeyboardShortcut
 *
 * Registers a keyboard shortcut to activate the
 * associated child component that is passed in.
 *
 * When the key is pressed, 'active' is set to true
 * in the prop passed to the child.
 */

var KeyboardShortcut =
/*#__PURE__*/
function (_React$Component) {
  _inherits(KeyboardShortcut, _React$Component);

  function KeyboardShortcut() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, KeyboardShortcut);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(KeyboardShortcut)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      active: false
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "deactivate", function () {
      _this.setState({
        active: false
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "activate", function () {
      _this.setState({
        active: true
      });

      if (_this.props.onPress) {
        _this.props.onPress();

        _this.setState({
          active: false
        });
      }
    });

    return _this;
  }

  _createClass(KeyboardShortcut, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      Mousetrap.bind(this.props.value, function (e) {
        e.preventDefault();

        _this2.activate();
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      Mousetrap.unbind(this.props.value);
    }
  }, {
    key: "render",
    value: function render() {
      var child = this.props.children;

      if (_typeof(this.props.children) === _typeof(this)) {
        child = React.cloneElement(this.props.children, {
          active: this.state.active,
          deactivate: this.deactivate,
          activate: this.activate
        });
      }

      var className = 'key';

      if (this.state.active) {
        className += ' active';
      }

      return React.createElement("div", {
        className: className
      }, React.createElement("div", {
        className: "key-box",
        onClick: this.activate
      }, this.props.value), React.createElement("div", {
        className: "key-child"
      }, child));
    }
  }]);

  return KeyboardShortcut;
}(React.Component);

_defineProperty(KeyboardShortcut, "propTypes", {
  value: PropTypes.string.isRequired,
  children: PropTypes.any,
  onPress: PropTypes.func
});

/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
/**
 * Controls that are triggered by keyboard shortcuts.
 */

var Controls = function Controls(props) {
  var ai = null;

  if (props.step) {
    ai = [React.createElement(KeyboardShortcut, {
      key: "4",
      value: "4",
      onPress: props.step
    }, "step"), React.createElement(KeyboardShortcut, {
      key: "5",
      value: "5",
      onPress: props.simulate
    }, "simulate")];
  }

  var style = null;
  var className = 'controls';

  if (props.dockTop) {
    className += ' docktop';
  }

  if (props.help) {
    className += ' help';
  }

  var display = props.help && !props.dockTop ? 'block' : 'none';
  return React.createElement("section", {
    id: "debug-controls",
    style: style,
    className: className
  }, React.createElement(KeyboardShortcut, {
    value: "1",
    onPress: props.reset
  }, "reset"), React.createElement(KeyboardShortcut, {
    value: "2",
    onPress: props.save
  }, "save"), React.createElement(KeyboardShortcut, {
    value: "3",
    onPress: props.restore
  }, "restore"), ai, props.dockTop || React.createElement(KeyboardShortcut, {
    value: "?",
    onPress: props.toggleHelp
  }, "show more"), React.createElement("div", {
    className: "key",
    style: {
      display: display
    }
  }, React.createElement("div", {
    className: "key-box"
  }, "d"), " show/hide this pane"), React.createElement("div", {
    className: "key",
    style: {
      display: display
    }
  }, React.createElement("div", {
    className: "key-box"
  }, "l"), " show/hide log"), React.createElement("div", {
    className: "key",
    style: {
      display: display
    }
  }, React.createElement("div", {
    className: "key-box"
  }, "i"), " show/hide game info tab"), React.createElement("div", {
    className: "key",
    style: {
      display: display
    }
  }, React.createElement("div", {
    className: "key-box"
  }, "t"), " dock controls"));
};
Controls.propTypes = {
  help: PropTypes.bool,
  toggleHelp: PropTypes.func,
  step: PropTypes.func,
  simulate: PropTypes.func,
  reset: PropTypes.func,
  save: PropTypes.func,
  restore: PropTypes.func,
  dockTop: PropTypes.bool
};

/**
 * Component that renders information about the
 * players in the game (whose turn it is etc.).
 */

var PlayerInfo =
/*#__PURE__*/
function (_React$Component) {
  _inherits(PlayerInfo, _React$Component);

  function PlayerInfo() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, PlayerInfo);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(PlayerInfo)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onClick", function (playerID) {
      var arg = playerID == _this.props.playerID ? null : playerID;

      _this.props.onClick(arg);
    });

    return _this;
  }

  _createClass(PlayerInfo, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var players = [];

      var _loop = function _loop(i) {
        var playerID = i + '';
        var className = 'player';

        if (playerID === _this2.props.ctx.currentPlayer) {
          className += ' current';
        }

        if (playerID === _this2.props.playerID) {
          className += ' active';
        }

        players.push(React.createElement("div", {
          className: className,
          key: i,
          onClick: function onClick() {
            return _this2.onClick(playerID);
          }
        }, playerID));
      };

      for (var i = 0; i < this.props.ctx.numPlayers; i++) {
        _loop(i);
      }

      return React.createElement("div", {
        className: "player-box"
      }, players);
    }
  }]);

  return PlayerInfo;
}(React.Component);

_defineProperty(PlayerInfo, "propTypes", {
  ctx: PropTypes.any.isRequired,
  playerID: PropTypes.any,
  onClick: PropTypes.func
});

/**
 * DebugMove
 *
 * Component that allows the user to dispatch a move from
 * the debug pane. The user is presented with the textarea
 * to enter any additional arguments.
 */

var DebugMove =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DebugMove, _React$Component);

  function DebugMove() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, DebugMove);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DebugMove)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      error: ''
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onSubmit", function (value) {
      var error$$1 = '';

      try {
        var argArray = new Function("return [".concat(value, "]"))();

        _this.props.fn.apply(_assertThisInitialized(_assertThisInitialized(_this)), argArray);
      } catch (error2) {
        error$$1 = '' + error2;
      }

      _this.setState({
        error: error$$1,
        focus: false,
        enterArg: false
      });
    });

    return _this;
  }

  _createClass(DebugMove, [{
    key: "render",
    value: function render() {
      return React.createElement("div", null, React.createElement(KeyboardShortcut, {
        value: this.props.shortcut
      }, React.createElement(DebugMoveArgField, {
        name: this.props.name,
        onSubmit: this.onSubmit
      })), this.state.error ? React.createElement("span", {
        className: "move-error"
      }, this.state.error) : null);
    }
  }]);

  return DebugMove;
}(React.Component);

_defineProperty(DebugMove, "propTypes", {
  name: PropTypes.string.isRequired,
  shortcut: PropTypes.string.isRequired,
  fn: PropTypes.func.isRequired
});

var DebugMoveArgField =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(DebugMoveArgField, _React$Component2);

  function DebugMoveArgField() {
    var _getPrototypeOf3;

    var _this2;

    _classCallCheck(this, DebugMoveArgField);

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this2 = _possibleConstructorReturn(this, (_getPrototypeOf3 = _getPrototypeOf(DebugMoveArgField)).call.apply(_getPrototypeOf3, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this2)), "onKeyDown", function (e) {
      if (e.key == 'Enter') {
        e.preventDefault();
        var value = _this2.span.innerText;

        _this2.props.onSubmit(value);

        _this2.span.innerText = '';

        _this2.props.deactivate();
      }

      if (e.key == 'Escape') {
        e.preventDefault();

        _this2.props.deactivate();
      }
    });

    return _this2;
  }

  _createClass(DebugMoveArgField, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if (this.props.active) {
        this.span.focus();
      } else {
        this.span.blur();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var className = 'move';
      if (this.props.active) className += ' active';
      return React.createElement("div", {
        className: className,
        onClick: this.props.activate
      }, this.props.name, "(", React.createElement("span", {
        ref: function ref(r) {
          _this3.span = r;
        },
        className: "arg-field",
        onBlur: this.props.deactivate,
        onKeyDown: this.onKeyDown,
        contentEditable: true
      }), ")");
    }
  }]);

  return DebugMoveArgField;
}(React.Component);

_defineProperty(DebugMoveArgField, "propTypes", {
  name: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  active: PropTypes.bool,
  activate: PropTypes.func,
  deactivate: PropTypes.func
});

var css$1 = "/*\n * Copyright 2017 The boardgame.io Authors\n *\n * Use of this source code is governed by a MIT-style\n * license that can be found in the LICENSE file or at\n * https://opensource.org/licenses/MIT.\n */\n\n.gamelog {\n  display: grid;\n  grid-template-columns: 30px 1fr 30px;\n  grid-auto-rows: auto;\n  grid-auto-flow: column;\n}\n\n.gamelog .turn-marker {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  grid-column: 1;\n  background: #555;\n  color: #eee;\n  text-align: center;\n  font-weight: bold;\n  border: 1px solid #888;\n}\n\n.gamelog .log-event {\n  grid-column: 2;\n  cursor: pointer;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  background: #fff;\n  border: 1px dotted #ccc;\n  border-left: 5px solid #ccc;\n  padding: 5px;\n  text-align: center;\n  color: #888;\n  font-size: 14px;\n  min-height: 25px;\n  line-height: 25px;\n}\n\n.gamelog .phase-marker {\n  grid-column: 3;\n  background: #555;\n  border: 1px solid #888;\n  color: #eee;\n  text-align: center;\n  font-weight: bold;\n  padding-top: 10px;\n  padding-bottom: 10px;\n  text-orientation: sideways;\n  writing-mode: vertical-rl;\n  line-height: 30px;\n  width: 100%;\n}\n\n.gamelog.pinned .log-event {\n  opacity: 0.2;\n}\n\n.gamelog .log-event:hover {\n  border-style: solid;\n  background: #eee;\n}\n\n.gamelog .log-event.pinned {\n  border-style: solid;\n  background: #eee;\n  opacity: 1;\n}\n\n.gamelog div.player0 {\n  border-left-color: #ff851b;\n}\n\n.gamelog div.player1 {\n  border-left-color: #7fdbff;\n}\n\n.gamelog div.player2 {\n  border-left-color: #0074d9;\n}\n\n.gamelog div.player3 {\n  border-left-color: #39cccc;\n}\n\n.gamelog div.player4 {\n  border-left-color: #3d9970;\n}\n\n.gamelog div.player5 {\n  border-left-color: #2ecc40;\n}\n\n.gamelog div.player6 {\n  border-left-color: #01ff70;\n}\n\n.gamelog div.player7 {\n  border-left-color: #ffdc00;\n}\n\n.gamelog div.player8 {\n  border-left-color: #001f3f;\n}\n\n.gamelog div.player9 {\n  border-left-color: #ff4136;\n}\n\n.gamelog div.player10 {\n  border-left-color: #85144b;\n}\n\n.gamelog div.player11 {\n  border-left-color: #f012be;\n}\n\n.gamelog div.player12 {\n  border-left-color: #b10dc9;\n}\n\n.gamelog div.player13 {\n  border-left-color: #111111;\n}\n\n.gamelog div.player14 {\n  border-left-color: #aaaaaa;\n}\n\n.gamelog div.player15 {\n  border-left-color: #dddddd;\n}\n";
styleInject(css$1);

/**
 * Default component to render custom payload.
 */

var CustomPayload = function CustomPayload(props) {
  var custompayload = props.payload !== undefined ? JSON.stringify(props.payload, null, 4) : '';
  return React.createElement("div", null, custompayload);
};

CustomPayload.propTypes = {
  payload: PropTypes.any
};
/**
 * LogEvent
 *
 * Logs a single action in the game.
 */

var LogEvent = function LogEvent(props) {
  var action = props.action;
  var args = action.payload.args || [];
  var playerID = action.payload.playerID;
  var classNames = "log-event player".concat(playerID);

  if (props.pinned) {
    classNames += ' pinned';
  } // allow to pass in custom rendering component for custom payload


  var customPayload = props.payloadComponent !== undefined ? React.createElement(props.payloadComponent, {
    payload: props.payload
  }) : React.createElement(CustomPayload, {
    payload: props.payload
  });
  return React.createElement("div", {
    className: classNames,
    onClick: function onClick() {
      return props.onLogClick(props.logIndex);
    },
    onMouseEnter: function onMouseEnter() {
      return props.onMouseEnter(props.logIndex);
    },
    onMouseLeave: function onMouseLeave() {
      return props.onMouseLeave();
    }
  }, React.createElement("div", null, action.payload.type, "(", args.join(','), ")"), customPayload);
};

LogEvent.propTypes = {
  action: PropTypes.any.isRequired,
  logIndex: PropTypes.number.isRequired,
  onLogClick: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  pinned: PropTypes.bool,
  payload: PropTypes.object,
  payloadComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
};
/**
 * TurnMarker
 *
 * The markers on the left of the log events that indicate
 * which turn the event belongs to.
 */

var TurnMarker = function TurnMarker(props) {
  return React.createElement("div", {
    className: "turn-marker",
    style: {
      gridRow: 'span ' + props.numEvents
    }
  }, props.turn);
};

TurnMarker.propTypes = {
  turn: PropTypes.number.isRequired,
  numEvents: PropTypes.number.isRequired
};
/**
 * PhaseMarker
 *
 * The markers on the right of the log events that indicate
 * which phase the event belongs to.
 */

var PhaseMarker = function PhaseMarker(props) {
  return React.createElement("div", {
    className: "phase-marker",
    style: {
      gridRow: 'span ' + props.numEvents
    }
  }, props.phase);
};

PhaseMarker.propTypes = {
  phase: PropTypes.string.isRequired,
  numEvents: PropTypes.number.isRequired
};
/**
 * GameLog
 *
 * Component to log the actions in the game.
 */

var GameLog =
/*#__PURE__*/
function (_React$Component) {
  _inherits(GameLog, _React$Component);

  function GameLog() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, GameLog);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(GameLog)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      pinned: null
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "rewind", function (logIndex) {
      var state = _this.props.initialState;

      for (var i = 0; i < _this.props.log.length; i++) {
        var action = _this.props.log[i].action;

        if (!action.automatic) {
          state = _this.props.reducer(state, action);
        }

        if (action.type == MAKE_MOVE) {
          if (logIndex == 0) {
            break;
          }

          logIndex--;
        }
      }

      return {
        G: state.G,
        ctx: state.ctx
      };
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onLogClick", function (logIndex) {
      _this.setState(function (o) {
        var state = _this.rewind(logIndex);

        var renderedLogEntries = _this.props.log.filter(function (e) {
          return e.action.type == MAKE_MOVE;
        });

        var metadata = renderedLogEntries[logIndex].action.payload.metadata;

        if (o.pinned === logIndex) {
          _this.props.onHover({
            logIndex: logIndex,
            state: state,
            metadata: undefined
          });

          return {
            pinned: null
          };
        }

        _this.props.onHover({
          logIndex: logIndex,
          state: state,
          metadata: metadata
        });

        return {
          pinned: logIndex
        };
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onMouseEnter", function (logIndex) {
      if (_this.state.pinned === null) {
        var state = _this.rewind(logIndex);

        _this.props.onHover({
          logIndex: logIndex,
          state: state
        });
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onMouseLeave", function () {
      if (_this.state.pinned === null) {
        _this.props.onHover({
          state: null
        });
      }
    });

    return _this;
  }

  _createClass(GameLog, [{
    key: "render",
    value: function render() {
      var log = [];
      var turns = [];
      var phases = [];
      var eventsInCurrentPhase = 0;
      var eventsInCurrentTurn = 0;
      var renderedLogEntries = this.props.log.filter(function (e) {
        return e.action.type == MAKE_MOVE;
      });

      for (var i = 0; i < renderedLogEntries.length; i++) {
        var _renderedLogEntries$i = renderedLogEntries[i],
            action = _renderedLogEntries$i.action,
            payload = _renderedLogEntries$i.payload,
            turn = _renderedLogEntries$i.turn,
            phase = _renderedLogEntries$i.phase;
        eventsInCurrentPhase++;
        eventsInCurrentTurn++;
        log.push(React.createElement(LogEvent, {
          key: i,
          pinned: i === this.state.pinned,
          logIndex: i,
          onLogClick: this.onLogClick,
          onMouseEnter: this.onMouseEnter,
          onMouseLeave: this.onMouseLeave,
          action: action,
          payload: payload,
          payloadComponent: this.props.payloadComponent
        }));

        if (i == renderedLogEntries.length - 1 || renderedLogEntries[i + 1].turn != turn) {
          turns.push(React.createElement(TurnMarker, {
            key: turns.length,
            turn: turn,
            numEvents: eventsInCurrentTurn
          }));
          eventsInCurrentTurn = 0;
        }

        if (i == renderedLogEntries.length - 1 || renderedLogEntries[i + 1].phase != phase) {
          phases.push(React.createElement(PhaseMarker, {
            key: phases.length,
            phase: phase,
            numEvents: eventsInCurrentPhase
          }));
          eventsInCurrentPhase = 0;
        }
      }

      var className = 'gamelog';

      if (this.state.pinned !== null) {
        className += ' pinned';
      }

      return React.createElement("div", {
        className: className
      }, turns, log, phases);
    }
  }]);

  return GameLog;
}(React.Component);

_defineProperty(GameLog, "propTypes", {
  onHover: PropTypes.func,
  reducer: PropTypes.func,
  initialState: PropTypes.any.isRequired,
  log: PropTypes.array.isRequired,
  payloadComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
});

_defineProperty(GameLog, "defaultProps", {
  onHover: function onHover() {}
});

/**
 * Removes all the keys in ctx that begin with a _.
 */

function SanitizeCtx(ctx) {
  var r = {};

  for (var key in ctx) {
    if (!key.startsWith('_')) {
      r[key] = ctx[key];
    }
  }

  return r;
}
/**
 * Debug
 *
 * Debug pane that displays the game state objects,
 * allows you to dispatch moves,
 * and allows you to save / restore from localStorage.
 */


var Debug =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Debug, _React$Component);

  function Debug(props) {
    var _this;

    _classCallCheck(this, Debug);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Debug).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "saveState", function () {
      var json = stringify(_this.props.gamestate);
      window.localStorage.setItem('gamestate', json);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "restoreState", function () {
      var gamestateJSON = window.localStorage.getItem('gamestate');

      if (gamestateJSON !== null) {
        var gamestate = parse(gamestateJSON);

        _this.props.store.dispatch(sync(gamestate));
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onClickMain", function () {
      _this.setState({
        showLog: false
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onClickLog", function () {
      _this.setState({
        showLog: true
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "toggleHelp", function () {
      _this.setState(function (oldstate) {
        return {
          help: !oldstate.help
        };
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onLogHover", function (_ref) {
      var state = _ref.state,
          metadata = _ref.metadata;

      _this.setState({
        AIMetadata: metadata
      });

      _this.props.overrideGameState(state);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "simulate", function () {
      var iterations = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10000;
      var sleepTimeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;

      var step = async function step() {
        for (var i = 0; i < iterations; i++) {
          var action = await _this.props.step();
          if (!action) break;
          await new Promise(function (resolve) {
            return setTimeout(resolve, sleepTimeout);
          });
        }
      };

      return step();
    });

    _this.shortcuts = AssignShortcuts(props.moves, props.events, 'dlit');
    _this.state = {
      showDebugUI: false,
      showLog: false,
      showGameInfo: props.showGameInfo,
      dockControls: props.dockControls,
      help: false,
      AIMetadata: null
    };
    return _this;
  }

  _createClass(Debug, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      Mousetrap.bind('d', function (e) {
        e.preventDefault();

        _this2.setState(function (old) {
          return {
            showDebugUI: !old.showDebugUI
          };
        });
      });
      Mousetrap.bind('l', function (e) {
        e.preventDefault();

        _this2.setState(function (old) {
          return {
            showLog: !old.showLog
          };
        });
      });
      Mousetrap.bind('i', function (e) {
        e.preventDefault();

        _this2.setState(function (old) {
          return {
            showGameInfo: !old.showGameInfo
          };
        });
      });
      Mousetrap.bind('t', function (e) {
        e.preventDefault();

        _this2.setState(function (old) {
          return {
            dockControls: !old.dockControls
          };
        });
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      Mousetrap.unbind('d');
      Mousetrap.unbind('l');
      Mousetrap.unbind('i');
      Mousetrap.unbind('t');
    }
  }, {
    key: "render",
    value: function render() {
      if (!this.state.showDebugUI) {
        return null;
      }

      var moves = [];

      for (var name in this.props.moves) {
        var fn = this.props.moves[name];
        var shortcut = this.shortcuts[name];
        moves.push(React.createElement(DebugMove, {
          key: name,
          name: name,
          fn: fn,
          shortcut: shortcut
        }));
      }

      var events = [];

      for (var _name in this.props.events) {
        var _fn = this.props.events[_name];
        var _shortcut = this.shortcuts[_name];
        events.push(React.createElement(DebugMove, {
          key: _name,
          name: _name,
          fn: _fn,
          shortcut: _shortcut
        }));
      }

      var visualizeAI = this.state.AIMetadata && this.props.visualizeAI;
      var className = 'debug-ui';

      if (this.state.dockControls) {
        className += ' docktop';
      }

      return React.createElement("div", {
        className: className
      }, visualizeAI && React.createElement("div", {
        className: "ai-visualization"
      }, this.props.visualizeAI(this.state.AIMetadata)), React.createElement("div", {
        className: "pane"
      }, React.createElement("div", {
        className: "menu"
      }, React.createElement("div", {
        className: this.state.showLog ? 'item' : 'item active',
        onClick: this.onClickMain
      }, "Main"), React.createElement("div", {
        className: this.state.showLog ? 'item active' : 'item',
        onClick: this.onClickLog
      }, "Log")), this.state.showLog || React.createElement("span", null, this.state.showGameInfo && React.createElement(GameInfo, {
        gameID: this.props.gameID,
        playerID: this.props.playerID,
        isActive: this.props.gamestate.isActive,
        isConnected: this.props.gamestate.isConnected,
        isMultiplayer: this.props.isMultiplayer
      }), React.createElement(Controls, {
        dockTop: this.state.dockControls,
        help: this.state.help,
        toggleHelp: this.toggleHelp,
        step: this.props.step,
        simulate: this.simulate,
        reset: this.props.reset,
        save: this.saveState,
        restore: this.restoreState
      }), React.createElement("h3", null, "Players"), React.createElement(PlayerInfo, {
        ctx: this.props.gamestate.ctx,
        playerID: this.props.playerID,
        onClick: this.props.updatePlayerID
      }), React.createElement("h3", null, "Moves"), React.createElement("section", null, moves), React.createElement("h3", null, "Events"), React.createElement("section", null, events), React.createElement("section", null, React.createElement("pre", {
        className: "json"
      }, React.createElement("strong", null, "G"), ":", ' ', JSON.stringify(this.props.gamestate.G, null, 2))), React.createElement("section", null, React.createElement("pre", {
        className: "json"
      }, React.createElement("strong", null, "ctx"), ":", ' ', JSON.stringify(SanitizeCtx(this.props.gamestate.ctx), null, 2)))), this.state.showLog && React.createElement("section", null, React.createElement(GameLog, {
        onHover: this.onLogHover,
        reducer: this.props.reducer,
        log: this.props.gamestate.log,
        initialState: this.props.gamestate._initial
      }))));
    }
  }]);

  return Debug;
}(React.Component);

_defineProperty(Debug, "propTypes", {
  gamestate: PropTypes.shape({
    G: PropTypes.any.isRequired,
    ctx: PropTypes.any.isRequired,
    log: PropTypes.array.isRequired,
    isActive: PropTypes.bool,
    isConnected: PropTypes.bool,
    _initial: PropTypes.any.isRequired
  }),
  gameID: PropTypes.string.isRequired,
  playerID: PropTypes.string,
  isMultiplayer: PropTypes.bool,
  moves: PropTypes.any,
  events: PropTypes.any,
  restore: PropTypes.func,
  showLog: PropTypes.bool,
  store: PropTypes.any,
  step: PropTypes.func,
  reset: PropTypes.func,
  reducer: PropTypes.func,
  overrideGameState: PropTypes.func,
  visualizeAI: PropTypes.func,
  updateGameID: PropTypes.func,
  updatePlayerID: PropTypes.func,
  updateCredentials: PropTypes.func,
  showGameInfo: PropTypes.bool,
  dockControls: PropTypes.bool
});

_defineProperty(Debug, "defaultProps", {
  showGameInfo: true,
  dockControls: false
});

/**
 * Client
 *
 * boardgame.io React client.
 *
 * @param {...object} game - The return value of `Game`.
 * @param {...object} numPlayers - The number of players.
 * @param {...object} board - The React component for the game.
 * @param {...object} loading - (optional) The React component for the loading state.
 * @param {...object} multiplayer - Set to true or { server: '<host>:<port>' }
 *                                  to make a multiplayer client. The second
 *                                  syntax specifies a non-default socket server.
 * @param {...object} debug - Enables the Debug UI.
 * @param {...object} enhancer - Optional enhancer to send to the Redux store
 *
 * Returns:
 *   A React component that wraps board and provides an
 *   API through props for it to interact with the framework
 *   and dispatch actions such as MAKE_MOVE, GAME_EVENT, RESET,
 *   UNDO and REDO.
 */

function Client$1(opts) {
  var _class, _temp;

  var game = opts.game,
      numPlayers = opts.numPlayers,
      loading = opts.loading,
      board = opts.board,
      multiplayer = opts.multiplayer,
      ai = opts.ai,
      debug = opts.debug,
      enhancer = opts.enhancer; // Component that is displayed before the client has synced
  // with the game master.

  if (loading === undefined) {
    var Loading = function Loading() {
      return React.createElement("div", {
        className: "bgio-loading"
      }, "connecting...");
    };

    loading = Loading;
  }
  /*
   * WrappedBoard
   *
   * The main React component that wraps the passed in
   * board component and adds the API to its props.
   */


  return _temp = _class =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(WrappedBoard, _React$Component);

    function WrappedBoard(props) {
      var _this;

      _classCallCheck(this, WrappedBoard);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(WrappedBoard).call(this, props));

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
        gameStateOverride: null
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "updateGameID", function (gameID) {
        _this.client.updateGameID(gameID);

        _this.gameID = gameID;

        _this.forceUpdate();
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "updatePlayerID", function (playerID) {
        _this.client.updatePlayerID(playerID);

        _this.playerID = playerID;

        _this.forceUpdate();
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "updateCredentials", function (credentials) {
        _this.client.updateCredentials(credentials);

        _this.credentials = credentials;

        _this.forceUpdate();
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "overrideGameState", function (state) {
        _this.setState({
          gameStateOverride: state
        });
      });

      _this.client = Client({
        game: game,
        ai: ai,
        numPlayers: numPlayers,
        multiplayer: multiplayer,
        gameID: props.gameID,
        playerID: props.playerID,
        credentials: props.credentials,
        enhancer: enhancer
      });
      _this.gameID = props.gameID;
      _this.playerID = props.playerID;
      _this.credentials = props.credentials;

      _this.client.subscribe(function () {
        return _this.forceUpdate();
      });

      return _this;
    }

    _createClass(WrappedBoard, [{
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps) {
        if (this.props.gameID != prevProps.gameID) {
          this.updateGameID(this.props.gameID);
        }

        if (this.props.playerID != prevProps.playerID) {
          this.updatePlayerID(this.props.playerID);
        }

        if (this.props.credentials != prevProps.credentials) {
          this.updateCredentials(this.props.credentials);
        }
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        this.client.connect();
      }
    }, {
      key: "render",
      value: function render() {
        var _board = null;
        var _debug = null;
        var state = this.client.getState();

        var _this$props = this.props,
            debugProp = _this$props.debug,
            rest = _objectWithoutProperties(_this$props, ["debug"]);

        if (this.state.gameStateOverride) {
          state = _objectSpread({}, state, this.state.gameStateOverride);
        }

        if (state === null) {
          return React.createElement(loading);
        }

        if (board) {
          _board = React.createElement(board, _objectSpread({}, state, rest, {
            isMultiplayer: multiplayer !== undefined,
            moves: this.client.moves,
            events: this.client.events,
            gameID: this.gameID,
            playerID: this.playerID,
            step: this.client.step,
            reset: this.client.reset,
            undo: this.client.undo,
            redo: this.client.redo,
            gameMetadata: this.client.gameMetadata
          }));
        }

        if (debug !== false && debugProp) {
          var showGameInfo = _typeof(debug) === 'object' && debug.showGameInfo;
          var dockControls = _typeof(debug) === 'object' && debug.dockControls;
          _debug = React.createElement(Debug, {
            gamestate: state,
            reducer: this.client.reducer,
            store: this.client.store,
            isMultiplayer: multiplayer !== undefined,
            moves: this.client.moves,
            events: this.client.events,
            gameID: this.gameID,
            playerID: this.playerID,
            credentials: this.credentials,
            step: this.client.step,
            reset: this.client.reset,
            undo: this.client.undo,
            redo: this.client.redo,
            visualizeAI: ai && ai.visualize,
            overrideGameState: this.overrideGameState,
            updateGameID: this.updateGameID,
            updatePlayerID: this.updatePlayerID,
            updateCredentials: this.updateCredentials,
            showGameInfo: showGameInfo,
            dockControls: dockControls
          });
        }

        return React.createElement("div", {
          className: "bgio-client"
        }, _debug, _board);
      }
    }]);

    return WrappedBoard;
  }(React.Component), _defineProperty(_class, "propTypes", {
    // The ID of a game to connect to.
    // Only relevant in multiplayer.
    gameID: PropTypes.string,
    // The ID of the player associated with this client.
    // Only relevant in multiplayer.
    playerID: PropTypes.string,
    // This client's authentication credentials.
    // Only relevant in multiplayer.
    credentials: PropTypes.string,
    // Enable / disable the Debug UI.
    debug: PropTypes.any
  }), _defineProperty(_class, "defaultProps", {
    gameID: 'default',
    playerID: null,
    credentials: null,
    debug: true
  }), _temp;
}

/**
 * Client
 *
 * boardgame.io React Native client.
 *
 * @param {...object} game - The return value of `Game`.
 * @param {...object} numPlayers - The number of players.
 * @param {...object} board - The React component for the game.
 * @param {...object} loading - (optional) The React component for the loading state.
 * @param {...object} multiplayer - Set to true or { server: '<host>:<port>' }
 *                                  to make a multiplayer client. The second
 *                                  syntax specifies a non-default socket server.
 * @param {...object} enhancer - Optional enhancer to send to the Redux store
 *
 * Returns:
 *   A React Native component that wraps board and provides an
 *   API through props for it to interact with the framework
 *   and dispatch actions such as MAKE_MOVE.
 */

function Client$2(opts) {
  var _class, _temp;

  var game = opts.game,
      numPlayers = opts.numPlayers,
      board = opts.board,
      multiplayer = opts.multiplayer,
      enhancer = opts.enhancer;
  /*
   * WrappedBoard
   *
   * The main React component that wraps the passed in
   * board component and adds the API to its props.
   */

  return _temp = _class =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(WrappedBoard, _React$Component);

    function WrappedBoard(props) {
      var _this;

      _classCallCheck(this, WrappedBoard);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(WrappedBoard).call(this, props));
      _this.client = Client({
        game: game,
        numPlayers: numPlayers,
        multiplayer: multiplayer,
        gameID: props.gameID,
        playerID: props.playerID,
        credentials: props.credentials,
        socketOpts: {
          transports: ['websocket']
        },
        enhancer: enhancer
      });

      _this.client.subscribe(function () {
        return _this.forceUpdate();
      });

      return _this;
    } // eslint-disable-next-line react/no-deprecated


    _createClass(WrappedBoard, [{
      key: "componentWillReceiveProps",
      value: function componentWillReceiveProps(nextProps) {
        if (nextProps.gameID != this.props.gameID) {
          this.client.updateGameID(nextProps.gameID);
        }

        if (nextProps.playerID != this.props.playerID) {
          this.client.updatePlayerID(nextProps.playerID);
        }

        if (nextProps.credentials != this.props.credentials) {
          this.client.updateCredentials(nextProps.credentials);
        }
      } // eslint-disable-next-line react/no-deprecated

    }, {
      key: "componentWillMount",
      value: function componentWillMount() {
        this.client.connect();
      }
    }, {
      key: "render",
      value: function render() {
        var _board = null;
        var state = this.client.getState();

        var _this$props = this.props,
            gameID = _this$props.gameID,
            playerID = _this$props.playerID,
            rest = _objectWithoutProperties(_this$props, ["gameID", "playerID"]);

        if (board) {
          _board = React.createElement(board, _objectSpread({}, state, rest, {
            gameID: gameID,
            playerID: playerID,
            isMultiplayer: multiplayer !== undefined,
            moves: this.client.moves,
            events: this.client.events,
            step: this.client.step,
            reset: this.client.reset,
            undo: this.client.undo,
            redo: this.client.redo,
            gameMetadata: this.client.gameMetadata
          }));
        }

        return _board;
      }
    }]);

    return WrappedBoard;
  }(React.Component), _defineProperty(_class, "propTypes", {
    // The ID of a game to connect to.
    // Only relevant in multiplayer.
    gameID: PropTypes.string,
    // The ID of the player associated with this client.
    // Only relevant in multiplayer.
    playerID: PropTypes.string,
    // This client's authentication credentials.
    // Only relevant in multiplayer.
    credentials: PropTypes.string
  }), _defineProperty(_class, "defaultProps", {
    gameID: 'default',
    playerID: null,
    credentials: null
  }), _temp;
}

/**
 * Standard move that simulates passing.
 *
 * Creates two objects in G:
 * passOrder - An array of playerIDs capturing passes in the pass order.
 * allPassed - Set to true when all players have passed.
 */

var Pass = function Pass(G, ctx) {
  var passOrder = [];

  if (G.passOrder !== undefined) {
    passOrder = G.passOrder;
  }

  var playerID = ctx.playerID;
  passOrder = [].concat(_toConsumableArray(passOrder), [playerID]);
  G = _objectSpread({}, G, {
    passOrder: passOrder
  });

  if (passOrder.length >= ctx.numPlayers) {
    G = _objectSpread({}, G, {
      allPassed: true
    });
  }

  return G;
};
/**
 * Event to change the actionPlayers array.
 * @param {object} state - The game state.
 * @param {object} arg - An array of playerID's or <object> of:
 *   {
 *     value: (G, ctx) => [],        // function that returns an array of playerID's (optional if all is set)
 *
 *     all: true,        // set value to all playerID's
 *
 *     others: true,     // set value to all except currentPlayer.
 *
 *     once: true,       // players have one move
 *                       // (after which they're pruned from actionPlayers).
 *                       // The phase ends once actionPlayers becomes empty.
 *   }
 */

function SetActionPlayersEvent(state, arg) {
  return _objectSpread({}, state, {
    ctx: setActionPlayers(state.G, state.ctx, arg)
  });
}

function setActionPlayers(G, ctx, arg) {
  var actionPlayers = [];

  if (arg.value) {
    actionPlayers = arg.value(G, ctx);
  }

  if (arg.all) {
    actionPlayers = _toConsumableArray(ctx.playOrder);
  }

  if (arg.others) {
    actionPlayers = _toConsumableArray(ctx.playOrder).filter(function (nr) {
      return nr !== ctx.currentPlayer;
    });
  }

  if (arg instanceof Function) {
    actionPlayers = arg(G, ctx);
  }

  if (Array.isArray(arg)) {
    actionPlayers = arg;
  }

  return _objectSpread({}, ctx, {
    actionPlayers: actionPlayers,
    _actionPlayersOnce: arg.once || false
  });
}
/**
 * Converts a playOrderPos index into its value in playOrder.
 * @param {Array} playOrder - An array of player ID's.
 * @param {number} playOrderPos - An index into the above.
 */


function getCurrentPlayer(playOrder, playOrderPos) {
  return playOrder[playOrderPos] + '';
}
/**
 * Called at the start of a phase to initialize turn order state.
 * @param {object} G - The game object G.
 * @param {object} ctx - The game object ctx.
 * @param {object} turnOrder - A turn order object for this phase.
 */


function InitTurnOrderState(G, ctx, turnOrder) {
  var playOrder = _toConsumableArray(new Array(ctx.numPlayers)).map(function (d, i) {
    return i + '';
  });

  if (turnOrder.playOrder !== undefined) {
    playOrder = turnOrder.playOrder(G, ctx);
  }

  var playOrderPos = turnOrder.first(G, ctx);
  var currentPlayer = getCurrentPlayer(playOrder, playOrderPos);

  if (turnOrder.actionPlayers !== undefined) {
    ctx = setActionPlayers(G, ctx, turnOrder.actionPlayers);
  } else {
    ctx = _objectSpread({}, ctx, {
      actionPlayers: [currentPlayer]
    });
  }

  return _objectSpread({}, ctx, {
    currentPlayer: currentPlayer,
    playOrderPos: playOrderPos,
    playOrder: playOrder
  });
}
/**
 * Called at the end of each turn to update the turn order state.
 * @param {object} G - The game object G.
 * @param {object} ctx - The game object ctx.
 * @param {object} turnOrder - A turn order object for this phase.
 * @param {string} endTurnArg - An optional argument to endTurn that
                                may specify the next player.
 */

function UpdateTurnOrderState(G, ctx, turnOrder, endTurnArg) {
  var playOrderPos = ctx.playOrderPos;
  var currentPlayer = ctx.currentPlayer;
  var actionPlayers = ctx.actionPlayers;
  var endPhase = false;

  if (endTurnArg && endTurnArg !== true) {
    if (ctx.playOrder.includes(endTurnArg.next)) {
      playOrderPos = ctx.playOrder.indexOf(endTurnArg.next);
      currentPlayer = endTurnArg.next;
      actionPlayers = [currentPlayer];
    }
  } else {
    var t = turnOrder.next(G, ctx);

    if (t === undefined) {
      endPhase = true;
    } else {
      playOrderPos = t;
      currentPlayer = getCurrentPlayer(ctx.playOrder, playOrderPos);

      if (turnOrder.actionPlayers === undefined) {
        actionPlayers = [currentPlayer];
      }
    }
  }

  ctx = _objectSpread({}, ctx, {
    playOrderPos: playOrderPos,
    currentPlayer: currentPlayer,
    actionPlayers: actionPlayers
  });
  return {
    endPhase: endPhase,
    ctx: ctx
  };
}
/**
 * Set of different turn orders possible in a phase.
 * These are meant to be passed to the `turnOrder` setting
 * in the flow objects.
 *
 * Each object defines the first player when the phase / game
 * begins, and also a function `next` to determine who the
 * next player is when the turn ends.
 *
 * Objects can also contain an actionPlayers section which
 * is passed to SetActionPlayers above at the beginning of
 * the phase.
 *
 * The phase ends if next() returns undefined.
 */

var TurnOrder = {
  /**
   * DEFAULT
   *
   * The default round-robin turn order.
   */
  DEFAULT: {
    first: function first(G, ctx) {
      return ctx.playOrderPos;
    },
    next: function next(G, ctx) {
      return (ctx.playOrderPos + 1) % ctx.playOrder.length;
    }
  },

  /**
   * ONCE
   *
   * Another round-robin turn order, but goes around just once.
   * The phase ends after all players have played.
   */
  ONCE: {
    first: function first() {
      return 0;
    },
    next: function next(G, ctx) {
      if (ctx.playOrderPos < ctx.playOrder.length - 1) {
        return ctx.playOrderPos + 1;
      }
    }
  },

  /**
   * ANY
   *
   * The turn stays with one player, but any player can play (in any order)
   * until the phase ends.
   */
  ANY: {
    first: function first(G, ctx) {
      return ctx.playOrderPos;
    },
    next: function next(G, ctx) {
      return ctx.playOrderPos;
    },
    actionPlayers: {
      all: true
    }
  },

  /**
   * ANY_ONCE
   *
   * The turn stays with one player, but any player can play (once, and in any order).
   * This is typically used in a phase where you want to elicit a response
   * from every player in the game.
   */
  ANY_ONCE: {
    first: function first(G, ctx) {
      return ctx.playOrderPos;
    },
    next: function next(G, ctx) {
      return ctx.playOrderPos;
    },
    actionPlayers: {
      all: true,
      once: true
    },
    endPhaseOnceDone: true
  },

  /**
   * OTHERS
   *
   * The turn stays with one player, and every *other* player can play (in any order)
   * until the phase ends.
   */
  OTHERS: {
    first: function first(G, ctx) {
      return ctx.playOrderPos;
    },
    next: function next(G, ctx) {
      return ctx.playOrderPos;
    },
    actionPlayers: {
      others: true
    }
  },

  /**
   * OTHERS_ONCE
   *
   * The turn stays with one player, and every *other* player can play (once, and in any order).
   * This is typically used in a phase where you want to elicit a response
   * from every *other* player in the game.
   */
  OTHERS_ONCE: {
    first: function first(G, ctx) {
      return ctx.playOrderPos;
    },
    next: function next(G, ctx) {
      return ctx.playOrderPos;
    },
    actionPlayers: {
      others: true,
      once: true
    },
    endPhaseOnceDone: true
  },

  /**
   * CUSTOM
   *
   * Identical to DEFAULT, but also sets playOrder at the
   * beginning of the phase.
   *
   * @param {Array} playOrder - The play order.
   */
  CUSTOM: function CUSTOM(_playOrder) {
    return {
      playOrder: function playOrder() {
        return _playOrder;
      },
      first: function first() {
        return 0;
      },
      next: function next(G, ctx) {
        return (ctx.playOrderPos + 1) % ctx.playOrder.length;
      }
    };
  },

  /**
   * CUSTOM_FROM
   *
   * Identical to DEFAULT, but also sets playOrder at the
   * beginning of the phase to a value specified by a field
   * in G.
   *
   * @param {string} playOrderField - Field in G.
   */
  CUSTOM_FROM: function CUSTOM_FROM(playOrderField) {
    return {
      playOrder: function playOrder(G) {
        return G[playOrderField];
      },
      first: function first() {
        return 0;
      },
      next: function next(G, ctx) {
        return (ctx.playOrderPos + 1) % ctx.playOrder.length;
      }
    };
  },

  /**
   * SKIP
   *
   * Round-robin, but skips over any players that have passed.
   * Meant to be used with Pass above.
   */
  SKIP: {
    first: function first(G, ctx) {
      return ctx.playOrderPos;
    },
    next: function next(G, ctx) {
      if (G.allPassed) return;
      var playOrderPos = ctx.playOrderPos;

      for (var i = 0; i < ctx.playOrder.length; i++) {
        playOrderPos = (playOrderPos + 1) % ctx.playOrder.length;

        if (!G.passOrder.includes(ctx.playOrder[playOrderPos] + '')) {
          return playOrderPos;
        }
      }
    }
  }
};

/**
 * Helper to create a reducer that manages ctx (with the
 * ability to also update G).
 *
 * You probably want to use FlowWithPhases below, but you might
 * need to use this directly if you are creating a very customized
 * game flow that it cannot handle.
 *
 * @param {...object} ctx - Function with the signature
 *                          numPlayers => ctx
 *                          that determines the initial value of ctx.
 * @param {...object} events - Object containing functions
 *                             named after events that this
 *                             reducer will handle. Each function
 *                             has the following signature:
 *                             ({G, ctx}) => {G, ctx}
 * @param {...object} enabledEvents - Map of eventName -> bool indicating
 *                                    which events are callable from the client
 *                                    or from within moves.
 * @param {...object} processMove - A function that's called whenever a move is made.
 *                                  (state, action, dispatch) => state.
 * @param {...object} optimisticUpdate - (G, ctx, move) => boolean
 *                                       Control whether a move should
 *                                       be executed optimistically on
 *                                       the client while waiting for
 *                                       the result of execution from
 *                                       the server.
 * @param {...object} canMakeMove - (G, ctx, moveName) => boolean
 *                                  Predicate to determine whether a
 *                                  particular move is allowed at
 *                                  this time.
 *
 * @param {...object} canUndoMove - (G, ctx, moveName) => boolean
 *                                  Predicate to determine whether a
 *                                  particular move is undoable at this
 *                                  time.
 *
 * @param {Array} redactedMoves - List of moves to be redacted
 *                                from the log.
 */

function Flow(_ref) {
  var ctx$$1 = _ref.ctx,
      events = _ref.events,
      enabledEvents = _ref.enabledEvents,
      init = _ref.init,
      _processMove = _ref.processMove,
      optimisticUpdate = _ref.optimisticUpdate,
      _canMakeMove = _ref.canMakeMove,
      canUndoMove = _ref.canUndoMove,
      redactedMoves = _ref.redactedMoves;
  if (!ctx$$1) ctx$$1 = function ctx$$1() {
    return {};
  };
  if (!events) events = {};
  if (!enabledEvents) enabledEvents = {};
  if (!init) init = function init(state) {
    return state;
  };
  if (!_processMove) _processMove = function processMove(state) {
    return state;
  };
  if (!_canMakeMove) _canMakeMove = function canMakeMove() {
    return true;
  };
  if (!canUndoMove) canUndoMove = function canUndoMove() {
    return true;
  };

  if (optimisticUpdate === undefined) {
    optimisticUpdate = function optimisticUpdate() {
      return true;
    };
  }

  var dispatch = function dispatch(state, action) {
    var payload = action.payload;

    if (events.hasOwnProperty(payload.type)) {
      var context = {
        playerID: payload.playerID,
        dispatch: dispatch
      };
      var logEntry = {
        action: action,
        _stateID: state._stateID,
        turn: state.ctx.turn,
        phase: state.ctx.phase
      };
      var deltalog = [].concat(_toConsumableArray(state.deltalog || []), [logEntry]);
      state = _objectSpread({}, state, {
        deltalog: deltalog
      });
      var args = [state].concat(payload.args);
      return events[payload.type].apply(context, args);
    }

    return state;
  };

  return {
    ctx: ctx$$1,
    init: init,
    canUndoMove: canUndoMove,
    redactedMoves: redactedMoves,
    eventNames: Object.getOwnPropertyNames(events),
    enabledEventNames: Object.getOwnPropertyNames(enabledEvents),
    processMove: function processMove(state, action) {
      return _processMove(state, action, dispatch);
    },
    processGameEvent: function processGameEvent(state, action) {
      return dispatch(state, action, dispatch);
    },
    optimisticUpdate: optimisticUpdate,
    canPlayerCallEvent: function canPlayerCallEvent(G$$1, ctx$$1, playerID) {
      return ctx$$1.currentPlayer == playerID && ctx$$1.actionPlayers.includes(playerID);
    },
    canPlayerMakeMove: function canPlayerMakeMove(G$$1, ctx$$1, playerID) {
      var actionPlayers = ctx$$1.actionPlayers || [];
      return actionPlayers.includes(playerID);
    },
    canMakeMove: function canMakeMove(G$$1, ctx$$1, moveName) {
      // Disallow moves once the game is over.
      if (ctx$$1.gameover !== undefined) return false; // User-provided move validation.

      return _canMakeMove(G$$1, ctx$$1, moveName);
    }
  };
}
/**
 * FlowWithPhases
 *
 * A very customizable game flow that introduces phases to the
 * game. Each phase can be configured with:
 * - A custom turn order.
 * - Automatically executed setup / cleanup code.
 * - Custom phase end conditions.
 * - A move whitelist that disallows other moves during the phase.
 *
 * @param {...object} movesPerTurn - End the turn automatically after a certain number
 *                                   of moves (default: undefined, i.e. the turn does
 *                                   not automatically end after a certain number of moves).
 *
 * @param {...object} endTurnIf - The turn automatically ends if this
 *                                returns a truthy value
 *                                (checked after each move).
 *                                If the return value is { next: playerID },
 *                                that player is the next player
 *                                (instead of following the turn order).
 *                                (G, ctx) => boolean|object
 *
 * @param {...object} endGameIf - The game automatically ends if this function
 *                                returns anything (checked after each move).
 *                                The return value is available at ctx.gameover.
 *                                (G, ctx) => {}
 *
 * @param {...object} onTurnBegin - Any code to run when a turn begins.
 *                                 (G, ctx) => G
 *
 * @param {...object} onTurnEnd - Any code to run when a turn ends.
 *                                (G, ctx) => G
 *
 * @param {...object} onMove - Any code to run at the end of a move.
 *                             (G, ctx, { type: 'moveName', args: [] }) => G
 *
 * @param {...object} turnOrder - Customize the turn order (see turn-order.js).
 *
 * @param {...object} endTurn - Set to false to disable the `endTurn` event.
 *
 * @param {...object} endPhase - Set to false to disable the `endPhase` event.
 *
 * @param {...object} endGame - Set to true to enable the `endGame` event.
 *
 * @param {...object} setActionPlayers - Set to true to enable the `setActionPlayers` event.
 *
 * @param {...object} allowedMoves - List of moves that are allowed.
 *                                   This can be either a list of
 *                                   move names or a function with the
 *                                   signature (G, ctx) => [].
 *                                   (default: null, i.e. all moves are allowed).
 *
 * @param {...object} undoableMoves - List of moves that are undoable,
 *                                   (default: null, i.e. all moves are undoable).
 *
 * @param {Array} redactedMoves - List of moves to be redacted
 *                                from the log.
 *
 * @param {object} game - The game object.
 *
 * @param {...object} optimisticUpdate - (G, ctx, move) => boolean
 *                                       Control whether a move should
 *                                       be executed optimistically on
 *                                       the client while waiting for
 *                                       the result of execution from
 *                                       the server.
 *
 * @param {...object} phases - A map of phases in the game.
 *
 * Each phase is described by an object whose key is the phase name.
 *
 * All the properties below override their global equivalents
 * above whenever they are defined (i.e. the global setting
 * is used if a phase-specific setting is absent).
 *
 * {
 *   // Any setup code to run before the phase begins.
 *   onPhaseBegin: (G, ctx) => G,
 *
 *   // Any cleanup code to run after the phase ends.
 *   onPhaseEnd: (G, ctx) => G,
 *
 *   // The phase ends if this function returns a truthy value.
 *   // If the return value is of the form { next: 'phase name' }
 *   // then that will be chosen as the next phase.
 *   endPhaseIf: (G, ctx) => boolean|object,
 *
 *   Phase-specific options that override their global equivalents:
 *
 *   // A phase-specific endTurnIf.
 *   endTurnIf: (G, ctx) => boolean|object,
 *
 *   // A phase-specific endGameIf.
 *   endGameIf: (G, ctx) => {},
 *
 *   // A phase-specific onTurnBegin
 *   onTurnBegin: (G, ctx) => G,
 *
 *   // A phase-specific onTurnEnd.
 *   onTurnEnd: (G, ctx) => G,
 *
 *   // A phase-specific onMove.
 *   onMove - (G, ctx) => G,
 *
 *   // A phase-specific turnOrder.
 *   turnOrder: TurnOrder.DEFAULT,
 *
 *   // A phase-specific movesPerTurn.
 *   movesPerTurn: integer,
 *
 *   // List of moves or a function that returns a list of moves
 *   // that are allowed in this phase.
 *   allowedMoves: (G, ctx) => ['moveA', ...],
 *
 *   // List of moves that are undoable.
 *   undoableMoves: ['moveA', ...],
 * }
 */

function FlowWithPhases(_ref2) {
  var phases = _ref2.phases,
      startingPhase = _ref2.startingPhase,
      movesPerTurn = _ref2.movesPerTurn,
      endTurnIf = _ref2.endTurnIf,
      endGameIf = _ref2.endGameIf,
      onTurnBegin = _ref2.onTurnBegin,
      onTurnEnd = _ref2.onTurnEnd,
      onMove = _ref2.onMove,
      turnOrder = _ref2.turnOrder,
      endTurn = _ref2.endTurn,
      endPhase = _ref2.endPhase,
      endGame = _ref2.endGame,
      setActionPlayers = _ref2.setActionPlayers,
      undoableMoves = _ref2.undoableMoves,
      allowedMoves = _ref2.allowedMoves,
      redactedMoves = _ref2.redactedMoves,
      _optimisticUpdate = _ref2.optimisticUpdate,
      game = _ref2.game;

  // Attach defaults.
  if (endPhase === undefined && phases) {
    endPhase = true;
  }

  if (endTurn === undefined) {
    endTurn = true;
  }

  if (endGame === undefined) {
    endGame = false;
  }

  if (setActionPlayers === undefined) {
    setActionPlayers = false;
  }

  if (_optimisticUpdate === undefined) {
    _optimisticUpdate = function optimisticUpdate() {
      return true;
    };
  }

  if (game === undefined) {
    game = {
      plugins: []
    };
  }

  if (!phases) phases = {};
  if (!startingPhase) startingPhase = 'default';
  if (!endTurnIf) endTurnIf = function endTurnIf() {
    return false;
  };
  if (!endGameIf) endGameIf = function endGameIf() {
    return undefined;
  };
  if (!onTurnBegin) onTurnBegin = function onTurnBegin(G$$1) {
    return G$$1;
  };
  if (!onTurnEnd) onTurnEnd = function onTurnEnd(G$$1) {
    return G$$1;
  };
  if (!onMove) onMove = function onMove(G$$1) {
    return G$$1;
  };
  if (!turnOrder) turnOrder = TurnOrder.DEFAULT;
  if (allowedMoves === undefined) allowedMoves = null;
  if (undoableMoves === undefined) undoableMoves = null;
  var phaseMap = phases;

  phaseMap['default'] = {};

  for (var phase in phaseMap) {
    var conf = phaseMap[phase];

    if (conf.endPhaseIf === undefined) {
      conf.endPhaseIf = function () {
        return undefined;
      };
    }

    if (conf.onPhaseBegin === undefined) {
      conf.onPhaseBegin = function (G$$1) {
        return G$$1;
      };
    }

    conf.onPhaseBegin = FnWrap(conf.onPhaseBegin, game);

    if (conf.onPhaseEnd === undefined) {
      conf.onPhaseEnd = function (G$$1) {
        return G$$1;
      };
    }

    conf.onPhaseEnd = FnWrap(conf.onPhaseEnd, game);

    if (conf.movesPerTurn === undefined) {
      conf.movesPerTurn = movesPerTurn;
    }

    if (conf.endTurnIf === undefined) {
      conf.endTurnIf = endTurnIf;
    }

    if (conf.endGameIf === undefined) {
      conf.endGameIf = endGameIf;
    }

    if (conf.onTurnBegin === undefined) {
      conf.onTurnBegin = onTurnBegin;
    }

    conf.onTurnBegin = FnWrap(conf.onTurnBegin, game);

    if (conf.onTurnEnd === undefined) {
      conf.onTurnEnd = onTurnEnd;
    }

    conf.onTurnEnd = FnWrap(conf.onTurnEnd, game);

    if (conf.onMove === undefined) {
      conf.onMove = onMove;
    }

    conf.onMove = FnWrap(conf.onMove, game);

    if (conf.turnOrder === undefined) {
      conf.turnOrder = turnOrder;
    }

    if (conf.undoableMoves === undefined) {
      conf.undoableMoves = undoableMoves;
    }

    if (conf.allowedMoves === undefined) {
      conf.allowedMoves = allowedMoves;
    }

    if (typeof conf.allowedMoves !== 'function') {
      (function () {
        var t = conf.allowedMoves;

        conf.allowedMoves = function () {
          return t;
        };
      })();
    }
  }

  var shouldEndPhase = function shouldEndPhase(_ref3) {
    var G$$1 = _ref3.G,
        ctx$$1 = _ref3.ctx;
    var conf = phaseMap[ctx$$1.phase];
    return conf.endPhaseIf(G$$1, ctx$$1);
  };

  var shouldEndTurn = function shouldEndTurn(_ref4) {
    var G$$1 = _ref4.G,
        ctx$$1 = _ref4.ctx;
    var conf = phaseMap[ctx$$1.phase];
    var currentPlayerMoves = ctx$$1.stats.turn.numMoves[ctx$$1.currentPlayer] || 0;

    if (conf.movesPerTurn && currentPlayerMoves >= conf.movesPerTurn) {
      return true;
    }

    return conf.endTurnIf(G$$1, ctx$$1);
  }; // Helper to perform start-of-phase initialization.


  var startPhase = function startPhase(state, config) {
    var G$$1 = config.onPhaseBegin(state.G, state.ctx);
    var ctx$$1 = InitTurnOrderState(G$$1, state.ctx, config.turnOrder); // Allow plugins to modify G and ctx at the beginning of a phase.

    G$$1 = G.onPhaseBegin(G$$1, ctx$$1, game);
    ctx$$1 = ctx.onPhaseBegin(ctx$$1, game); // Reset stats.

    ctx$$1.stats = _objectSpread({}, ctx$$1.stats, {
      phase: _objectSpread({}, ctx$$1.stats.phase, {
        numMoves: {},
        allPlayed: false
      })
    });
    var allowedMoves = config.allowedMoves(G$$1, ctx$$1);
    return _objectSpread({}, state, {
      G: G$$1,
      ctx: _objectSpread({}, ctx$$1, {
        allowedMoves: allowedMoves
      })
    });
  };

  var startTurn = function startTurn(state, config) {
    var G$$1 = config.onTurnBegin(state.G, state.ctx);
    var plainCtx = ContextEnhancer.detachAllFromContext(state.ctx);
    var _undo = [{
      G: G$$1,
      ctx: plainCtx
    }];

    var ctx$$1 = _objectSpread({}, state.ctx);

    ctx$$1.allowedMoves = config.allowedMoves(G$$1, ctx$$1); // Reset stats.

    ctx$$1.stats = _objectSpread({}, ctx$$1.stats, {
      turn: _objectSpread({}, ctx$$1.stats.turn, {
        numMoves: {},
        allPlayed: false
      })
    });
    return _objectSpread({}, state, {
      G: G$$1,
      ctx: ctx$$1,
      _undo: _undo,
      _redo: []
    });
  };

  var startGame = function startGame(state) {
    if (!(state.ctx.phase in phaseMap)) {
      error('invalid startingPhase: ' + state.ctx.phase);
      return state;
    }

    var conf = phaseMap[state.ctx.phase];
    state = startPhase(state, conf);
    state = startTurn(state, conf);
    return state;
  };
  /**
   * endPhase (game event)
   *
   * Ends the current phase.
   * Also runs any phase cleanup code and setup code for the
   * next phase (if any).
   *
   * The next phase is chosen in a round-robin fashion, with the
   * option to override that by passing nextPhase.
   *
   * If this call results in a cycle, the phase is reset to
   * the default phase.
   */


  function endPhaseEvent(state, arg, visitedPhases) {
    var G$$1 = state.G;
    var ctx$$1 = state.ctx; // Run any cleanup code for the phase that is about to end.

    var conf = phaseMap[ctx$$1.phase];
    G$$1 = conf.onPhaseEnd(G$$1, ctx$$1);
    var gameover = conf.endGameIf(G$$1, ctx$$1);

    if (gameover !== undefined) {
      return _objectSpread({}, state, {
        G: G$$1,
        ctx: _objectSpread({}, ctx$$1, {
          gameover: gameover
        })
      });
    }

    var prevPhase = ctx$$1.phase; // Update the phase.

    if (arg && arg !== true) {
      if (arg.next in phaseMap) {
        ctx$$1 = _objectSpread({}, ctx$$1, {
          phase: arg.next,
          prevPhase: prevPhase
        });
      }
    } else if (conf.next !== undefined) {
      ctx$$1 = _objectSpread({}, ctx$$1, {
        phase: conf.next,
        prevPhase: prevPhase
      });
    } else {
      ctx$$1 = _objectSpread({}, ctx$$1, {
        phase: ctx$$1.prevPhase,
        prevPhase: prevPhase
      });
    } // Run any setup code for the new phase.


    state = startPhase(_objectSpread({}, state, {
      G: G$$1,
      ctx: ctx$$1
    }), phaseMap[ctx$$1.phase]);
    var origTurn = state.ctx.turn; // End the new phase automatically if necessary.
    // In order to avoid infinite loops, the `default`
    // phase is chosen as the next phase the moment we
    // end up at a phase that we've already visited when
    // we processed the endPhase event that kicked of this
    // chain of events.

    if (!visitedPhases) visitedPhases = {};

    if (ctx$$1.phase in visitedPhases) {
      state = this.dispatch(state, automaticGameEvent('endPhase', [{
        next: 'default'
      }, visitedPhases], this.playerID));
    } else {
      visitedPhases[ctx$$1.phase] = true;
      var end = shouldEndPhase(state);

      if (end) {
        state = this.dispatch(state, automaticGameEvent('endPhase', [end, visitedPhases], this.playerID));
      }
    } // End turn if endTurnIf returns something
    // (and the turn has not already been ended by a nested endPhase call).


    var endTurn = shouldEndTurn(state);

    if (endTurn && state.ctx.turn == origTurn) {
      state = this.dispatch(state, automaticGameEvent('endTurn', [endTurn], this.playerID));
    }

    return state;
  }
  /**
   * endTurn (game event)
   *
   * Ends the current turn.
   * Passes the turn to the next turn in a round-robin fashion.
   */


  function endTurnEvent(state, arg) {
    var _state = state,
        G$$1 = _state.G,
        ctx$$1 = _state.ctx;
    var conf = phaseMap[ctx$$1.phase]; // Prevent ending the turn if movesPerTurn haven't been made.

    var currentPlayerMoves = ctx$$1.stats.turn.numMoves[ctx$$1.currentPlayer] || 0;

    if (conf.movesPerTurn && currentPlayerMoves < conf.movesPerTurn) {
      return state;
    } // Run turn-end triggers.


    G$$1 = conf.onTurnEnd(G$$1, ctx$$1); // Update gameover.

    var gameover = conf.endGameIf(G$$1, ctx$$1);

    if (gameover !== undefined) {
      return _objectSpread({}, state, {
        G: G$$1,
        ctx: _objectSpread({}, ctx$$1, {
          gameover: gameover
        })
      });
    }

    var endPhase = false; // Update turn order state.

    {
      var _UpdateTurnOrderState = UpdateTurnOrderState(G$$1, ctx$$1, conf.turnOrder, arg),
          a = _UpdateTurnOrderState.endPhase,
          b = _UpdateTurnOrderState.ctx;

      endPhase = a;
      ctx$$1 = b;
    } // Update turn.

    var turn = ctx$$1.turn + 1; // Update state.

    ctx$$1 = _objectSpread({}, ctx$$1, {
      turn: turn
    });
    state = _objectSpread({}, state, {
      G: G$$1,
      ctx: ctx$$1
    }); // End phase if condition is met.

    var endPhaseArg = shouldEndPhase(state);

    if (endPhaseArg) {
      endPhase = true;
    }

    if (endPhase) {
      return this.dispatch(state, automaticGameEvent('endPhase', [endPhaseArg], this.playerID));
    }

    return startTurn(state, conf);
  }

  function endGameEvent(state, arg) {
    if (arg === undefined) {
      arg = true;
    }

    return _objectSpread({}, state, {
      ctx: _objectSpread({}, state.ctx, {
        gameover: arg
      })
    });
  }

  function updateStats(state, key, playerID) {
    var moves = (state.ctx.stats[key].numMoves[playerID] || 0) + 1;

    var numMoves = _objectSpread({}, state.ctx.stats[key].numMoves, _defineProperty({}, playerID, moves));

    var t = _objectSpread({}, state.ctx.stats[key], {
      numMoves: numMoves
    });

    if (Object.keys(numMoves).length == state.ctx.numPlayers) {
      t.allPlayed = true;
    }

    var stats = _objectSpread({}, state.ctx.stats, _defineProperty({}, key, t));

    var ctx$$1 = _objectSpread({}, state.ctx, {
      stats: stats
    });

    return _objectSpread({}, state, {
      ctx: ctx$$1
    });
  }

  function processMove(state, action, dispatch) {
    var conf = phaseMap[state.ctx.phase];
    state = updateStats(state, 'turn', action.playerID);
    state = updateStats(state, 'phase', action.playerID); // Update actionPlayers if _actionPlayersOnce is set.

    var actionPlayers = state.ctx.actionPlayers;
    var actionPlayersOnceDone = false;

    if (state.ctx._actionPlayersOnce) {
      var playerID = action.playerID;
      actionPlayers = actionPlayers.filter(function (id) {
        return id !== playerID;
      });

      if (actionPlayers.length == 0 && conf.turnOrder.endPhaseOnceDone) {
        actionPlayersOnceDone = true;
      }
    }

    state = _objectSpread({}, state, {
      ctx: _objectSpread({}, state.ctx, {
        actionPlayers: actionPlayers
      })
    });
    var G$$1 = conf.onMove(state.G, state.ctx, action);
    state = _objectSpread({}, state, {
      G: G$$1
    });
    var origTurn = state.ctx.turn;
    var gameover = conf.endGameIf(state.G, state.ctx); // End the phase automatically if endPhaseIf is true or if endGameIf returns.

    var endPhase = shouldEndPhase(state) || actionPlayersOnceDone;

    if (endPhase || gameover !== undefined) {
      state = dispatch(state, automaticGameEvent('endPhase', [endPhase], action.playerID)); // Update to the new phase configuration

      conf = phaseMap[state.ctx.phase];
    } // End the turn automatically if endTurnIf is true or if endGameIf returns.
    // (but not if endPhase above already ends the turn).


    var endTurn = shouldEndTurn(state);

    if (state.ctx.turn == origTurn && (endTurn || gameover !== undefined)) {
      state = dispatch(state, automaticGameEvent('endTurn', [endTurn], action.playerID));
    } // End the game automatically if endGameIf returns.


    if (gameover !== undefined) {
      return _objectSpread({}, state, {
        ctx: _objectSpread({}, state.ctx, {
          gameover: gameover
        })
      });
    } // Update allowedMoves.


    var allowedMoves = conf.allowedMoves(state.G, state.ctx);
    state = _objectSpread({}, state, {
      ctx: _objectSpread({}, state.ctx, {
        allowedMoves: allowedMoves
      })
    }); // Update undo / redo state.

    if (!endTurn) {
      var undo$$1 = state._undo || [];
      var moveType = action.type;
      var plainCtx = ContextEnhancer.detachAllFromContext(state.ctx);
      state = _objectSpread({}, state, {
        _undo: [].concat(_toConsumableArray(undo$$1), [{
          G: state.G,
          ctx: plainCtx,
          moveType: moveType
        }]),
        _redo: []
      });
    }

    return state;
  }

  var canMakeMove = function canMakeMove(G$$1, ctx$$1, moveName) {
    var conf = phaseMap[ctx$$1.phase];
    var moves = conf.allowedMoves(G$$1, ctx$$1);
    if (!moves) return true;
    return moves.includes(moveName);
  };

  var canUndoMove = function canUndoMove(G$$1, ctx$$1, moveName) {
    var conf = phaseMap[ctx$$1.phase];
    if (!conf.undoableMoves) return true;
    return conf.undoableMoves.includes(moveName);
  };

  var events = {
    endTurn: endTurnEvent,
    endPhase: endPhaseEvent,
    endGame: endGameEvent,
    setActionPlayers: SetActionPlayersEvent
  };
  var enabledEvents = {};

  if (endTurn) {
    enabledEvents['endTurn'] = true;
  }

  if (endPhase) {
    enabledEvents['endPhase'] = true;
  }

  if (endGame) {
    enabledEvents['endGame'] = true;
  }

  if (setActionPlayers) {
    enabledEvents['setActionPlayers'] = true;
  }

  return Flow({
    ctx: function ctx$$1(numPlayers) {
      return {
        numPlayers: numPlayers,
        turn: 0,
        currentPlayer: '0',
        actionPlayers: ['0'],
        currentPlayerMoves: 0,
        playOrder: _toConsumableArray(new Array(numPlayers)).map(function (d, i) {
          return i + '';
        }),
        playOrderPos: 0,
        stats: {
          turn: {
            numMoves: {}
          },
          phase: {
            numMoves: {}
          }
        },
        allPlayed: false,
        phase: startingPhase,
        prevPhase: 'default'
      };
    },
    init: function init(state) {
      return startGame(state);
    },
    optimisticUpdate: function optimisticUpdate(G$$1, ctx$$1, action) {
      // Some random code was executed.
      if (ctx$$1._random !== undefined && ctx$$1._random.prngstate !== undefined) {
        return false;
      }

      return _optimisticUpdate(G$$1, ctx$$1, action);
    },
    events: events,
    enabledEvents: enabledEvents,
    processMove: processMove,
    canMakeMove: canMakeMove,
    canUndoMove: canUndoMove,
    redactedMoves: redactedMoves
  });
}

/**
 * Game
 *
 * Helper to generate the game move reducer. The returned
 * reducer has the following signature:
 *
 * (G, action, ctx) => {}
 *
 * You can roll your own if you like, or use any Redux
 * addon to generate such a reducer.
 *
 * The convention used in this framework is to
 * have action.type contain the name of the move, and
 * action.args contain any additional arguments as an
 * Array.
 *
 * Game({
 *   name: 'tic-tac-toe',
 *
 *   setup: (numPlayers) => {
 *     const G = {...};
 *     return G;
 *   },
 *
 *   plugins: [plugin1, plugin2, ...],
 *
 *   moves: {
 *     'moveWithoutArgs': (G, ctx) => {
 *       return Object.assign({}, G, ...);
 *     },
 *     'moveWithArgs': (G, ctx, arg0, arg1) => {
 *       return Object.assign({}, G, ...);
 *     }
 *   },
 *
 *   playerView: (G, ctx, playerID) => { ... },
 *
 *   flow: {
 *     endGameIf: (G, ctx) => { ... },
 *     endTurnIf: (G, ctx) => { ... },
 *
 *     phases: {
 *       A: { onPhaseBegin: (G, ctx) => G, onPhaseEnd: (G, ctx) => G },
 *       B: { onPhaseBegin: (G, ctx) => G, onPhaseEnd: (G, ctx) => G },
 *       ...
 *     }
 *   },
 * })
 *
 * @param {...object} setup - Function that returns the initial state of G.
 *
 * @param {...object} moves - A dictionary of move functions.
 *
 * @param {...object} playerView - A function that returns a
 *                                 derivative of G tailored for
 *                                 the specified player.
 *
 * @param {...object} flow - Customize the flow of the game (see flow.js).
 *                           Must contain the return value of Flow().
 *                           If it contains any other object, it is presumed to be a
 *                           configuration object for FlowWithPhases().
 *
 * @param {...object} seed - Seed for the PRNG.
 *
 * @param {Array} plugins - List of plugins. Each plugin is an object like the following:
 *                          {
 *                            // Optional: Wraps a move / trigger function and returns
 *                            // the wrapped function. The wrapper can do anything
 *                            // it wants, but will typically be used to customize G.
 *                            fnWrap: (fn) => {
 *                              return (G, ctx, ...args) => {
 *                                G = preprocess(G);
 *                                G = fn(G, ctx, ...args);
 *                                G = postprocess(G);
 *                                return G;
 *                              };
 *                            },
 *
 *                            // Optional: Called during setup. Can be used to
 *                            // augment G with additional state during setup.
 *                            setup: (G, ctx) => G,
 *                          }
 */

function Game(game) {
  if (game.name === undefined) game.name = 'default';
  if (game.setup === undefined) game.setup = function () {
    return {};
  };
  if (game.moves === undefined) game.moves = {};
  if (game.playerView === undefined) game.playerView = function (G$$1) {
    return G$$1;
  };
  if (game.plugins === undefined) game.plugins = [];

  if (!game.flow || game.flow.processGameEvent === undefined) {
    game.flow = FlowWithPhases(_objectSpread({
      game: game
    }, game.flow));
  }

  return _objectSpread({}, game, {
    moveNames: Object.getOwnPropertyNames(game.moves),
    processMove: function processMove(G$$1, action, ctx$$1) {
      if (game.moves.hasOwnProperty(action.type)) {
        var ctxWithPlayerID = _objectSpread({}, ctx$$1, {
          playerID: action.playerID
        });

        var args = [G$$1, ctxWithPlayerID].concat(action.args);
        var fn = FnWrap(game.moves[action.type], game);
        return fn.apply(void 0, _toConsumableArray(args));
      }

      return G$$1;
    }
  });
}

/**
 * Grid
 *
 * Component that will show children on a cartesian regular grid.
 *
 * Props:
 *   rows       - Number of rows (height) of the grid.
 *   cols       - Number of columns (width) of the grid.
 *   style      - CSS style of the Grid HTML element.
 *   colorMap   - A map from 'x,y' => color.
 *   onClick    - (x, y) => {}
 *                Called when a square is clicked.
 *   onMouseOver    - (x, y) => {}
 *                Called when a square is mouse over.
 *   onMouseOut    - (x, y) => {}
 *                Called when a square is mouse out.
 *
 * Usage:
 *
 * <Grid rows={8} cols={8}>
 *   <Token x={1} y={2}/>
 * </Grid>
 */

var Grid =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Grid, _React$Component);

  function Grid() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Grid);

    for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
      _args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Grid)).call.apply(_getPrototypeOf2, [this].concat(_args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_svgRef", React.createRef());

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onClick", function (args) {
      if (_this.props.onClick) {
        _this.props.onClick(args);
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onMouseOver", function (args) {
      if (_this.props.onMouseOver) {
        _this.props.onMouseOver(args);
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onMouseOut", function (args) {
      if (_this.props.onMouseOut) {
        _this.props.onMouseOut(args);
      }
    });

    return _this;
  }

  _createClass(Grid, [{
    key: "_getCellColor",
    value: function _getCellColor(x, y) {
      var key = "".concat(x, ",").concat(y);
      var color = 'white';

      if (key in this.props.colorMap) {
        color = this.props.colorMap[key];
      }

      return color;
    }
  }, {
    key: "_getGrid",
    value: function _getGrid() {
      if (!this.props.outline) {
        return null;
      }

      var squares = [];

      for (var x = 0; x < this.props.cols; x++) {
        for (var y = 0; y < this.props.rows; y++) {
          squares.push(React.createElement(Square, {
            key: this.props.cols * y + x,
            style: {
              fill: this._getCellColor(x, y)
            },
            x: x,
            y: y,
            size: this.props.cellSize,
            onClick: this.onClick,
            onMouseOver: this.onMouseOver,
            onMouseOut: this.onMouseOut
          }));
        }
      }

      return squares;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var tokens = React.Children.map(this.props.children, function (child) {
        return React.cloneElement(child, {
          template: Square,
          // Overwrites Token's onClick, onMouseOver, onMouseOut
          onClick: _this2.onClick,
          onMouseOver: _this2.onMouseOver,
          onMouseOut: _this2.onMouseOut,
          svgRef: _this2._svgRef
        });
      });
      return React.createElement("svg", {
        ref: this._svgRef,
        viewBox: '0 0 ' + this.props.cols + ' ' + this.props.rows,
        style: this.props.style
      }, React.createElement("g", null, this._getGrid()), tokens);
    }
  }]);

  return Grid;
}(React.Component);
/**
 * Square
 *
 * Component that renders a square inside a Grid.
 *
 * Props:
 *   x       - X coordinate on grid coordinates.
 *   y       - Y coordinate on grid coordinates.
 *   size    - Square size.
 *   style   - Custom styling.
 *   onClick - Invoked when a Square is clicked.
 *   onMouseOver - Invoked when a Square is mouse over.
 *   onMouseOut - Invoked when a Square is mouse out.
 *   eventListeners - Array of objects with name and callback
 *   for DOM events.
 *
 * Not meant to be used by the end user directly (use Token).
 * Also not exposed in the NPM.
 */

_defineProperty(Grid, "propTypes", {
  rows: PropTypes.number.isRequired,
  cols: PropTypes.number.isRequired,
  outline: PropTypes.bool,
  style: PropTypes.object,
  colorMap: PropTypes.object,
  cellSize: PropTypes.number,
  onClick: PropTypes.func,
  onMouseOver: PropTypes.func,
  onMouseOut: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element])
});

_defineProperty(Grid, "defaultProps", {
  colorMap: {},
  outline: true,
  cellSize: 1
});

var Square =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(Square, _React$Component2);

  function Square() {
    var _getPrototypeOf3;

    var _this3;

    _classCallCheck(this, Square);

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this3 = _possibleConstructorReturn(this, (_getPrototypeOf3 = _getPrototypeOf(Square)).call.apply(_getPrototypeOf3, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this3)), "_gRef", React.createRef());

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this3)), "onClick", function (e) {
      _this3.props.onClick(_this3.getCoords(), e);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this3)), "onMouseOver", function (e) {
      _this3.props.onMouseOver(_this3.getCoords(), e);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this3)), "onMouseOut", function (e) {
      _this3.props.onMouseOut(_this3.getCoords(), e);
    });

    return _this3;
  }

  _createClass(Square, [{
    key: "getCoords",
    value: function getCoords() {
      return {
        x: this.props.x,
        y: this.props.y
      };
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var element = this._gRef.current;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.props.eventListeners[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var listener = _step.value;
          element.addEventListener(listener.name, listener.callback);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var element = this._gRef.current;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.props.eventListeners[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var listener = _step2.value;
          element.removeEventListener(listener.name, listener.callback);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var tx = this.props.x * this.props.size;
      var ty = this.props.y * this.props.size; // If no child, render a square.

      var children = React.createElement("rect", {
        style: this.props.style,
        width: this.props.size,
        height: this.props.size,
        x: 0,
        y: 0
      }); // If a child is passed, render child.

      if (this.props.children) {
        children = this.props.children;
      }

      return React.createElement("g", {
        ref: this._gRef,
        onClick: this.onClick,
        onMouseOver: this.onMouseOver,
        onMouseOut: this.onMouseOut,
        transform: "translate(".concat(tx, ", ").concat(ty, ")")
      }, children);
    }
  }]);

  return Square;
}(React.Component);

_defineProperty(Square, "propTypes", {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  size: PropTypes.number,
  style: PropTypes.any,
  onClick: PropTypes.func,
  onMouseOver: PropTypes.func,
  onMouseOut: PropTypes.func,
  eventListeners: PropTypes.array,
  children: PropTypes.element
});

_defineProperty(Square, "defaultProps", {
  size: 1,
  x: 0,
  y: 0,
  style: {
    fill: '#fff'
  },
  eventListeners: []
});

/**
 * Token
 *
 * Component that represents a board game piece (or token).
 * Can be used by itself or with one of the grid systems
 * provided (Grid or HexGrid).
 *
 * A token renders as a square inside a Grid and a
 * hexagon inside a HexGrid. Additionally, you can pass
 * it a child if you want any other custom rendering.
 *
 * Props:
 *   x       - X coordinate on grid / hex grid.
 *   y       - Y coordinate on grid / hex grid.
 *   z       - Z coordinate on hex grid.
 *   animate - Changes in position are animated if true.
 *   animationDuration - Length of animation.
 *   onClick - Called when the token is clicked.
 *   onMouseOver - Called when the token is mouse over.
 *   onMouseOut - Called when the token is mouse out.
 *   draggable - Whether a Token is draggable or not.
 *   shouldDrag - Whether a draggable token should start drag.
 *   onDrag - Called when a token was dragged (moved).
 *            Parameter contain { x, y, originalX, originalY }.
 *   onDrop - Called when the token was dropped after dragging.
 *            Parameter contain { x, y, originalX, originalY }.
 *
 * Usage:
 *
 * <Grid rows={8} cols={8}>
 *   <Token x={1} y={2}/>
 * </Grid>
 *
 * <HexGrid>
 *   <Token x={1} y={2} z={-3}/>
 * </HexGrid>
 *
 * <Grid rows={8} cols={8}>
 *   <Token x={1} y={2}>
 *     <Knight color="white"/>
 *   </Token>
 * </Grid>
 */

var Token =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Token, _React$Component);

  function Token(props) {
    var _this;

    _classCallCheck(this, Token);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Token).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_startDrag", function (e) {
      if (_this.props.draggable && _this.props.shouldDrag(_this.getCoords())) {
        e.preventDefault(); // Required for Safari/iOs.

        e = e.touches ? e.touches[0] : e;

        _this.setState(_objectSpread({}, _this.state, {
          dragged: {
            x: e.pageX,
            y: e.pageY
          }
        }));

        _this._addOrRemoveDragEventListeners(true);
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_drag", function (e) {
      if (_this.state.dragged) {
        e.preventDefault(); // Required for Safari/iOs.

        e = e.touches ? e.touches[0] : e;

        var ctm = _this.props.svgRef.current.getScreenCTM().inverse();

        var deltaPageX = e.pageX - _this.state.dragged.x;
        var deltaPageY = e.pageY - _this.state.dragged.y;
        var deltaSvgX = ctm.a * deltaPageX + ctm.b * deltaPageY;
        var deltaSvgY = ctm.c * deltaPageX + ctm.d * deltaPageY;
        var x = _this.state.x + deltaSvgX;
        var y = _this.state.y + deltaSvgY;

        if (_this.props.onDrag) {
          _this.props.onDrag({
            x: x,
            y: y,
            originalX: _this.props.x,
            originalY: _this.props.y
          });
        }

        _this.setState(_objectSpread({}, _this.state, {
          x: x,
          y: y,
          dragged: {
            x: e.pageX,
            y: e.pageY
          }
        }));
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_endDrag", function (e) {
      if (_this.state.dragged) {
        e.preventDefault(); // Whether this is a drop or a click depends if the mouse moved after drag.
        // Android will issue very small drag events, so we need a distance.

        var dist = Math.sqrt(Math.pow(_this.state.x - _this.props.x, 2) + Math.pow(_this.state.y - _this.props.y, 2));

        if (dist > 0.2) {
          _this.props.onDrop({
            x: _this.state.x,
            y: _this.state.y,
            originalX: _this.props.x,
            originalY: _this.props.y
          });
        } else {
          _this.props.onClick({
            x: _this.state.x,
            y: _this.state.y
          });
        }

        _this.setState(_objectSpread({}, _this.state, {
          x: _this.props.x,
          y: _this.props.y,
          dragged: null
        }));

        _this._addOrRemoveDragEventListeners(false);
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_onClick", function (param) {
      // Ignore onClick if the element is draggable, because desktops will
      // send both onClick and touch events, leading to duplication.
      // Whether this will be a click or a drop will be defined in _endDrag.
      if (!(_this.props.draggable && _this.props.shouldDrag(_this.getCoords()))) {
        _this.props.onClick(param);
      }
    });

    _this.state = _objectSpread({}, _this.getCoords(), {
      dragged: null,
      usingTouch: false
    });
    return _this;
  }

  _createClass(Token, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.state.dragged) {
        this._addOrRemoveDragEventListeners(false);
      }
    }
    /**
     * If there is a change in props, saves old x/y,
     * and current time. Starts animation.
     * @param {Object} nextProps Next props.
     */
    // eslint-disable-next-line react/no-deprecated

  }, {
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      var oldCoord = this.getCoords();
      var newCoord = this.getCoords(nextProps); // Debounce.

      if (oldCoord.x == newCoord.x && oldCoord.y == newCoord.y) {
        return;
      }

      this.setState(_objectSpread({}, this.state, {
        originTime: Date.now(),
        originX: this.state.x,
        originY: this.state.y,
        originZ: this.state.z
      }));
      requestAnimationFrame(this._animate(Date.now()));
    }
    /**
     * Add or remove event listeners.
     * @param {boolean} shouldAdd If it should add (or remove) listeners.
     */

  }, {
    key: "_addOrRemoveDragEventListeners",
    value: function _addOrRemoveDragEventListeners(shouldAdd) {
      var svgEl = this.props.svgRef.current;
      if (!svgEl) return;
      var addOrRemoveEventListener = svgEl.addEventListener;

      if (!shouldAdd) {
        addOrRemoveEventListener = svgEl.removeEventListener;
      }

      addOrRemoveEventListener('touchmove', this._drag, {
        passive: false
      });
      addOrRemoveEventListener('mousemove', this._drag, {
        passive: false
      });
      addOrRemoveEventListener('mouseup', this._endDrag, {
        passive: false
      });
      addOrRemoveEventListener('mouseleave', this._endDrag, {
        passive: false
      });
      addOrRemoveEventListener('touchcancel', this._endDrag, {
        passive: false
      });
      addOrRemoveEventListener('touchleave', this._endDrag, {
        passive: false
      });
      addOrRemoveEventListener('touchend', this._endDrag, {
        passive: false
      });
    }
    /**
     * Recursively animates x and y.
     * @param {number} now Unix timestamp when this was called.
     */

  }, {
    key: "_animate",
    value: function _animate(now) {
      var _this2 = this;

      return function () {
        var elapsed = now - _this2.state.originTime;

        var svgCoord = _this2.getCoords();

        if (elapsed < _this2.props.animationDuration && _this2.props.animate) {
          var percentage = _this2._easeInOutCubic(elapsed, 0, 1, _this2.props.animationDuration);

          _this2.setState(_objectSpread({}, _this2.state, {
            x: (svgCoord.x - _this2.state.originX) * percentage + _this2.state.originX,
            y: (svgCoord.y - _this2.state.originY) * percentage + _this2.state.originY,
            z: (svgCoord.z - _this2.state.originZ) * percentage + _this2.state.originZ
          }));

          requestAnimationFrame(_this2._animate(Date.now()));
        } else {
          _this2.setState(_objectSpread({}, _this2.state, {
            x: svgCoord.x,
            y: svgCoord.y,
            z: svgCoord.z
          }));
        }
      }.bind(this);
    }
    /**
     * Gets SVG x/y/z coordinates.
     * @param {Object} props Props object to get coordinates from.
     * @return {Object} Object with x, y and z parameters.
     */

  }, {
    key: "getCoords",
    value: function getCoords() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
      return {
        x: props.x,
        y: props.y,
        z: props.z
      };
    }
    /**
     * Returns animation easing value. See http://easings.net/#easeInOutCubic.
     * @param {number} t Current time.
     * @param {number} b Beginning value.
     * @param {number} c Final value.
     * @param {number} d Duration.
     */

  }, {
    key: "_easeInOutCubic",
    value: function _easeInOutCubic(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t * t + b;
      t -= 2;
      return c / 2 * (t * t * t + 2) + b;
    }
    /**
     * Gets event listeners needed for drag and drop.
     */

  }, {
    key: "_eventListeners",
    value: function _eventListeners() {
      return [{
        name: 'mousedown',
        callback: this._startDrag
      }, {
        name: 'touchstart',
        callback: this._startDrag
      }];
    }
  }, {
    key: "render",
    value: function render() {
      var Component = this.props.template;
      return React.createElement(Component, {
        x: this.state.x,
        y: this.state.y,
        z: this.state.z,
        style: this.props.style,
        onClick: this._onClick,
        onMouseOver: this.props.onMouseOver,
        onMouseOut: this.props.onMouseOut,
        eventListeners: this._eventListeners()
      }, this.props.children);
    }
  }]);

  return Token;
}(React.Component);

_defineProperty(Token, "propTypes", {
  x: PropTypes.number,
  y: PropTypes.number,
  z: PropTypes.number,
  template: PropTypes.any,
  style: PropTypes.any,
  animate: PropTypes.bool,
  onClick: PropTypes.func,
  onMouseOver: PropTypes.func,
  onMouseOut: PropTypes.func,
  children: PropTypes.element,
  animationDuration: PropTypes.number,
  draggable: PropTypes.bool,
  shouldDrag: PropTypes.func,
  onDrag: PropTypes.func,
  onDrop: PropTypes.func,
  svgRef: PropTypes.object
});

_defineProperty(Token, "defaultProps", {
  animationDuration: 750,
  template: Square
});

/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
var UIContext = React.createContext();

/**
 * Token
 *
 * Component that represents a board game piece (or token).
 * Can be used by itself or with one of the grid systems
 * provided (Grid or HexGrid).
 *
 * A token renders as a 3D Mesh. IF no mesh prop is passed.
 * It will render a white box on the grid.
 *
 * Props:
 *   x       - X coordinate on grid / hex grid.
 *   y       - Y coordinate on grid / hex grid.
 *   z       - Z coordinate on hex grid.
 *   onClick - Called when the token is clicked.
 *   onMouseOver - Called when the token is mouse over.
 *   onMouseOut - Called when the token is mouse out.
 *
 * Usage:
 *
 * <Grid rows={8} cols={8}>
 *   <Token x={1} y={2}/>
 * </Grid>
 *
 * <Grid rows={8} cols={8}>
 *   <Token x={1} y={2} size={0.5}/>
 * </Grid>
 *
 * <HexGrid>
 *   <Token x={1} y={2} z={-3}/>
 * </HexGrid>
 *
 * <Grid rows={8} cols={8}>
 *   <Token x={1} y={2} mesh={THREE.js 3D-Object}/>
 * </Grid>
 *
 */

var Token$1 = function Token(props) {
  return React.createElement(UIContext.Consumer, null, function (context) {
    return React.createElement(TokenImpl, _extends({}, props, {
      context: context
    }));
  });
};

var TokenImpl =
/*#__PURE__*/
function (_React$Component) {
  _inherits(TokenImpl, _React$Component);

  function TokenImpl(props) {
    var _this;

    _classCallCheck(this, TokenImpl);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TokenImpl).call(this));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_attachMesh", function (mesh) {
      var size = _this.size;
      var meshSize = new Vector3();
      var meshCenter = new Vector3();
      var bbox = new Box3().setFromObject(mesh);
      bbox.getSize(meshSize);
      bbox.getCenter(meshCenter); // determine the scale factor

      var scale = meshSize.z < meshSize.x ? meshSize.x : meshSize.z;
      scale = size / scale;
      mesh.scale.set(scale, scale, scale); // set the mesh to the ground

      if (_this.props.boardSize && _this.props.lift && _this.props.padding) {
        mesh.position.x = _this.props.x * (_this.props.boardSize + _this.props.padding);
        mesh.position.z = _this.props.y * (_this.props.boardSize + _this.props.padding);
        mesh.position.y = -bbox.min.y + _this.props.lift;
      } else {
        mesh.position.x = _this.props.x;
        mesh.position.z = _this.props.y;
        mesh.position.y = -bbox.min.y;
      }

      _this.parent.add(mesh); // register the event


      var onEvent = function onEvent(e) {
        if (e.type == 'click') {
          _this.props.onClick({
            x: _this.props.x,
            y: _this.props.y
          });
        } else if (e.type == 'mouseOver') {
          _this.props.onMouseOver({
            x: _this.props.x,
            y: _this.props.y
          });
        } else if (e.type == 'mouseOut') {
          _this.props.onMouseOut({
            x: _this.props.x,
            y: _this.props.y
          });
        }
      };

      _this.props.context.regCall(mesh, onEvent);
    });

    if (!props.size) {
      _this.size = props.boardSize;
    } else {
      _this.size = props.size;
    }

    if (props.parent) {
      _this.parent = props.parent;
    } else {
      _this.parent = props.context;
    }

    return _this;
  }

  _createClass(TokenImpl, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.parent.remove(this.prevMesh);
    }
  }, {
    key: "render",
    value: function render() {
      var mesh = this.props.mesh;
      if (this.prevMesh && this.prevMesh === mesh) return null;

      if (!mesh) {
        mesh = new Mesh(new BoxBufferGeometry(1, 1 * 0.3, 1), new MeshLambertMaterial({
          color: '#eeeeee'
        }));

        this._attachMesh(mesh);
      } else if (mesh.isObject3D) {
        this._attachMesh(mesh);
      } else {
        console.error('Your input to tokens should be an three js 3d object');
      }

      this.parent.remove(this.prevMesh);
      this.prevMesh = mesh;
      return null;
    }
  }]);

  return TokenImpl;
}(React.Component);

_defineProperty(TokenImpl, "propTypes", {
  x: PropTypes.number,
  y: PropTypes.number,
  z: PropTypes.number,
  mesh: PropTypes.any,
  padding: PropTypes.number,
  size: PropTypes.number,
  lift: PropTypes.number,
  boardSize: PropTypes.number,
  parent: PropTypes.instanceOf(Object3D),
  context: PropTypes.object,
  animate: PropTypes.bool,
  onClick: PropTypes.func,
  onMouseOver: PropTypes.func,
  onMouseOut: PropTypes.func,
  children: PropTypes.element,
  animationDuration: PropTypes.number
});

_defineProperty(TokenImpl, "defaultProps", {
  animationDuration: 750,
  size: 1,
  padding: 0.1,
  lift: 0.1
});

/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
var Token$2 = function Token$$1(props) {
  return props.three ? React.createElement(Token$1, props, props.children) : React.createElement(Token, props, props.children);
};
Token$2.propTypes = {
  three: PropTypes.bool,
  children: PropTypes.any
};

/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

var Logo = function Logo(_ref) {
  var width = _ref.width,
      height = _ref.height;
  return React.createElement("svg", {
    width: width || 128,
    height: height || 128,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 128 128"
  }, React.createElement("path", {
    d: "M64,120.37,15.27,92.28V35.91L64,7.82l48.73,28.09V92.28Z",
    fill: "#373748"
  }), React.createElement("path", {
    fill: "#000",
    d: "M64,124,12,94V34L64,4l52,30V94ZM18.33,90.37,64,116.74l45.67-26.37V37.63L64,11.26,18.33,37.63Z"
  }), React.createElement("path", {
    d: "M81.77,43.17c5.92,0,10.51,1.72,13.57,5.16,3.25,3.44,4.77,8.41,4.77,14.71q0,10.32-5.15,16.06c-3.44,3.82-8.22,5.73-14.53,5.73-5.92,0-10.51-1.72-13.56-5.35-3.25-3.63-4.78-8.6-4.78-15.29s1.72-12,5.16-15.67S75.46,43.17,81.77,43.17Zm-.57,5.16c-4.4,0-7.45,1.15-9.56,3.63s-3,6.31-3,11.66c0,5.73,1,9.74,3,12.42,2.11,2.48,5.16,3.82,9.56,3.82s7.64-1.34,9.74-3.82,3.25-6.5,3.25-11.85c0-5.54-1.15-9.55-3.25-12C88.65,49.48,85.59,48.33,81.2,48.33Z",
    fill: "#fff"
  }), React.createElement("path", {
    d: "M39.35,71.45l.19,12.8H33.43L33.62,72l-.19-28.48h6.11l-.19,27.9Z",
    fill: "#fff"
  }));
};

Logo.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string
};

var css$2 = "/*\n * Copyright 2017 The boardgame.io Authors\n *\n * Use of this source code is governed by a MIT-style\n * license that can be found in the LICENSE file or at\n * https://opensource.org/licenses/MIT.\n */\n\n.bgio-card {\n  display: flex;\n  user-select: none;\n  font-family: monospace;\n  font-weight: bold;\n  font-size: 18px;\n  color: #ababab;\n  text-align: center;\n  flex-direction: column;\n  justify-content: center;\n  cursor: pointer;\n  background: #fff;\n  border-radius: 6px;\n  border: 1px solid #cdcdcd;\n  width: 100px;\n  height: 140px;\n  overflow: hidden;\n  transition: transform 0.1s;\n}\n\n.bgio-card.placeholder {\n  cursor: default;\n  opacity: 0;\n  pointer-events: none;\n}\n\n.bgio-card.accept {\n  transform: rotate(10deg);\n  box-shadow: 5px 5px 5px #ddd;\n}\n\n.bgio-card.reject {\n}\n\n.bgio-card__front,\n.bgio-card__back {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  overflow: hidden;\n}\n\n.bgio-card__back {\n  background-image: url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8 16c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm0-2c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6zm33.414-6l5.95-5.95L45.95.636 40 6.586 34.05.636 32.636 2.05 38.586 8l-5.95 5.95 1.414 1.414L40 9.414l5.95 5.95 1.414-1.414L41.414 8zM40 48c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm0-2c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6zM9.414 40l5.95-5.95-1.414-1.414L8 38.586l-5.95-5.95L.636 34.05 6.586 40l-5.95 5.95 1.414 1.414L8 41.414l5.95 5.95 1.414-1.414L9.414 40z' fill='%23ababab' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E\");\n  background-position: 2px 2px;\n  outline: 8px solid #eee;\n  outline-offset: -20px;\n}\n";
styleInject(css$2);

function GetDraggable(props, classNames, cardStyle, onClick) {
  /* eslint-disable-next-line react/display-name */
  return function (_ref) {
    var isActive = _ref.isActive,
        events = _ref.events;
    return React.createElement("div", _extends({
      className: classNames.join(' '),
      style: _objectSpread({}, props.style, cardStyle, {
        opacity: isActive ? 0 : 1,
        pointerEvents: isActive ? 'none' : 'all'
      }),
      onClick: onClick
    }, events), props.isFaceUp ? props.front : props.back);
  };
}
function GetDragComponent(props, classNames, ref, isOverAcceptedCallback) {
  /* eslint-disable-next-line react/display-name, react/prop-types */
  return function (_ref2) {
    var x = _ref2.x,
        y = _ref2.y,
        isOverAccepted = _ref2.isOverAccepted,
        currentlyHoveredDroppableId = _ref2.currentlyHoveredDroppableId;

    var classes = _toConsumableArray(classNames);
    /* eslint-disable-next-line react/prop-types */


    var content = props.back;
    isOverAcceptedCallback(isOverAccepted);
    /* eslint-disable-next-line react/prop-types */

    if (props.isFaceUp) {
      /* eslint-disable-next-line react/prop-types */
      content = props.front;
    }

    if (currentlyHoveredDroppableId !== null) {
      if (isOverAccepted) {
        classes.push('accept');
      } else {
        classes.push('reject');
      }
    }

    return React.createElement("div", {
      className: classes.join(' '),
      ref: ref,
      style: {
        cursor: 'pointer',
        borderWidth: 2,
        pointerEvents: 'none',
        position: 'fixed',
        zIndex: 2000000000,
        boxShadow: '5px 5px 5px #eee',
        left: x - 50,
        top: y - 70
      }
    }, content);
  };
}
/* eslint-enable */

var CardImpl =
/*#__PURE__*/
function (_React$Component) {
  _inherits(CardImpl, _React$Component);

  function CardImpl(props) {
    var _this;

    _classCallCheck(this, CardImpl);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CardImpl).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onClick", function () {
      _this.props.onClick(_this.props.data);
    });

    _this.id = props.context.genID();
    _this.dragComponentRef = React.createRef();
    _this.isOverAccepted = false;
    return _this;
  }

  _createClass(CardImpl, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var classNames = ['bgio-card'];

      if (this.props.className) {
        classNames.push(this.props.className);
      }

      var cardStyle = {};

      if (this.props.inDeck) {
        cardStyle = {
          position: 'absolute',
          zIndex: this.props.deckPosition
        };
      }

      return React.createElement("div", null, React.createElement(Draggable, {
        id: this.id,
        type: this.props.dragZone,
        data: this.props.data
      }, GetDraggable(this.props, classNames, cardStyle, this.onClick)), React.createElement(DragComponent, {
        for: this.id
      }, GetDragComponent(this.props, classNames, this.dragComponentRef, function (o) {
        return _this2.isOverAccepted = o;
      })));
    }
  }]);

  return CardImpl;
}(React.Component);

_defineProperty(CardImpl, "propTypes", {
  isFaceUp: PropTypes.bool,
  front: PropTypes.node,
  back: PropTypes.node,
  className: PropTypes.string,
  dragZone: PropTypes.string,
  style: PropTypes.any,
  onClick: PropTypes.func,
  context: PropTypes.any.isRequired,
  inDeck: PropTypes.bool,
  data: PropTypes.any,
  deckPosition: PropTypes.number
});

_defineProperty(CardImpl, "defaultProps", {
  onClick: function onClick() {},
  isFaceUp: false,
  dragZone: 'bgio-card',
  front: React.createElement("div", {
    className: "bgio-card__front"
  }, "Card"),
  back: React.createElement("div", {
    className: "bgio-card__back"
  }, React.createElement(Logo, {
    width: "48"
  }))
});

var Card = function Card(props) {
  return React.createElement(UIContext.Consumer, null, function (context) {
    return React.createElement(CardImpl, _extends({}, props, {
      context: context
    }));
  });
};

var CardImpl$1 =
/*#__PURE__*/
function (_React$Component) {
  _inherits(CardImpl, _React$Component);

  function CardImpl(props) {
    var _this;

    _classCallCheck(this, CardImpl);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CardImpl).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onEvent", function (e) {
      if (!_this.props.responsive) {
        return;
      }

      if (e.type == 'dragStart') {
        _this.obj.castShadow = true;
        new TWEEN.Tween(_this.obj.position).to({
          y: _this.originalY + 0.5
        }, 100).easing(TWEEN.Easing.Quadratic.Out).start();
      }

      if (e.type == 'dragEnd') {
        new TWEEN.Tween(_this.obj.position).to({
          y: _this.originalY
        }, 100).onComplete(function () {
          return _this.obj.castShadow = false;
        }).start();
      }

      if (e.type == 'drag') {
        _this.obj.position.x = e.point.x;
        _this.obj.position.z = e.point.z;
      }
    });

    _this.originalY = props.thickness / 2 - 0.0001;
    var geometry = new BoxGeometry(props.width, props.thickness, props.height);
    var opts = {
      color: 0x777777
    };

    if (props.image) {
      opts = {
        map: new TextureLoader().load(props.image)
      };
    }

    var material = new MeshLambertMaterial(opts);
    _this.obj = new Mesh(geometry, material);
    _this.obj.receiveShadow = true;
    _this.obj.position.y = _this.originalY;
    _this.obj.userData.draggable = props.draggable;
    _this.obj.userData.responsive = props.responsive;
    return _this;
  }

  _createClass(CardImpl, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.context.add(this.obj, this.onEvent);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.props.context.remove(this.obj);
    }
  }, {
    key: "render",
    value: function render() {
      this.obj.position.x = this.props.x + this.props.splayX;
      this.obj.position.z = this.props.z + this.props.splayZ;
      this.obj.position.y = this.originalY + this.props.splayY;
      return null;
    }
  }]);

  return CardImpl;
}(React.Component);

_defineProperty(CardImpl$1, "propTypes", {
  context: PropTypes.any.isRequired,
  image: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  thickness: PropTypes.number,
  responsive: PropTypes.bool,
  draggable: PropTypes.bool,
  x: PropTypes.number,
  z: PropTypes.number,
  splayX: PropTypes.number,
  splayY: PropTypes.number,
  splayZ: PropTypes.number
});

_defineProperty(CardImpl$1, "defaultProps", {
  responsive: true,
  draggable: true,
  splayX: 0,
  splayY: 0,
  splayZ: 0,
  x: 0,
  z: 0,
  width: 1,
  height: 1.5,
  thickness: 0.01
});

var Card$1 = function Card(props) {
  return React.createElement(UIContext.Consumer, null, function (context) {
    return React.createElement(CardImpl$1, _extends({}, props, {
      context: context
    }));
  });
};

var Card$2 = function Card$$1(props) {
  return React.createElement(UIContext.Consumer, null, function (context) {
    return context.three ? React.createElement(Card$1, _extends({}, props, {
      context: context
    })) : React.createElement(Card, _extends({}, props, {
      context: context
    }));
  });
};
Card$2.propTypes = {
  children: PropTypes.any
};

/**
 * Grid
 *
 * Component that will show children on a cartesian regular grid.
 *
 * Props:
 *   rows       - Number of rows (height) of the grid.
 *   cols       - Number of columns (width) of the grid.
 *   cellSize   - Size of a square.
 *   thichness  - Thichness of a square.
 *   padding    - Padding between squares.
 *   colorMap   - A map from 'x,y' => color.
 *   onClick    - (x, y) => {}
 *                Called when a square is clicked.
 *   onMouseOver    - (x, y) => {}
 *                Called when a square is mouse over.
 *   onMouseOut    - (x, y) => {}
 *                Called when a square is mouse out.
 *
 * Usage:
 *
 * <Grid rows={8} cols={8}>
 *   <Token x={1} y={2}/>
 * </Grid>
 */

var Grid$1 = function Grid(props) {
  return React.createElement(UIContext.Consumer, null, function (context) {
    return React.createElement(GridImpl, _extends({}, props, {
      context: context
    }));
  });
};

var GridImpl =
/*#__PURE__*/
function (_React$Component) {
  _inherits(GridImpl, _React$Component);

  function GridImpl(props) {
    var _this;

    _classCallCheck(this, GridImpl);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(GridImpl).call(this, props));
    _this.boardGroup = new Group();
    _this.tokenGroup = new Group();

    _this.boardGroup.add(_this.tokenGroup); // translate the board to center on (0,0,0)


    _this.boardGroup.translateX(-(_this.props.padding + _this.props.cellSize) * (_this.props.cols - 1) / 2);

    _this.boardGroup.translateZ(-(_this.props.padding + _this.props.cellSize) * (_this.props.rows - 1) / 2);

    return _this;
  }

  _createClass(GridImpl, [{
    key: "_getCellColor",
    value: function _getCellColor(x, y) {
      var key = "".concat(x, ",").concat(y);
      var color = '#777777';

      if (key in this.props.colorMap) {
        color = this.props.colorMap[key];
      }

      return color;
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.context.remove(this.boardGroup);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      this.context = this.props.context;
      this.context.add(this.boardGroup); // when rerendering, render a new squareGroup

      this.boardGroup.remove(this.squareGroup);
      this.squareGroup = new Group();
      this.boardGroup.add(this.squareGroup); // add square base

      var _loop = function _loop(x) {
        var _loop2 = function _loop2(y) {
          var squareProps = {
            x: x,
            y: y,
            size: _this2.props.cellSize,
            color: _this2._getCellColor(x, y),
            padding: _this2.props.padding,
            thickness: _this2.props.thickness
          };
          var square = new Square$1(squareProps);

          _this2.squareGroup.add(square);

          var onEvent = function onEvent(e) {
            if (e.type == 'click') {
              if (_this2.props.onClick) _this2.props.onClick({
                x: x,
                y: y
              });
            } else if (e.type == 'mouseOver') {
              if (_this2.props.onMouseOver) _this2.props.onMouseOver({
                x: x,
                y: y
              });
            } else if (e.type == 'mouseOut') {
              if (_this2.props.onMouseOut) _this2.props.onMouseOut({
                x: x,
                y: y
              });
            }
          };

          _this2.context.regCall(square, onEvent);
        };

        for (var y = 0; y < _this2.props.rows; y++) {
          _loop2(y);
        }
      };

      for (var x = 0; x < this.props.cols; x++) {
        _loop(x);
      } // set tokens


      var tokens = React.Children.map(this.props.children, function (child) {
        return React.cloneElement(child, {
          three: true,
          boardSize: _this2.props.cellSize,
          parent: _this2.tokenGroup,
          padding: _this2.props.padding,
          lift: _this2.props.thickness
        });
      });

      if (tokens) {
        return tokens;
      }

      return null;
    }
  }]);

  return GridImpl;
}(React.Component);
/**
 * Square
 *
 * Component that renders a square inside a Grid.
 *
 * Props
 *   x          - X coordinate on grid coordinates.
 *   y          - Y coordinate on grid coordinates.
 *   size       - Square size.
 *   color      - Color of the square
 *   thichness  - Thichness of a square.
 *   padding    - Padding between squares.
 *
 * Not meant to be used by the end user directly (use Token).
 * Also not exposed in the NPM.
 */


_defineProperty(GridImpl, "propTypes", {
  rows: PropTypes.number.isRequired,
  cols: PropTypes.number.isRequired,
  cellSize: PropTypes.number,
  thickness: PropTypes.number,
  padding: PropTypes.number,
  colorMap: PropTypes.object,
  onClick: PropTypes.func,
  onMouseOver: PropTypes.func,
  onMouseOut: PropTypes.func,
  context: PropTypes.any,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element])
});

_defineProperty(GridImpl, "defaultProps", {
  colorMap: {},
  cellSize: 1,
  padding: 0.1,
  thickness: 0.1
});

var Square$1 =
/*#__PURE__*/
function (_THREE$Mesh) {
  _inherits(Square, _THREE$Mesh);

  function Square(props) {
    var _this3;

    _classCallCheck(this, Square);

    _this3 = _possibleConstructorReturn(this, _getPrototypeOf(Square).call(this));
    _this3.userData = _objectSpread({
      responsive: true,
      draggable: false
    }, props);
    props = _this3.userData;
    _this3.geometry = new BoxBufferGeometry(props.size, props.thickness, props.size);
    _this3.material = new MeshLambertMaterial({
      color: props.color
    });
    _this3.receiveShadow = true;

    _this3.translateX(_this3.userData.x * (props.size + props.padding));

    _this3.translateZ(_this3.userData.y * (props.size + props.padding));

    _this3.translateY(_this3.userData.thickness / 2);

    return _this3;
  }

  return Square;
}(Mesh);

/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
var Grid$2 = function Grid$$1(props) {
  return props.three ? React.createElement(Grid$1, props, props.children) : React.createElement(Grid, props, props.children);
};
Grid$2.propTypes = {
  three: PropTypes.bool,
  children: PropTypes.any
};
var Square$2 = function Square$$1(props) {
  return props.three ? React.createElement(Square$1, props, props.children) : React.createElement(Square, props, props.children);
};
Square$2.propTypes = {
  three: PropTypes.bool,
  children: PropTypes.any
};

/**
 * HexGrid
 *
 * Component to display a hex grid.
 * Reference: https://www.redblobgames.com/grids/hexagons/.
 *
 * We use cube co-ordinates (see reference).
 *
 * Props:
 *   levels     - The number of levels around the central hex.
 *   style      - CSS style of the HTML element.
 *
 * Usage:
 *
 * <HexGrid levels={5}>
 *   <Token x={0} y={0} z={0}/>
 * </HexGrid>
 */

var HexGrid =
/*#__PURE__*/
function (_React$Component) {
  _inherits(HexGrid, _React$Component);

  function HexGrid() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, HexGrid);

    for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
      _args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(HexGrid)).call.apply(_getPrototypeOf2, [this].concat(_args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_svgRef", React.createRef());

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onClick", function (args) {
      if (_this.props.onClick) {
        _this.props.onClick(args);
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onMouseOver", function (args) {
      if (_this.props.onMouseOver) {
        _this.props.onMouseOver(args);
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onMouseOut", function (args) {
      if (_this.props.onMouseOut) {
        _this.props.onMouseOut(args);
      }
    });

    return _this;
  }

  _createClass(HexGrid, [{
    key: "_getCellColor",
    value: function _getCellColor(x, y, z) {
      var key = "".concat(x, ",").concat(y, ",").concat(z);
      var color = 'white';

      if (key in this.props.colorMap) {
        color = this.props.colorMap[key];
      }

      return color;
    }
  }, {
    key: "_getGrid",
    value: function _getGrid() {
      if (!this.props.outline) {
        return null;
      }

      var hexes = [];
      var r = this.props.levels;

      for (var x = -r; x <= r; x++) {
        for (var y = -r; y <= r; y++) {
          var z = -x - y;
          if (Math.abs(z) > r) continue;
          hexes.push(React.createElement(Hex, {
            key: "".concat(x, ":").concat(y, ":").concat(z),
            style: {
              fill: this._getCellColor(x, y, z)
            },
            x: x,
            y: y,
            z: z,
            size: this.props.cellSize,
            onClick: this.onClick,
            onMouseOver: this.onMouseOver,
            onMouseOut: this.onMouseOut
          }));
        }
      }

      return hexes;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var tokens = React.Children.map(this.props.children, function (child) {
        return React.cloneElement(child, {
          template: Hex,
          onClick: _this2.onClick,
          onMouseOver: _this2.onMouseOver,
          onMouseOut: _this2.onMouseOut,
          svgRef: _this2._svgRef
        });
      });
      var t = this.props.cellSize * this.props.levels * 2;
      return React.createElement("svg", {
        ref: this._svgRef,
        viewBox: -t + ' ' + -t + ' ' + 2 * t + ' ' + 2 * t,
        style: this.props.style
      }, React.createElement("g", null, this._getGrid()), tokens);
    }
  }]);

  return HexGrid;
}(React.Component);
/**
 * Hex (flat-topped).
 *
 * Component that renders a hexagon inside a HexGrid.
 *
 * Props:
 *   x       - X coordinate (cube coordinates).
 *   y       - Y coordinate (cube coordinates).
 *   z       - Z coordinate (cube coordinates).
 *   size    - Hex size.
 *   style   - Custom styling.
 *   onClick - Invoked when a Hex is clicked.
 *   onMouseOver - Invoked when a Hex is mouse over.
 *   onMouseOut - Invoked when a Hex is mouse out.
 *   eventListeners - Array of objects with name and callback
 *   for DOM events.
 *
 * Not meant to be used by the end user directly (use Token).
 * Also not exposed in the NPM.
 */

_defineProperty(HexGrid, "propTypes", {
  levels: PropTypes.number.isRequired,
  outline: PropTypes.bool,
  style: PropTypes.object,
  colorMap: PropTypes.object,
  cellSize: PropTypes.number,
  onClick: PropTypes.func,
  onMouseOver: PropTypes.func,
  onMouseOut: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element])
});

_defineProperty(HexGrid, "defaultProps", {
  levels: 5,
  colorMap: {},
  outline: true,
  cellSize: 1
});

var Hex =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(Hex, _React$Component2);

  function Hex(props) {
    var _this3;

    _classCallCheck(this, Hex);

    _this3 = _possibleConstructorReturn(this, _getPrototypeOf(Hex).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this3)), "_gRef", React.createRef());

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this3)), "onClick", function (e) {
      _this3.props.onClick(_this3.getCoords(), e);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this3)), "onMouseOver", function (e) {
      _this3.props.onMouseOver(_this3.getCoords(), e);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this3)), "onMouseOut", function (e) {
      _this3.props.onMouseOut(_this3.getCoords(), e);
    });

    return _this3;
  }

  _createClass(Hex, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var element = this._gRef.current;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.props.eventListeners[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var listener = _step.value;
          element.addEventListener(listener.name, listener.callback);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var element = this._gRef.current;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.props.eventListeners[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var listener = _step2.value;
          element.removeEventListener(listener.name, listener.callback);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  }, {
    key: "getCoords",
    value: function getCoords() {
      return {
        x: this.props.x,
        y: this.props.y,
        z: this.props.z
      };
    }
  }, {
    key: "render",
    value: function render() {
      var tx = this.center.x;
      var ty = this.center.y; // If no child, render a hex.

      var children = React.createElement("polygon", {
        style: this.props.style,
        points: this.points,
        stroke: "#aaa",
        strokeWidth: 0.01
      }); // If a child is passed, render child.

      if (this.props.children) {
        children = this.props.children;
      }

      return React.createElement("g", {
        ref: this._gRef,
        onClick: this.onClick,
        onMouseOver: this.onMouseOver,
        onMouseOut: this.onMouseOut,
        transform: "translate(".concat(tx, ", ").concat(ty, ")")
      }, children);
    }
  }, {
    key: "width",
    get: function get() {
      return this.props.size * 2;
    }
  }, {
    key: "height",
    get: function get() {
      return (Math.sqrt(3) / 2 * this.width).toFixed(3);
    }
    /**
     * Get the co-ordinates of the hex center.
     */

  }, {
    key: "center",
    get: function get() {
      var q = this.props.x;
      var r = this.props.z;
      var x = this.props.size * 3 * q / 2.0;
      var y = this.props.size * Math.sqrt(3) * (r + q / 2.0);
      return {
        x: x,
        y: y
      };
    }
    /**
     * Get the points of the vertices.
     */

  }, {
    key: "points",
    get: function get() {
      //   b____c
      //   /    \
      // a/      \d
      //  \      /
      //   \____/
      //   f    e
      var s = this.props.size;
      var h = this.height;
      var xa = -s;
      var xb = -s / 2.0;
      var xc = +s / 2.0;
      var xd = +s;
      var xe = xc;
      var xf = xb;
      var ya = 0.0;
      var yb = h / 2.0;
      var yc = yb;
      var yd = ya;
      var ye = -h / 2.0;
      var yf = ye;
      var flatTop = ["".concat(xa, ",").concat(ya), "".concat(xb, ",").concat(yb), "".concat(xc, ",").concat(yc), "".concat(xd, ",").concat(yd), "".concat(xe, ",").concat(ye), "".concat(xf, ",").concat(yf)];
      return flatTop.join(' ');
    }
  }]);

  return Hex;
}(React.Component);

_defineProperty(Hex, "propTypes", {
  x: PropTypes.number,
  y: PropTypes.number,
  z: PropTypes.number,
  size: PropTypes.number,
  style: PropTypes.any,
  onClick: PropTypes.func,
  onMouseOver: PropTypes.func,
  onMouseOut: PropTypes.func,
  eventListeners: PropTypes.array,
  children: PropTypes.element
});

_defineProperty(Hex, "defaultProps", {
  size: 1,
  x: 0,
  y: 0,
  z: 0,
  style: {
    fill: '#fff'
  },
  eventListeners: []
});

var HexGrid$1 =
/*#__PURE__*/
function (_React$Component) {
  _inherits(HexGrid, _React$Component);

  function HexGrid() {
    _classCallCheck(this, HexGrid);

    return _possibleConstructorReturn(this, _getPrototypeOf(HexGrid).apply(this, arguments));
  }

  _createClass(HexGrid, [{
    key: "render",
    value: function render() {
      return null;
    }
  }]);

  return HexGrid;
}(React.Component); // Not yet implemented.

var Hex$1 =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(Hex, _React$Component2);

  function Hex() {
    _classCallCheck(this, Hex);

    return _possibleConstructorReturn(this, _getPrototypeOf(Hex).apply(this, arguments));
  }

  _createClass(Hex, [{
    key: "render",
    value: function render() {
      return null;
    }
  }]);

  return Hex;
}(React.Component);

/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
var Hex$2 = function Hex$$1(props) {
  return props.three ? React.createElement(Hex$1, props, props.children) : React.createElement(Hex, props, props.children);
};
Hex$2.propTypes = {
  three: PropTypes.bool,
  children: PropTypes.any
};
var HexGrid$2 = function HexGrid$$1(props) {
  return props.three ? React.createElement(HexGrid$1, props, props.children) : React.createElement(HexGrid, props, props.children);
};
HexGrid$2.propTypes = {
  three: PropTypes.bool,
  children: PropTypes.any
};

var Bot =
/*#__PURE__*/
function () {
  function Bot(_ref2) {
    var _this = this;

    var enumerate = _ref2.enumerate,
        seed = _ref2.seed;

    _classCallCheck(this, Bot);

    _defineProperty(this, "enumerate", function (G, ctx, playerID) {
      var actions = _this.enumerateFn(G, ctx, playerID);

      return actions.map(function (a) {
        if (a.payload !== undefined) {
          return a;
        }

        if (a.move !== undefined) {
          return makeMove(a.move, a.args, playerID);
        }

        if (a.event !== undefined) {
          return gameEvent(a.event, a.args, playerID);
        }
      });
    });

    this.enumerateFn = enumerate;
    this.seed = seed;
  }

  _createClass(Bot, [{
    key: "random",
    value: function random(arg) {
      var number;

      if (this.seed !== undefined) {
        var r = null;

        if (this.prngstate) {
          r = new alea('', {
            state: this.prngstate
          });
        } else {
          r = new alea(this.seed, {
            state: true
          });
        }

        number = r();
        this.prngstate = r.state();
      } else {
        number = Math.random();
      }

      if (arg) {
        // eslint-disable-next-line unicorn/explicit-length-check
        if (arg.length) {
          var id = Math.floor(number * arg.length);
          return arg[id];
        } else {
          return Math.floor(number * arg);
        }
      }

      return number;
    }
  }]);

  return Bot;
}();
var RandomBot =
/*#__PURE__*/
function (_Bot) {
  _inherits(RandomBot, _Bot);

  function RandomBot() {
    _classCallCheck(this, RandomBot);

    return _possibleConstructorReturn(this, _getPrototypeOf(RandomBot).apply(this, arguments));
  }

  _createClass(RandomBot, [{
    key: "play",
    value: function play(_ref3, playerID) {
      var G = _ref3.G,
          ctx = _ref3.ctx;
      var moves = this.enumerate(G, ctx, playerID);
      return {
        action: this.random(moves)
      };
    }
  }]);

  return RandomBot;
}(Bot);
var MCTSBot =
/*#__PURE__*/
function (_Bot2) {
  _inherits(MCTSBot, _Bot2);

  function MCTSBot(_ref4) {
    var _this2;

    var enumerate = _ref4.enumerate,
        seed = _ref4.seed,
        objectives = _ref4.objectives,
        game = _ref4.game,
        iterations = _ref4.iterations,
        playoutDepth = _ref4.playoutDepth;

    _classCallCheck(this, MCTSBot);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(MCTSBot).call(this, {
      enumerate: enumerate,
      seed: seed
    }));

    if (objectives === undefined) {
      objectives = function objectives() {
        return {};
      };
    }

    _this2.objectives = objectives;
    _this2.reducer = CreateGameReducer({
      game: game
    });
    _this2.iterations = iterations || 1000;
    _this2.playoutDepth = playoutDepth || 50;
    return _this2;
  }

  _createClass(MCTSBot, [{
    key: "createNode",
    value: function createNode(_ref5) {
      var state = _ref5.state,
          parentAction = _ref5.parentAction,
          parent = _ref5.parent,
          playerID = _ref5.playerID;
      var G = state.G,
          ctx = state.ctx;
      var actions = [];
      var objectives = [];

      if (playerID !== undefined) {
        actions = this.enumerate(G, ctx, playerID);
        objectives = this.objectives(G, ctx, playerID);
      } else {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = ctx.actionPlayers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _playerID = _step.value;
            actions = actions.concat(this.enumerate(G, ctx, _playerID));
            objectives = objectives.concat(this.objectives(G, ctx, _playerID));
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }

      return {
        // Game state at this node.
        state: state,
        // Parent of the node.
        parent: parent,
        // Move used to get to this node.
        parentAction: parentAction,
        // Unexplored actions.
        actions: actions,
        // Current objectives.
        objectives: objectives,
        // Children of the node.
        children: [],
        // Number of simulations that pass through this node.
        visits: 0,
        // Number of wins for this node.
        value: 0
      };
    }
  }, {
    key: "select",
    value: function select(node) {
      // This node has unvisited children.
      if (node.actions.length > 0) {
        return node;
      } // This is a terminal node.


      if (node.children.length == 0) {
        return node;
      }

      var selectedChild = null;
      var best = 0.0;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = node.children[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var child = _step2.value;
          var childVisits = child.visits + Number.EPSILON;
          var uct = child.value / childVisits + Math.sqrt(2 * Math.log(node.visits) / childVisits);

          if (selectedChild == null || uct > best) {
            best = uct;
            selectedChild = child;
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return this.select(selectedChild);
    }
  }, {
    key: "expand",
    value: function expand(node) {
      var actions = node.actions;

      if (actions.length == 0 || node.state.ctx.gameover !== undefined) {
        return node;
      }

      var id = this.random(actions.length);
      var action = actions[id];
      node.actions.splice(id, 1);
      var childState = this.reducer(node.state, action);
      var childNode = this.createNode({
        state: childState,
        parentAction: action,
        parent: node
      });
      node.children.push(childNode);
      return childNode;
    }
  }, {
    key: "playout",
    value: function playout(node) {
      var _this3 = this;

      var state = node.state;

      var _loop = function _loop(i) {
        var _state = state,
            G = _state.G,
            ctx = _state.ctx;

        var moves = _this3.enumerate(G, ctx, ctx.actionPlayers[0]); // Check if any objectives are met.


        var objectives = _this3.objectives(G, ctx);

        var score = Object.keys(objectives).reduce(function (score, key) {
          var objective = objectives[key];

          if (objective.checker(G, ctx)) {
            return score + objective.weight;
          }

          return score;
        }, 0.0); // If so, stop and return the score.

        if (score > 0) {
          return {
            v: {
              score: score
            }
          };
        }

        if (!moves || moves.length == 0) {
          return {
            v: undefined
          };
        }

        var id = _this3.random(moves.length);

        var childState = _this3.reducer(state, moves[id]);

        state = childState;
      };

      for (var i = 0; i < this.playoutDepth && state.ctx.gameover === undefined; i++) {
        var _ret = _loop(i);

        if (_typeof(_ret) === "object") return _ret.v;
      }

      return state.ctx.gameover;
    }
  }, {
    key: "backpropagate",
    value: function backpropagate(node) {
      var result = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      node.visits++;

      if (result.score !== undefined) {
        node.value += result.score;
      }

      if (result.draw === true) {
        node.value += 0.5;
      }

      if (node.parentAction && result.winner === node.parentAction.payload.playerID) {
        node.value++;
      }

      if (node.parent) {
        this.backpropagate(node.parent, result);
      }
    }
  }, {
    key: "play",
    value: function play(state, playerID) {
      var root = this.createNode({
        state: state,
        playerID: playerID
      });

      for (var i = 0; i < this.iterations; i++) {
        var leaf = this.select(root);
        var child = this.expand(leaf);
        var result = this.playout(child);
        this.backpropagate(child, result);
      }

      var selectedChild = null;
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = root.children[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var _child = _step3.value;

          if (selectedChild == null || _child.visits > selectedChild.visits) {
            selectedChild = _child;
          }
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      var action = selectedChild && selectedChild.parentAction;
      var metadata = root;
      return {
        action: action,
        metadata: metadata
      };
    }
  }]);

  return MCTSBot;
}(Bot);

/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
function AI(_ref) {
  var bot = _ref.bot,
      enumerate = _ref.enumerate,
      visualize = _ref.visualize;

  if (!bot) {
    bot = MCTSBot;
  }

  return {
    bot: bot,
    enumerate: enumerate,
    visualize: visualize
  };
}

/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
var main = {
  Client: Client,
  ReactClient: Client$1,
  ReactNativeClient: Client$2,
  Game: Game,
  Flow: Flow,
  FlowWithPhases: FlowWithPhases,
  TurnOrder: TurnOrder,
  Pass: Pass,
  Card: Card$2,
  Token: Token$2,
  Grid: Grid$2,
  HexGrid: HexGrid$2,
  AI: AI,
  RandomBot: RandomBot,
  MCTSBot: MCTSBot
};

export default main;
