'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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

var Flatted = (function (Primitive, primitive) {

  /*!
   * ISC License
   *
   * Copyright (c) 2018, Andrea Giammarchi, @WebReflection
   *
   * Permission to use, copy, modify, and/or distribute this software for any
   * purpose with or without fee is hereby granted, provided that the above
   * copyright notice and this permission notice appear in all copies.
   *
   * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
   * REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
   * AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
   * INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
   * LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE
   * OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
   * PERFORMANCE OF THIS SOFTWARE.
   */

  var Flatted = {

    parse: function parse(text) {
      var input = JSON.parse(text, Primitives).map(primitives);
      var value = input[0];
      return typeof value === 'object' && value ?
              revive(input, new Set, value) : value;
    },

    stringify: function stringify(value) {
      for (var
        firstRun,
        known = new Map,
        input = [],
        output = [],
        i = +set(known, input, value),
        replace = function (key, value) {
          if (firstRun) return (firstRun = !firstRun), value;
          switch (typeof value) {
            case 'object':
              if (value === null) return value;
            case primitive:
              return known.get(value) || set(known, input, value);
          }
          return value;
        };
        i < input.length; i++
      ) {
        firstRun = true;
        output[i] = JSON.stringify(input[i], replace);
      }
      return '[' + output.join(',') + ']';
    }

  };

  return Flatted;

  function revive(input, parsed, output) {
    return Object.keys(output).reduce(
      function (output, key) {
        var value = output[key];
        if (value instanceof Primitive) {
          var tmp = input[value];
          if (typeof tmp === 'object' && !parsed.has(tmp)) {
            parsed.add(tmp);
            output[key] = revive(input, parsed, tmp);
          } else {
            output[key] = tmp;
          }
        }
        return output;
      },
      output
    );
  }

  function set(known, input, value) {
    var index = Primitive(input.push(value) - 1);
    known.set(value, index);
    return index;
  }

  function primitives(value) {
    return value instanceof Primitive ? Primitive(value) : value;
  }

  function Primitives(key, value) {
    return typeof value === primitive ? new Primitive(value) : value;
  }

}(String, 'string'));
const parse = Flatted.parse;
const stringify = Flatted.stringify;

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

/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
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

var _typeof$1 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();





var defineProperty = function (obj, key, value) {
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
};

var NOTHING = typeof Symbol !== "undefined" ? Symbol("immer-nothing") : defineProperty({}, "immer-nothing", true);

var DRAFT_STATE = typeof Symbol !== "undefined" ? Symbol("immer-state") : "__$immer_state";

function isDraft(value) {
    return !!value && !!value[DRAFT_STATE];
}

function isDraftable(value) {
    if (!value) return false;
    if ((typeof value === "undefined" ? "undefined" : _typeof$1(value)) !== "object") return false;
    if (Array.isArray(value)) return true;
    var proto = Object.getPrototypeOf(value);
    return proto === null || proto === Object.prototype;
}

var assign = Object.assign || function assign(target, value) {
    for (var key in value) {
        if (has(value, key)) {
            target[key] = value[key];
        }
    }
    return target;
};

function shallowCopy(value) {
    if (Array.isArray(value)) return value.slice();
    var target = value.__proto__ === undefined ? Object.create(null) : {};
    return assign(target, value);
}

function each(value, cb) {
    if (Array.isArray(value)) {
        for (var i = 0; i < value.length; i++) {
            cb(i, value[i], value);
        }
    } else {
        for (var key in value) {
            cb(key, value[key], value);
        }
    }
}

function has(thing, prop) {
    return Object.prototype.hasOwnProperty.call(thing, prop);
}

function is(x, y) {
    // From: https://github.com/facebook/fbjs/blob/c69904a511b900266935168223063dd8772dfc40/packages/fbjs/src/core/shallowEqual.js
    if (x === y) {
        return x !== 0 || 1 / x === 1 / y;
    } else {
        return x !== x && y !== y;
    }
}

function generatePatches(state, basePath, patches, inversePatches) {
    Array.isArray(state.base) ? generateArrayPatches(state, basePath, patches, inversePatches) : generateObjectPatches(state, basePath, patches, inversePatches);
}

function generateArrayPatches(state, basePath, patches, inversePatches) {
    var base = state.base,
        copy = state.copy,
        assigned = state.assigned;

    var minLength = Math.min(base.length, copy.length);

    // Look for replaced indices.
    for (var i = 0; i < minLength; i++) {
        if (assigned[i] && base[i] !== copy[i]) {
            var path = basePath.concat(i);
            patches.push({ op: "replace", path: path, value: copy[i] });
            inversePatches.push({ op: "replace", path: path, value: base[i] });
        }
    }

    // Did the array expand?
    if (minLength < copy.length) {
        for (var _i = minLength; _i < copy.length; _i++) {
            patches.push({
                op: "add",
                path: basePath.concat(_i),
                value: copy[_i]
            });
        }
        inversePatches.push({
            op: "replace",
            path: basePath.concat("length"),
            value: base.length
        });
    }

    // ...or did it shrink?
    else if (minLength < base.length) {
            patches.push({
                op: "replace",
                path: basePath.concat("length"),
                value: copy.length
            });
            for (var _i2 = minLength; _i2 < base.length; _i2++) {
                inversePatches.push({
                    op: "add",
                    path: basePath.concat(_i2),
                    value: base[_i2]
                });
            }
        }
}

function generateObjectPatches(state, basePath, patches, inversePatches) {
    var base = state.base,
        copy = state.copy;

    each(state.assigned, function (key, assignedValue) {
        var origValue = base[key];
        var value = copy[key];
        var op = !assignedValue ? "remove" : key in base ? "replace" : "add";
        if (origValue === base && op === "replace") return;
        var path = basePath.concat(key);
        patches.push(op === "remove" ? { op: op, path: path } : { op: op, path: path, value: value });
        inversePatches.push(op === "add" ? { op: "remove", path: path } : op === "remove" ? { op: "add", path: path, value: origValue } : { op: "replace", path: path, value: origValue });
    });
}

function applyPatches(draft, patches) {
    for (var i = 0; i < patches.length; i++) {
        var patch = patches[i];
        var path = patch.path;

        if (path.length === 0 && patch.op === "replace") {
            draft = patch.value;
        } else {
            var base = draft;
            for (var _i3 = 0; _i3 < path.length - 1; _i3++) {
                base = base[path[_i3]];
                if (!base || (typeof base === "undefined" ? "undefined" : _typeof$1(base)) !== "object") throw new Error("Cannot apply patch, path doesn't resolve: " + path.join("/")); // prettier-ignore
            }
            var key = path[path.length - 1];
            switch (patch.op) {
                case "replace":
                case "add":
                    // TODO: add support is not extensive, it does not support insertion or `-` atm!
                    base[key] = patch.value;
                    break;
                case "remove":
                    if (Array.isArray(base)) {
                        if (key !== base.length - 1) throw new Error("Only the last index of an array can be removed, index: " + key + ", length: " + base.length); // prettier-ignore
                        base.length -= 1;
                    } else {
                        delete base[key];
                    }
                    break;
                default:
                    throw new Error("Unsupported patch operation: " + patch.op);
            }
        }
    }
    return draft;
}

// @ts-check

var descriptors = {};

// For nested produce calls:
var scopes = [];
var currentScope = function currentScope() {
    return scopes[scopes.length - 1];
};

function willFinalize(result, baseDraft, needPatches) {
    var scope = currentScope();
    scope.forEach(function (state) {
        return state.finalizing = true;
    });
    if (result === undefined || result === baseDraft) {
        if (needPatches) markChangesRecursively(baseDraft);
        // This is faster when we don't care about which attributes changed.
        markChangesSweep(scope);
    }
}

function createDraft(base, parent) {
    var draft = void 0;
    if (isDraft(base)) {
        var _state = base[DRAFT_STATE];
        // Avoid creating new drafts when copying.
        _state.finalizing = true;
        draft = shallowCopy(_state.draft);
        _state.finalizing = false;
    } else {
        draft = shallowCopy(base);
    }
    each(base, function (prop) {
        Object.defineProperty(draft, "" + prop, createPropertyProxy("" + prop));
    });

    // See "proxy.js" for property documentation.
    var state = {
        scope: parent ? parent.scope : currentScope(),
        modified: false,
        finalizing: false, // es5 only
        finalized: false,
        assigned: {},
        parent: parent,
        base: base,
        draft: draft,
        copy: null,
        revoke: revoke,
        revoked: false // es5 only
    };

    createHiddenProperty(draft, DRAFT_STATE, state);
    state.scope.push(state);
    return draft;
}

function revoke() {
    this.revoked = true;
}

function source(state) {
    return state.copy || state.base;
}

function _get$1(state, prop) {
    assertUnrevoked(state);
    var value = source(state)[prop];
    // Drafts are only created for proxyable values that exist in the base state.
    if (!state.finalizing && value === state.base[prop] && isDraftable(value)) {
        prepareCopy(state);
        return state.copy[prop] = createDraft(value, state);
    }
    return value;
}

function _set$1(state, prop, value) {
    assertUnrevoked(state);
    state.assigned[prop] = true;
    if (!state.modified) {
        if (is(source(state)[prop], value)) return;
        markChanged(state);
        prepareCopy(state);
    }
    state.copy[prop] = value;
}

function markChanged(state) {
    if (!state.modified) {
        state.modified = true;
        if (state.parent) markChanged(state.parent);
    }
}

function prepareCopy(state) {
    if (!state.copy) state.copy = shallowCopy(state.base);
}

function createPropertyProxy(prop) {
    return descriptors[prop] || (descriptors[prop] = {
        configurable: true,
        enumerable: true,
        get: function get$$1() {
            return _get$1(this[DRAFT_STATE], prop);
        },
        set: function set$$1(value) {
            _set$1(this[DRAFT_STATE], prop, value);
        }
    });
}

function assertUnrevoked(state) {
    if (state.revoked === true) throw new Error("Cannot use a proxy that has been revoked. Did you pass an object from inside an immer function to an async process? " + JSON.stringify(state.copy || state.base));
}

// This looks expensive, but only proxies are visited, and only objects without known changes are scanned.
function markChangesSweep(scope) {
    // The natural order of drafts in the `scope` array is based on when they
    // were accessed. By processing drafts in reverse natural order, we have a
    // better chance of processing leaf nodes first. When a leaf node is known to
    // have changed, we can avoid any traversal of its ancestor nodes.
    for (var i = scope.length - 1; i >= 0; i--) {
        var state = scope[i];
        if (state.modified === false) {
            if (Array.isArray(state.base)) {
                if (hasArrayChanges(state)) markChanged(state);
            } else if (hasObjectChanges(state)) markChanged(state);
        }
    }
}

function markChangesRecursively(object) {
    if (!object || (typeof object === "undefined" ? "undefined" : _typeof$1(object)) !== "object") return;
    var state = object[DRAFT_STATE];
    if (!state) return;
    var base = state.base,
        draft = state.draft,
        assigned = state.assigned;

    if (!Array.isArray(object)) {
        // Look for added keys.
        Object.keys(draft).forEach(function (key) {
            // The `undefined` check is a fast path for pre-existing keys.
            if (base[key] === undefined && !has(base, key)) {
                assigned[key] = true;
                markChanged(state);
            } else if (!assigned[key]) {
                // Only untouched properties trigger recursion.
                markChangesRecursively(draft[key]);
            }
        });
        // Look for removed keys.
        Object.keys(base).forEach(function (key) {
            // The `undefined` check is a fast path for pre-existing keys.
            if (draft[key] === undefined && !has(draft, key)) {
                assigned[key] = false;
                markChanged(state);
            }
        });
    } else if (hasArrayChanges(state)) {
        markChanged(state);
        assigned.length = true;
        if (draft.length < base.length) {
            for (var i = draft.length; i < base.length; i++) {
                assigned[i] = false;
            }
        } else {
            for (var _i = base.length; _i < draft.length; _i++) {
                assigned[_i] = true;
            }
        }
        for (var _i2 = 0; _i2 < draft.length; _i2++) {
            // Only untouched indices trigger recursion.
            if (assigned[_i2] === undefined) markChangesRecursively(draft[_i2]);
        }
    }
}

function hasObjectChanges(state) {
    var base = state.base,
        draft = state.draft;

    // Search for added keys. Start at the back, because non-numeric keys
    // are ordered by time of definition on the object.

    var keys = Object.keys(draft);
    for (var i = keys.length - 1; i >= 0; i--) {
        // The `undefined` check is a fast path for pre-existing keys.
        if (base[keys[i]] === undefined && !has(base, keys[i])) {
            return true;
        }
    }

    // Since no keys have been added, we can compare lengths to know if an
    // object has been deleted.
    return keys.length !== Object.keys(base).length;
}

function hasArrayChanges(state) {
    var draft = state.draft;

    if (draft.length !== state.base.length) return true;
    // See #116
    // If we first shorten the length, our array interceptors will be removed.
    // If after that new items are added, result in the same original length,
    // those last items will have no intercepting property.
    // So if there is no own descriptor on the last position, we know that items were removed and added
    // N.B.: splice, unshift, etc only shift values around, but not prop descriptors, so we only have to check
    // the last one
    var descriptor = Object.getOwnPropertyDescriptor(draft, draft.length - 1);
    // descriptor can be null, but only for newly created sparse arrays, eg. new Array(10)
    if (descriptor && !descriptor.get) return true;
    // For all other cases, we don't have to compare, as they would have been picked up by the index setters
    return false;
}

function createHiddenProperty(target, prop, value) {
    Object.defineProperty(target, prop, {
        value: value,
        enumerable: false,
        writable: true
    });
}



var legacyProxy = Object.freeze({
	scopes: scopes,
	currentScope: currentScope,
	willFinalize: willFinalize,
	createDraft: createDraft
});

// @ts-check

// For nested produce calls:
var scopes$1 = [];
var currentScope$1 = function currentScope() {
    return scopes$1[scopes$1.length - 1];
};

// Do nothing before being finalized.
function willFinalize$1() {}

function createDraft$1(base, parent) {
    var state = {
        // Track which produce call this is associated with.
        scope: parent ? parent.scope : currentScope$1(),
        // True for both shallow and deep changes.
        modified: false,
        // Used during finalization.
        finalized: false,
        // Track which properties have been assigned (true) or deleted (false).
        assigned: {},
        // The parent draft state.
        parent: parent,
        // The base state.
        base: base,
        // The base proxy.
        draft: null,
        // Any property proxies.
        drafts: {},
        // The base copy with any updated values.
        copy: null,
        // Called by the `produce` function.
        revoke: null
    };

    var _ref = Array.isArray(base) ? Proxy.revocable([state], arrayTraps) : Proxy.revocable(state, objectTraps),
        revoke = _ref.revoke,
        proxy = _ref.proxy;

    state.draft = proxy;
    state.revoke = revoke;

    state.scope.push(state);
    return proxy;
}

var objectTraps = {
    get: get$1,
    has: function has$$1(target, prop) {
        return prop in source$1(target);
    },
    ownKeys: function ownKeys(target) {
        return Reflect.ownKeys(source$1(target));
    },

    set: set$1,
    deleteProperty: deleteProperty,
    getOwnPropertyDescriptor: getOwnPropertyDescriptor,
    defineProperty: defineProperty$1,
    setPrototypeOf: function setPrototypeOf() {
        throw new Error("Immer does not support `setPrototypeOf()`.");
    }
};

var arrayTraps = {};
each(objectTraps, function (key, fn) {
    arrayTraps[key] = function () {
        arguments[0] = arguments[0][0];
        return fn.apply(this, arguments);
    };
});
arrayTraps.deleteProperty = function (state, prop) {
    if (isNaN(parseInt(prop))) throw new Error("Immer does not support deleting properties from arrays: " + prop);
    return objectTraps.deleteProperty.call(this, state[0], prop);
};
arrayTraps.set = function (state, prop, value) {
    if (prop !== "length" && isNaN(parseInt(prop))) throw new Error("Immer does not support setting non-numeric properties on arrays: " + prop);
    return objectTraps.set.call(this, state[0], prop, value);
};

function source$1(state) {
    return state.copy || state.base;
}

function get$1(state, prop) {
    if (prop === DRAFT_STATE) return state;
    var drafts = state.drafts;

    // Check for existing draft in unmodified state.

    if (!state.modified && has(drafts, prop)) {
        return drafts[prop];
    }

    var value = source$1(state)[prop];
    if (state.finalized || !isDraftable(value)) return value;

    // Check for existing draft in modified state.
    if (state.modified) {
        // Assigned values are never drafted. This catches any drafts we created, too.
        if (value !== state.base[prop]) return value;
        // Store drafts on the copy (when one exists).
        drafts = state.copy;
    }

    return drafts[prop] = createDraft$1(value, state);
}

function set$1(state, prop, value) {
    if (!state.modified) {
        // Optimize based on value's truthiness. Truthy values are guaranteed to
        // never be undefined, so we can avoid the `in` operator. Lastly, truthy
        // values may be drafts, but falsy values are never drafts.
        var isUnchanged = value ? is(state.base[prop], value) || value === state.drafts[prop] : is(state.base[prop], value) && prop in state.base;
        if (isUnchanged) return true;
        markChanged$1(state);
    }
    state.assigned[prop] = true;
    state.copy[prop] = value;
    return true;
}

function deleteProperty(state, prop) {
    // The `undefined` check is a fast path for pre-existing keys.
    if (state.base[prop] !== undefined || prop in state.base) {
        state.assigned[prop] = false;
        markChanged$1(state);
    }
    if (state.copy) delete state.copy[prop];
    return true;
}

function getOwnPropertyDescriptor(state, prop) {
    var owner = state.modified ? state.copy : has(state.drafts, prop) ? state.drafts : state.base;
    var descriptor = Reflect.getOwnPropertyDescriptor(owner, prop);
    if (descriptor && !(Array.isArray(owner) && prop === "length")) descriptor.configurable = true;
    return descriptor;
}

function defineProperty$1() {
    throw new Error("Immer does not support defining properties on draft objects.");
}

function markChanged$1(state) {
    if (!state.modified) {
        state.modified = true;
        state.copy = assign(shallowCopy(state.base), state.drafts);
        state.drafts = null;
        if (state.parent) markChanged$1(state.parent);
    }
}

var modernProxy = Object.freeze({
	scopes: scopes$1,
	currentScope: currentScope$1,
	willFinalize: willFinalize$1,
	createDraft: createDraft$1
});

function verifyMinified() {}

var configDefaults = {
    useProxies: typeof Proxy !== "undefined" && typeof Reflect !== "undefined",
    autoFreeze: typeof process !== "undefined" ? process.env.NODE_ENV !== "production" : verifyMinified.name === "verifyMinified",
    onAssign: null,
    onDelete: null,
    onCopy: null
};

var Immer = function () {
    function Immer(config) {
        classCallCheck(this, Immer);

        assign(this, configDefaults, config);
        this.setUseProxies(this.useProxies);
        this.produce = this.produce.bind(this);
    }

    createClass(Immer, [{
        key: "produce",
        value: function produce(base, recipe, patchListener) {
            var _this = this;

            // curried invocation
            if (typeof base === "function" && typeof recipe !== "function") {
                var defaultBase = recipe;
                recipe = base;

                // prettier-ignore
                return function () {
                    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                        args[_key - 1] = arguments[_key];
                    }

                    var base = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultBase;
                    return _this.produce(base, function (draft) {
                        var _recipe;

                        return (_recipe = recipe).call.apply(_recipe, [draft, draft].concat(args));
                    });
                };
            }

            // prettier-ignore
            {
                if (typeof recipe !== "function") throw new Error("if first argument is not a function, the second argument to produce should be a function");
                if (patchListener !== undefined && typeof patchListener !== "function") throw new Error("the third argument of a producer should not be set or a function");
            }

            var result = void 0;
            // Only create proxies for plain objects/arrays.
            if (!isDraftable(base)) {
                result = recipe(base);
                if (result === undefined) return base;
            }
            // See #100, don't nest producers
            else if (isDraft(base)) {
                    result = recipe.call(base, base);
                    if (result === undefined) return base;
                }
                // The given value must be proxied.
                else {
                        this.scopes.push([]);
                        var baseDraft = this.createDraft(base);
                        try {
                            result = recipe.call(baseDraft, baseDraft);
                            this.willFinalize(result, baseDraft, !!patchListener);

                            // Never generate patches when no listener exists.
                            var patches = patchListener && [],
                                inversePatches = patchListener && [];

                            // Finalize the modified draft...
                            if (result === undefined || result === baseDraft) {
                                result = this.finalize(baseDraft, [], patches, inversePatches);
                            }
                            // ...or use a replacement value.
                            else {
                                    // Users must never modify the draft _and_ return something else.
                                    if (baseDraft[DRAFT_STATE].modified) throw new Error("An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft."); // prettier-ignore

                                    // Finalize the replacement in case it contains (or is) a subset of the draft.
                                    if (isDraftable(result)) result = this.finalize(result);

                                    if (patchListener) {
                                        patches.push({
                                            op: "replace",
                                            path: [],
                                            value: result
                                        });
                                        inversePatches.push({
                                            op: "replace",
                                            path: [],
                                            value: base
                                        });
                                    }
                                }
                        } finally {
                            this.currentScope().forEach(function (state) {
                                return state.revoke();
                            });
                            this.scopes.pop();
                        }
                        patchListener && patchListener(patches, inversePatches);
                    }
            // Normalize the result.
            return result === NOTHING ? undefined : result;
        }
    }, {
        key: "setAutoFreeze",
        value: function setAutoFreeze(value) {
            this.autoFreeze = value;
        }
    }, {
        key: "setUseProxies",
        value: function setUseProxies(value) {
            this.useProxies = value;
            assign(this, value ? modernProxy : legacyProxy);
        }
        /**
         * @internal
         * Finalize a draft, returning either the unmodified base state or a modified
         * copy of the base state.
         */

    }, {
        key: "finalize",
        value: function finalize(draft, path, patches, inversePatches) {
            var state = draft[DRAFT_STATE];
            if (!state) {
                if (Object.isFrozen(draft)) return draft;
                return this.finalizeTree(draft);
            }
            // Never finalize drafts owned by an outer scope.
            if (state.scope !== this.currentScope()) {
                return draft;
            }
            if (!state.modified) return state.base;
            if (!state.finalized) {
                state.finalized = true;
                this.finalizeTree(state.draft, path, patches, inversePatches);
                if (this.onDelete) {
                    var assigned = state.assigned;

                    for (var prop in assigned) {
                        assigned[prop] || this.onDelete(state, prop);
                    }
                }
                if (this.onCopy) this.onCopy(state);

                // Nested producers must never auto-freeze their result,
                // because it may contain drafts from parent producers.
                if (this.autoFreeze && this.scopes.length === 1) {
                    Object.freeze(state.copy);
                }

                if (patches) generatePatches(state, path, patches, inversePatches);
            }
            return state.copy;
        }
        /**
         * @internal
         * Finalize all drafts in the given state tree.
         */

    }, {
        key: "finalizeTree",
        value: function finalizeTree(root, path, patches, inversePatches) {
            var _this2 = this;

            var state = root[DRAFT_STATE];
            if (state) {
                root = this.useProxies ? state.copy : state.copy = shallowCopy(state.draft);
            }

            var onAssign = this.onAssign;

            var finalizeProperty = function finalizeProperty(prop, value, parent) {
                // Only `root` can be a draft in here.
                var inDraft = !!state && parent === root;

                if (isDraft(value)) {
                    // prettier-ignore
                    parent[prop] = value =
                    // Patches are never generated for assigned properties.
                    patches && inDraft && !state.assigned[prop] ? _this2.finalize(value, path.concat(prop), patches, inversePatches) : _this2.finalize(value);

                    // Unchanged drafts are ignored.
                    if (inDraft && value === state.base[prop]) return;
                }
                // Unchanged draft properties are ignored.
                else if (inDraft && is(value, state.base[prop])) {
                        return;
                    }
                    // Search new objects for unfinalized drafts. Frozen objects should never contain drafts.
                    else if (isDraftable(value) && !Object.isFrozen(value)) {
                            each(value, finalizeProperty);
                        }

                if (inDraft && onAssign) {
                    onAssign(state, prop, value);
                }
            };

            each(root, finalizeProperty);
            return root;
        }
    }]);
    return Immer;
}();

var immer = new Immer();

/**
 * The `produce` function takes a value and a "recipe function" (whose
 * return value often depends on the base state). The recipe function is
 * free to mutate its first argument however it wants. All mutations are
 * only ever applied to a __copy__ of the base state.
 *
 * Pass only a function to create a "curried producer" which relieves you
 * from passing the recipe function every time.
 *
 * Only plain objects and arrays are made mutable. All other objects are
 * considered uncopyable.
 *
 * Note: This function is __bound__ to its `Immer` instance.
 *
 * @param {any} base - the initial state
 * @param {Function} producer - function that receives a proxy of the base state as first argument and which can be freely modified
 * @param {Function} patchListener - optional function that will be called with all the patches produced here
 * @returns {any} a new state, or the initial state if nothing was modified
 */
var produce = immer.produce;

/**
 * Apply an array of Immer patches to the first argument.
 *
 * This function is a producer, which means copy-on-write is in effect.
 */
var applyPatches$1 = produce(applyPatches);

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

/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
var Koa = require('koa');

var Router = require('koa-router');

var koaBody = require('koa-body');

var uuid = require('shortid').generate;

var cors = require('@koa/cors');

function sanitizeString(str) {
  str = str.replace(/[^a-z0-9áéíóúñü .,_-]/gim, '');
  return str.trim();
}

var createGameMetadata = function createGameMetadata(gameName) {
  return {
    players: {},
    gameName: gameName
  };
};

var GameMetadataKey = function GameMetadataKey(gameID) {
  return "".concat(gameID, ":metadata");
};
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


var JoinGame = async function JoinGame(db, ctx, gameID, playerName) {
  // Gets credentials for a new player
  var gameMetadata = await db.get(GameMetadataKey(gameID));

  if (!gameMetadata) {
    ctx.throw(404, 'Game ' + gameID + ' not found');
  }

  var players = gameMetadata.players; // Find an empty slot and join it

  var credentials = undefined;
  var playerID = undefined; //debug code

  console.log('Attempting to find slot for player');
  console.log(players);

  for (var i = 0; i < Object.keys(players).length; i++) {
    console.log('Checking slot ' + i);

    if (typeof players[i].name === 'undefined') {
      //Join the game
      playerID = i.toString();
      players[i].name = playerName;
      credentials = players[i].credentials;
      await db.set(GameMetadataKey(gameID), gameMetadata);
      break;
    }
  } // First player becomes host and gets admin powers
  // (all player credentials)


  var adminData = undefined;

  if (playerID === '0') {
    adminData = gameMetadata;
  }

  if (typeof credentials === 'undefined') {
    ctx.throw(409, 'Game is full!');
  }

  return {
    gameID: gameID,
    gameName: gameMetadata.gameName,
    credentials: credentials,
    playerID: playerID,
    adminData: adminData
  };
};

var CreateGame = async function CreateGame(db, game, numPlayers, setupData, lobbyConfig) {
  var gameMetadata = createGameMetadata(game.name);
  var state = InitializeGame({
    game: game,
    numPlayers: numPlayers,
    setupData: setupData
  });

  for (var playerIndex = 0; playerIndex < numPlayers; playerIndex++) {
    var credentials = uuid();
    gameMetadata.players[playerIndex] = {
      id: playerIndex,
      credentials: credentials
    };
  }

  var gameID = lobbyConfig.uuid();
  await db.set(GameMetadataKey(gameID), gameMetadata);
  await db.set(gameID, state);
  return gameID;
};
var createApiServer = function createApiServer(_ref) {
  var db = _ref.db,
      games = _ref.games,
      lobbyConfig = _ref.lobbyConfig;
  var app = new Koa();
  return addApiToServer({
    app: app,
    db: db,
    games: games,
    lobbyConfig: lobbyConfig
  });
};
var addApiToServer = function addApiToServer(_ref2) {
  var app = _ref2.app,
      db = _ref2.db,
      games = _ref2.games,
      lobbyConfig = _ref2.lobbyConfig;

  if (!lobbyConfig) {
    lobbyConfig = {};
  }

  if (!lobbyConfig.uuid) {
    lobbyConfig = _objectSpread({}, lobbyConfig, {
      uuid: uuid
    });
  }

  var router = new Router();
  router.get('/games', async function (ctx) {
    ctx.body = games.map(function (game) {
      return game.name;
    });
  });
  router.post('/games/:name/create', koaBody(), async function (ctx) {
    console.log('create version 2');
    var playerName = sanitizeString(ctx.request.body.playerName); // The name of the game (for example: tic-tac-toe).

    var gameName = sanitizeString(ctx.params.name); // User-data to pass to the game setup function.

    var setupData = ctx.request.body.setupData; // The number of players for this game instance.

    var numPlayers = parseInt(ctx.request.body.numPlayers);

    if (!numPlayers) {
      numPlayers = 2;
    }

    var game = games.find(function (g) {
      return g.name === gameName;
    });
    var gameID = await CreateGame(db, game, numPlayers, setupData, lobbyConfig);
    var gameInfo = await JoinGame(db, ctx, gameID, playerName);
    ctx.body = gameInfo;
  });
  router.get('/games/:id', async function (ctx) {
    var gameID = sanitizeString(ctx.params.id);
    var room = await db.get(GameMetadataKey(gameID));

    if (!room) {
      ctx.throw(404, 'Room ' + gameID + ' not found');
    }

    var strippedRoom = {
      gameID: gameID,
      players: Object.values(room.players).map(function (player) {
        return {
          id: player.id,
          name: player.name
        };
      })
    };
    ctx.body = strippedRoom;
  });
  router.post('/games/:id/join', koaBody(), async function (ctx) {
    var playerName = sanitizeString(ctx.request.body.playerName);
    var gameID = sanitizeString(ctx.params.id);

    if (!playerName) {
      ctx.throw(403, 'playerName is required');
    }

    var gameInfo = await JoinGame(db, ctx, gameID, playerName);
    ctx.body = gameInfo;
  });
  router.post('/games/:id/leave', koaBody(), async function (ctx) {
    var gameID = sanitizeString(ctx.params.id);
    var playerID = sanitizeString(ctx.request.body.playerID);
    var credentials = sanitizeString(ctx.request.body.credentials);
    var gameMetadata = await db.get(GameMetadataKey(gameID));

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

    if (Object.values(gameMetadata.players).some(function (val) {
      return val.name;
    })) {
      await db.set(GameMetadataKey(gameID), gameMetadata);
    } else {
      // remove room
      await db.remove(gameID);
      await db.remove(GameMetadataKey(gameID));
    }

    ctx.body = {};
  });
  router.post('/games/:id/rename', koaBody(), async function (ctx) {
    var gameID = sanitizeString(ctx.params.id);
    var playerID = sanitizeString(ctx.request.body.playerID);
    var credentials = sanitizeString(ctx.request.body.credentials);
    var newName = sanitizeString(ctx.request.body.newName);
    var gameMetadata = await db.get(GameMetadataKey(gameID));

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
  app.use(cors()); // If API_SECRET is set, then require that requests set an
  // api-secret header that is set to the same value.

  app.use(async function (ctx, next) {
    if (!!process.env.API_SECRET && ctx.request.headers['api-secret'] !== process.env.API_SECRET) {
      ctx.throw(403, 'Invalid API secret');
    }

    await next();
  });
  app.use(router.routes()).use(router.allowedMethods());
  return app;
};

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

/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
var LRU = require('lru-cache');
/**
 * MongoDB connector.
 */


var Mongo =
/*#__PURE__*/
function () {
  /**
   * Creates a new Mongo connector object.
   */
  function Mongo(_ref) {
    var url = _ref.url,
        dbname = _ref.dbname,
        cacheSize = _ref.cacheSize,
        mockClient = _ref.mockClient;

    _classCallCheck(this, Mongo);

    if (cacheSize === undefined) cacheSize = 1000;
    if (dbname === undefined) dbname = 'bgio';
    this.client = mockClient || require('mongodb').MongoClient;
    this.url = url;
    this.dbname = dbname;
    this.cache = new LRU({
      max: cacheSize
    });
  }
  /**
   * Connect to the instance.
   */


  _createClass(Mongo, [{
    key: "connect",
    value: async function connect() {
      var c = await this.client.connect(this.url, {
        useNewUrlParser: true
      });
      this.db = c.db(this.dbname);
      return;
    }
    /**
     * Write the game state.
     * @param {string} id - The game id.
     * @param {object} store - A game state to persist.
     */

  }, {
    key: "set",
    value: async function set(id, state) {
      // Don't set a value if the cache has a more recent version.
      // This can occur due a race condition.
      //
      // For example:
      //
      // A --sync--> server | DB => 0 --+
      //                                |
      // A <--sync-- server | DB => 0 --+
      //
      // B --sync--> server | DB => 0 ----+
      //                                  |
      // A --move--> server | DB <= 1 --+ |
      //                                | |
      // A <--sync-- server | DB => 1 --+ |
      //                                  |
      // B <--sync-- server | DB => 0 ----+
      //
      var cacheValue = this.cache.get(id);

      if (cacheValue && cacheValue._stateID >= state._stateID) {
        return;
      }

      this.cache.set(id, state);
      var col = this.db.collection(id);
      delete state._id;
      await col.insertOne(state);
      return;
    }
    /**
     * Read the game state.
     * @param {string} id - The game id.
     * @returns {object} - A game state, or undefined
     *                     if no game is found with this id.
     */

  }, {
    key: "get",
    value: async function get(id) {
      var cacheValue = this.cache.get(id);

      if (cacheValue !== undefined) {
        return cacheValue;
      }

      var col = this.db.collection(id);
      var docs = await col.find().sort({
        _id: -1
      }).limit(1).toArray();
      var oldStateID = 0;
      cacheValue = this.cache.get(id);
      /* istanbul ignore next line */

      if (cacheValue !== undefined) {
        /* istanbul ignore next line */
        oldStateID = cacheValue._stateID;
      }

      var newStateID = -1;

      if (docs.length > 0) {
        newStateID = docs[0]._stateID;
      } // Update the cache, but only if the read
      // value is newer than the value already in it.
      // A race condition might overwrite the
      // cache with an older value, so we need this.


      if (newStateID >= oldStateID) {
        this.cache.set(id, docs[0]);
      }

      return docs[0];
    }
    /**
     * Check if a particular game exists.
     * @param {string} id - The game id.
     * @returns {boolean} - True if a game with this id exists.
     */

  }, {
    key: "has",
    value: async function has(id) {
      var cacheValue = this.cache.get(id);

      if (cacheValue !== undefined) {
        return true;
      }

      var col = this.db.collection(id);
      var docs = await col.find().limit(1).toArray();
      return docs.length > 0;
    }
    /**
     * Remove the game state from the DB.
     * @param {string} id - The game id.
     */

  }, {
    key: "remove",
    value: async function remove(id) {
      if (!(await this.has(id))) return;

      function _dropCollection(db, id) {
        return new Promise(function (ok) {
          db.dropCollection(id, ok);
        });
      }

      await _dropCollection(this.db, id); // Update the cache

      this.cache.del(id);
    }
    /**
     * Return all keys.
     * @returns {array} - Array of keys (strings)
     */

  }, {
    key: "list",
    value: async function list() {
      var keys = await this.db.listCollections().toArray();
      return keys.map(function (r) {
        return r.name;
      });
    }
  }]);

  return Mongo;
}();

/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
var LRU$1 = require('lru-cache');

var ENGINE_FIRESTORE = 'Firestore';
var ENGINE_RTDB = 'RTDB';
/**
 * Firebase RTDB/Firestore connector.
 */

var Firebase =
/*#__PURE__*/
function () {
  /**
   * Creates a new Firebase connector object.
   * The default engine is Firestore.
   * @constructor
   */
  function Firebase(_ref) {
    var config = _ref.config,
        dbname = _ref.dbname,
        engine = _ref.engine,
        cacheSize = _ref.cacheSize,
        adminClient = _ref.adminClient;

    _classCallCheck(this, Firebase);

    if (cacheSize === undefined) {
      cacheSize = 1000;
    }

    if (dbname === undefined) {
      dbname = 'bgio';
    } // // TODO: better handling for possible errors


    if (config === undefined) {
      config = {};
    }

    if (adminClient) {
      this.client = require('firebase-admin');
    } else {
      this.client = require('firebase');
    }

    this.engine = engine === ENGINE_RTDB ? engine : ENGINE_FIRESTORE;
    this.config = config;
    this.dbname = dbname;
    this.cache = new LRU$1({
      max: cacheSize
    });
  }
  /**
   * Connect to the instance.
   */


  _createClass(Firebase, [{
    key: "connect",
    value: async function connect() {
      this.client.initializeApp(this.config);
      this.db = this.engine === ENGINE_FIRESTORE ? this.client.firestore() : this.client.database().ref();
      return;
    }
    /**
     * Write the game state.
     * @param {string} id - The game id.
     * @param {object} store - A game state to persist.
     */

  }, {
    key: "set",
    value: async function set(id, state) {
      var cacheValue = this.cache.get(id);

      if (cacheValue && cacheValue._stateID >= state._stateID) {
        return;
      }

      this.cache.set(id, state);
      var col = this.engine === ENGINE_RTDB ? this.db.child(id) : this.db.collection(this.dbname).doc(id);
      delete state._id;
      await col.set(state);
      return;
    }
    /**
     * Read the game state.
     * @param {string} id - The game id.
     * @returns {object} - A game state, or undefined
     *                     if no game is found with this id.
     */

  }, {
    key: "get",
    value: async function get(id) {
      var cacheValue = this.cache.get(id);

      if (cacheValue !== undefined) {
        return cacheValue;
      }

      var col, doc, data;

      if (this.engine === ENGINE_RTDB) {
        col = this.db.child(id);
        data = await col.once('value');
        doc = data.val() ? Object.assign({}, data.val(), {
          _id: id
        }) : data.val();
      } else {
        col = this.db.collection(this.dbname).doc(id);
        data = await col.get();
        doc = data.data() ? Object.assign({}, data.data(), {
          _id: id
        }) : data.data();
      }

      var oldStateID = 0;
      cacheValue = this.cache.get(id);
      /* istanbul ignore next line */

      if (cacheValue !== undefined) {
        /* istanbul ignore next line */
        oldStateID = cacheValue._stateID;
      }

      var newStateID = -1;

      if (doc) {
        newStateID = doc._stateID;
      } // Update the cache, but only if the read
      // value is newer than the value already in it.
      // A race condition might overwrite the
      // cache with an older value, so we need this.


      if (newStateID >= oldStateID) {
        this.cache.set(id, doc);
      }

      if (doc === null) {
        return undefined;
      }

      return doc;
    }
    /**
     * Check if a particular game exists.
     * @param {string} id - The game id.
     * @returns {boolean} - True if a game with this id exists.
     */

  }, {
    key: "has",
    value: async function has(id) {
      var cacheValue = this.cache.get(id);

      if (cacheValue !== undefined) {
        return true;
      }

      var col, data, exists;

      if (this.engine === ENGINE_RTDB) {
        col = this.db.child(id);
        data = await col.once('value');
        exists = data.exists();
      } else {
        col = this.db.collection(this.dbname).doc(id);
        data = await col.get();
        exists = data.exists;
      }

      return exists;
    }
    /**
     * Remove the game state from the DB.
     * @param {string} id - The game id.
     */

  }, {
    key: "remove",
    value: async function remove(id) {
      if (!(await this.has(id))) return;
      var col;

      if (this.engine === ENGINE_RTDB) {
        col = this.db.child(id);
        await col.remove();
      } else {
        col = this.db.collection(this.dbname).doc(id);
        await col.delete();
      } // Update the cache


      this.cache.del(id);
    }
    /**
     * Return all keys.
     * @returns {array} - Array of keys (strings)
     */

  }, {
    key: "list",
    value: async function list() {
      if (this.engine === ENGINE_RTDB) {
        // firebase RTDB
        var cols = await this.db.once('value');
        return cols.ref.sortedDataKeys;
      } else {
        // firestore
        var docs = await this.db.collection(this.dbname).get();
        var ids = [];
        docs.forEach(function (doc) {
          return ids.push(doc.id);
        });
        return ids;
      }
    }
  }]);

  return Firebase;
}();

/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

/**
 * FlatFile data storage.
 */
var FlatFile =
/*#__PURE__*/
function () {
  /**
   * Creates a new FlatFile storage.
   */
  function FlatFile(_ref) {
    var dir = _ref.dir,
        logging = _ref.logging,
        ttl = _ref.ttl;

    _classCallCheck(this, FlatFile);

    this.games = require('node-persist');
    this.dir = dir;
    this.logging = logging || false;
    this.ttl = ttl || false;
  }
  /**
   * Connect.
   */


  _createClass(FlatFile, [{
    key: "connect",
    value: async function connect() {
      await this.games.init({
        dir: this.dir,
        logging: this.logging,
        ttl: this.ttl
      });
      return;
    }
  }, {
    key: "clear",
    value: async function clear() {
      return this.games.clear();
    }
    /**
     * Write the game state.
     * @param {string} id - The game id.
     * @param {object} store - A game state to persist.
     */

  }, {
    key: "set",
    value: async function set(id, state) {
      return await this.games.setItem(id, state);
    }
    /**
     * Read the game state.
     * @param {string} id - The game id.
     * @returns {object} - A game state, or undefined
     *                     if no game is found with this id.
     */

  }, {
    key: "get",
    value: async function get(id) {
      return await this.games.getItem(id);
    }
    /**
     * Check if a particular game id exists.
     * @param {string} id - The game id.
     * @returns {boolean} - True if a game with this id exists.
     */

  }, {
    key: "has",
    value: async function has(id) {
      var keys = await this.games.keys();
      return keys.indexOf(id) > -1;
    }
    /**
     * Remove the game state.
     * @param {string} id - The game id.
     */

  }, {
    key: "remove",
    value: async function remove(id) {
      var keys = await this.games.keys();
      if (!(keys.indexOf(id) > -1)) return;
      this.games.removeItem(id);
    }
    /**
     * Return all keys.
     * @returns {array} - Array of keys (strings)
     */

  }, {
    key: "list",
    value: async function list() {
      return _toConsumableArray((await this.games.keys()));
    }
  }]);

  return FlatFile;
}();

var DBFromEnv = function DBFromEnv() {
  if (process.env.MONGO_URI && process.env.MONGO_DATABASE) {
    return new Mongo({
      url: process.env.MONGO_URI,
      dbname: process.env.MONGO_DATABASE
    });
  } else if (process.env.FIREBASE_APIKEY && process.env.FIREBASE_AUTHDOMAIN && process.env.FIREBASE_DATABASEURL && process.env.FIREBASE_PROJECTID) {
    var config = {
      apiKey: process.env.FIREBASE_APIKEY,
      authDomain: process.env.FIREBASE_AUTHDOMAIN,
      databaseURL: process.env.FIREBASE_DATABASEURL,
      projectId: process.env.FIREBASE_PROJECTID
    };
    return new Firebase({
      config: config,
      engine: process.env.FIREBASE_ENGINE
    });
  } else {
    return new InMemory();
  }
};

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
function info(msg) {
  logfn("INFO: ".concat(msg));
}
function error(error) {
  errorfn('ERROR:', error);
}

function symbolObservablePonyfill(root) {
	var result;
	var Symbol = root.Symbol;

	if (typeof Symbol === 'function') {
		if (Symbol.observable) {
			result = Symbol.observable;
		} else {
			result = Symbol('observable');
			Symbol.observable = result;
		}
	} else {
		result = '@@observable';
	}

	return result;
}

/* global window */

var root;

if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (typeof module !== 'undefined') {
  root = module;
} else {
  root = Function('return this')();
}

var result = symbolObservablePonyfill(root);

/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
var randomString = function randomString() {
  return Math.random().toString(36).substring(7).split('').join('.');
};

var ActionTypes = {
  INIT: "@@redux/INIT" + randomString(),
  REPLACE: "@@redux/REPLACE" + randomString(),
  PROBE_UNKNOWN_ACTION: function PROBE_UNKNOWN_ACTION() {
    return "@@redux/PROBE_UNKNOWN_ACTION" + randomString();
  }
};

/**
 * @param {any} obj The object to inspect.
 * @returns {boolean} True if the argument appears to be a plain object.
 */
function isPlainObject(obj) {
  if (typeof obj !== 'object' || obj === null) return false;
  var proto = obj;

  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(obj) === proto;
}

/**
 * Creates a Redux store that holds the state tree.
 * The only way to change the data in the store is to call `dispatch()` on it.
 *
 * There should only be a single store in your app. To specify how different
 * parts of the state tree respond to actions, you may combine several reducers
 * into a single reducer function by using `combineReducers`.
 *
 * @param {Function} reducer A function that returns the next state tree, given
 * the current state tree and the action to handle.
 *
 * @param {any} [preloadedState] The initial state. You may optionally specify it
 * to hydrate the state from the server in universal apps, or to restore a
 * previously serialized user session.
 * If you use `combineReducers` to produce the root reducer function, this must be
 * an object with the same shape as `combineReducers` keys.
 *
 * @param {Function} [enhancer] The store enhancer. You may optionally specify it
 * to enhance the store with third-party capabilities such as middleware,
 * time travel, persistence, etc. The only store enhancer that ships with Redux
 * is `applyMiddleware()`.
 *
 * @returns {Store} A Redux store that lets you read the state, dispatch actions
 * and subscribe to changes.
 */

function createStore(reducer, preloadedState, enhancer) {
  var _ref2;

  if (typeof preloadedState === 'function' && typeof enhancer === 'function' || typeof enhancer === 'function' && typeof arguments[3] === 'function') {
    throw new Error('It looks like you are passing several store enhancers to ' + 'createStore(). This is not supported. Instead, compose them ' + 'together to a single function');
  }

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.');
    }

    return enhancer(createStore)(reducer, preloadedState);
  }

  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }
  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */


  function getState() {
    if (isDispatching) {
      throw new Error('You may not call store.getState() while the reducer is executing. ' + 'The reducer has already received the state as an argument. ' + 'Pass it down from the top reducer instead of reading it from the store.');
    }

    return currentState;
  }
  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */


  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected the listener to be a function.');
    }

    if (isDispatching) {
      throw new Error('You may not call store.subscribe() while the reducer is executing. ' + 'If you would like to be notified after the store has been updated, subscribe from a ' + 'component and invoke store.getState() in the callback to access the latest state. ' + 'See https://redux.js.org/api-reference/store#subscribe(listener) for more details.');
    }

    var isSubscribed = true;
    ensureCanMutateNextListeners();
    nextListeners.push(listener);
    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      if (isDispatching) {
        throw new Error('You may not unsubscribe from a store listener while the reducer is executing. ' + 'See https://redux.js.org/api-reference/store#subscribe(listener) for more details.');
      }

      isSubscribed = false;
      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
    };
  }
  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */


  function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
    }

    if (typeof action.type === 'undefined') {
      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    var listeners = currentListeners = nextListeners;

    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener();
    }

    return action;
  }
  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */


  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.');
    }

    currentReducer = nextReducer;
    dispatch({
      type: ActionTypes.REPLACE
    });
  }
  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/tc39/proposal-observable
   */


  function observable() {
    var _ref;

    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function subscribe(observer) {
        if (typeof observer !== 'object' || observer === null) {
          throw new TypeError('Expected the observer to be an object.');
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return {
          unsubscribe: unsubscribe
        };
      }
    }, _ref[result] = function () {
      return this;
    }, _ref;
  } // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.


  dispatch({
    type: ActionTypes.INIT
  });
  return _ref2 = {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  }, _ref2[result] = observable, _ref2;
}

/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */


  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
  } catch (e) {} // eslint-disable-line no-empty

}

/*
 * This is a dummy function to check if the function name has been altered by minification.
 * If the function has been minified and NODE_ENV !== 'production', warn the user.
 */

function isCrushed() {}

if (process.env.NODE_ENV !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
  warning('You are currently using minified code outside of NODE_ENV === "production". ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or setting mode to production in webpack (https://webpack.js.org/concepts/mode/) ' + 'to ensure you have the correct code for your production build.');
}

var GameMetadataKey$1 = function GameMetadataKey(gameID) {
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
        var gameMetadata = this.storageAPI.get(GameMetadataKey$1(gameID));
        isActionAuthentic = this.auth({
          action: action,
          gameMetadata: gameMetadata,
          gameID: gameID,
          playerID: playerID
        });
      } else {
        var _gameMetadata = await this.storageAPI.get(GameMetadataKey$1(gameID));

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
      var store = createStore(reducer, state); // Only allow UNDO / REDO if there is exactly one player
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
        gameMetadata = this.storageAPI.get(GameMetadataKey$1(gameID));
      } else {
        state = await this.storageAPI.get(key);
        gameMetadata = await this.storageAPI.get(GameMetadataKey$1(gameID));
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

var IO = require('koa-socket-2');

var PING_TIMEOUT = 20 * 1e3;
var PING_INTERVAL = 10 * 1e3;
/**
 * API that's exposed by SocketIO for the Master to send
 * information to the clients.
 */

function TransportAPI(gameID, socket, clientInfo, roomInfo) {
  /**
   * Send a message to a specific client.
   */
  var send = function send(_ref) {
    var type = _ref.type,
        playerID = _ref.playerID,
        args = _ref.args;
    var clients = roomInfo.get(gameID).values();
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = clients[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var client = _step.value;
        var info = clientInfo.get(client);

        if (info.playerID == playerID) {
          if (socket.id == client) {
            socket.emit.apply(socket, [type].concat(_toConsumableArray(args)));
          } else {
            socket.to(info.socket.id).emit.apply(socket, [type].concat(_toConsumableArray(args)));
          }
        }
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
  };
  /**
   * Send a message to all clients.
   */


  var sendAll = function sendAll(arg) {
    roomInfo.get(gameID).forEach(function (c) {
      var playerID = clientInfo.get(c).playerID;

      if (typeof arg === 'function') {
        var t = arg(playerID);
        t.playerID = playerID;
        send(t);
      } else {
        arg.playerID = playerID;
        send(arg);
      }
    });
  };

  return {
    send: send,
    sendAll: sendAll
  };
}
/**
 * Transport interface that uses socket.io
 */

function SocketIO(_clientInfo, _roomInfo) {
  var clientInfo = _clientInfo || new Map();
  var roomInfo = _roomInfo || new Map();
  return {
    init: function init(app, games) {
      var io = new IO({
        ioOptions: {
          pingTimeout: PING_TIMEOUT,
          pingInterval: PING_INTERVAL
        }
      });
      app.context.io = io;
      io.attach(app);
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        var _loop = function _loop() {
          var game = _step2.value;

          var nsp = app._io.of(game.name);

          nsp.on('connection', function (socket) {
            socket.on('update', async function (action, stateID, gameID, playerID) {
              var master = new Master(game, app.context.db, TransportAPI(gameID, socket, clientInfo, roomInfo), true);
              await master.onUpdate(action, stateID, gameID, playerID);
            });
            socket.on('sync', async function (gameID, playerID, numPlayers) {
              socket.join(gameID); // Remove client from any previous game that it was a part of.

              if (clientInfo.has(socket.id)) {
                var _clientInfo$get = clientInfo.get(socket.id),
                    oldGameID = _clientInfo$get.gameID;

                roomInfo.get(oldGameID).delete(socket.id);
              }

              var roomClients = roomInfo.get(gameID);

              if (roomClients === undefined) {
                roomClients = new Set();
                roomInfo.set(gameID, roomClients);
              }

              roomClients.add(socket.id);
              clientInfo.set(socket.id, {
                gameID: gameID,
                playerID: playerID,
                socket: socket
              });
              var master = new Master(game, app.context.db, TransportAPI(gameID, socket, clientInfo, roomInfo), true);
              await master.onSync(gameID, playerID, numPlayers);
            });
            socket.on('disconnect', function () {
              if (clientInfo.has(socket.id)) {
                var _clientInfo$get2 = clientInfo.get(socket.id),
                    gameID = _clientInfo$get2.gameID;

                roomInfo.get(gameID).delete(socket.id);
                clientInfo.delete(socket.id);
              }
            });
          });
        };

        for (var _iterator2 = games[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          _loop();
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
  };
}

/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
var Koa$1 = require('koa');
/**
 * Build config object from server run arguments.
 *
 * @param {number} portOrConfig - Either port or server config object. Optional.
 * @param {function} callback - Server run callback. Optional.
 */

var createServerRunConfig = function createServerRunConfig(portOrConfig, callback) {
  var config = {};

  if (portOrConfig && _typeof(portOrConfig) === 'object') {
    config.port = portOrConfig.port;
    config.callback = portOrConfig.callback || callback;
    config.lobbyConfig = portOrConfig.lobbyConfig;
  } else {
    config.port = portOrConfig;
    config.callback = callback;
  }

  return config;
};
/**
 * Instantiate a game server.
 *
 * @param {Array} games - The games that this server will handle.
 * @param {object} db - The interface with the database.
 * @param {object} transport - The interface with the clients.
 */

function Server(_ref) {
  var games = _ref.games,
      db = _ref.db,
      transport = _ref.transport;
  var app = new Koa$1();

  if (db === undefined) {
    db = DBFromEnv();
  }

  app.context.db = db;

  if (transport === undefined) {
    transport = SocketIO();
  }

  transport.init(app, games);
  return {
    app: app,
    db: db,
    run: async function run(portOrConfig, callback) {
      var serverRunConfig = createServerRunConfig(portOrConfig, callback); // DB

      await db.connect(); // Lobby API

      var lobbyConfig = serverRunConfig.lobbyConfig;
      var apiServer;

      if (!lobbyConfig || !lobbyConfig.apiPort) {
        addApiToServer({
          app: app,
          db: db,
          games: games,
          lobbyConfig: lobbyConfig
        });
      } else {
        // Run API in a separate Koa app.
        var api = createApiServer({
          db: db,
          games: games,
          lobbyConfig: lobbyConfig
        });
        apiServer = await api.listen(lobbyConfig.apiPort, lobbyConfig.apiCallback);
        info("API serving on ".concat(apiServer.address().port, "..."));
      } // Run Game Server (+ API, if necessary).


      var appServer = await app.listen(serverRunConfig.port, serverRunConfig.callback);
      info("App serving on ".concat(appServer.address().port, "..."));
      return {
        apiServer: apiServer,
        appServer: appServer
      };
    },
    kill: function kill(_ref2) {
      var apiServer = _ref2.apiServer,
          appServer = _ref2.appServer;

      if (apiServer) {
        apiServer.close();
      }

      appServer.close();
    }
  };
}

/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

exports.Server = Server;
exports.Mongo = Mongo;
exports.Firebase = Firebase;
exports.FlatFile = FlatFile;
