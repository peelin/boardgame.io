(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('prop-types'), require('redux'), require('socket.io-client'), require('flatted'), require('immer')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'prop-types', 'redux', 'socket.io-client', 'flatted', 'immer'], factory) :
  (global = global || self, factory(global.ReactNativeClient = {}, global.React, global.PropTypes, global.Redux, global.io, global.Flatted, global.immer));
}(this, function (exports, React, PropTypes, redux, io, flatted, produce) { 'use strict';

  React = React && React.hasOwnProperty('default') ? React['default'] : React;
  PropTypes = PropTypes && PropTypes.hasOwnProperty('default') ? PropTypes['default'] : PropTypes;
  io = io && io.hasOwnProperty('default') ? io['default'] : io;
  produce = produce && produce.hasOwnProperty('default') ? produce['default'] : produce;

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
  var DEV = process.env.NODE_ENV === 'development' || process.env.NODE_ENV == 'test';
  var logfn = DEV ? console.log : function () {};
  var errorfn = DEV ? console.error : function () {};
  function error(error) {
    errorfn('ERROR:', error);
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
      return flatted.parse(flatted.stringify(obj));
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
          error("game not found, gameID=[".concat(key, "]"));
          return {
            error: 'game not found'
          };
        }

        var reducer = CreateGameReducer({
          game: this.game,
          numPlayers: state.ctx.numPlayers
        });
        var store = redux.createStore(reducer, state); // Only allow UNDO / REDO if there is exactly one player
        // that can make moves right now and the person doing the
        // action is that player.

        if (action.type == UNDO || action.type == REDO) {
          if (state.ctx.currentPlayer !== playerID || state.ctx.actionPlayers.length != 1 || state.ctx.actionPlayers[0] !== playerID) {
            error("playerID=[".concat(playerID, "] cannot undo / redo right now"));
            return;
          }
        } // Check whether the player is allowed to make the move.


        if (action.type == MAKE_MOVE && !this.game.flow.canPlayerMakeMove(state.G, state.ctx, playerID)) {
          error("move not processed - canPlayerMakeMove=false, playerID=[".concat(playerID, "]"));
          return;
        } // Check whether the player is allowed to call the event.


        if (action.type == GAME_EVENT && !this.game.flow.canPlayerCallEvent(state.G, state.ctx, playerID)) {
          error("event not processed - invalid playerID=[".concat(playerID, "]"));
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
        enhancer = redux.compose(redux.applyMiddleware(SubscriptionMiddleware, TransportMiddleware, LogMiddleware), enhancer);
      } else {
        enhancer = redux.applyMiddleware(SubscriptionMiddleware, TransportMiddleware, LogMiddleware);
      }

      this.store = redux.createStore(this.reducer, initialState, enhancer);
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
        } else {
          error('invalid multiplayer spec');
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

  function Client$1(opts) {
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

  /*
   * Copyright 2018 The boardgame.io Authors
   *
   * Use of this source code is governed by a MIT-style
   * license that can be found in the LICENSE file or at
   * https://opensource.org/licenses/MIT.
   */

  exports.Client = Client$1;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
