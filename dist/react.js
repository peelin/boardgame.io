(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('prop-types'), require('mousetrap'), require('flatted'), require('redux'), require('socket.io-client'), require('immer'), require('react-cookies')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'prop-types', 'mousetrap', 'flatted', 'redux', 'socket.io-client', 'immer', 'react-cookies'], factory) :
  (global = global || self, factory(global.Client = {}, global.React, global.PropTypes, global.Mousetrap, global.Flatted, global.Redux, global.io, global.immer, global.Cookies));
}(this, function (exports, React, PropTypes, Mousetrap, flatted, redux, io, produce, Cookies) { 'use strict';

  React = React && React.hasOwnProperty('default') ? React['default'] : React;
  PropTypes = PropTypes && PropTypes.hasOwnProperty('default') ? PropTypes['default'] : PropTypes;
  Mousetrap = Mousetrap && Mousetrap.hasOwnProperty('default') ? Mousetrap['default'] : Mousetrap;
  io = io && io.hasOwnProperty('default') ? io['default'] : io;
  produce = produce && produce.hasOwnProperty('default') ? produce['default'] : produce;
  Cookies = Cookies && Cookies.hasOwnProperty('default') ? Cookies['default'] : Cookies;

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
          error(error2);
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
        var json = flatted.stringify(_this.props.gamestate);
        window.localStorage.setItem('gamestate', json);
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "restoreState", function () {
        var gamestateJSON = window.localStorage.getItem('gamestate');

        if (gamestateJSON !== null) {
          var gamestate = flatted.parse(gamestateJSON);

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

  /*
   * Copyright 2018 The boardgame.io Authors
   *
   * Use of this source code is governed by a MIT-style
   * license that can be found in the LICENSE file or at
   * https://opensource.org/licenses/MIT.
   */
  var _LobbyConnectionImpl =
  /*#__PURE__*/
  function () {
    function _LobbyConnectionImpl(_ref) {
      var server = _ref.server,
          gameComponents = _ref.gameComponents,
          playerName = _ref.playerName,
          playerCredentials = _ref.playerCredentials;

      _classCallCheck(this, _LobbyConnectionImpl);

      this.gameComponents = gameComponents;
      this.playerName = playerName || 'Visitor';
      this.playerCredentials = playerCredentials;
      this.server = server;
      this.rooms = [];
    }

    _createClass(_LobbyConnectionImpl, [{
      key: "_baseUrl",
      value: function _baseUrl() {
        return "".concat(this.server || '', "/games");
      }
    }, {
      key: "refresh",
      value: async function refresh() {
        try {
          this.rooms.length = 0;
          var resp = await fetch(this._baseUrl());

          if (resp.status !== 200) {
            throw new Error('HTTP status ' + resp.status);
          }

          var json = await resp.json();
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = json[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var gameName = _step.value;
              if (!this._getGameComponents(gameName)) continue;
              var gameResp = await fetch(this._baseUrl() + '/' + gameName);
              var gameJson = await gameResp.json();
              var _iteratorNormalCompletion2 = true;
              var _didIteratorError2 = false;
              var _iteratorError2 = undefined;

              try {
                for (var _iterator2 = gameJson.rooms[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                  var inst = _step2.value;
                  inst.gameName = gameName;
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

              this.rooms = this.rooms.concat(gameJson.rooms);
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
        } catch (error) {
          throw new Error('failed to retrieve list of games (' + error + ')');
        }
      }
    }, {
      key: "_getGameInstance",
      value: function _getGameInstance(gameID) {
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = this.rooms[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var inst = _step3.value;
            if (inst['gameID'] === gameID) return inst;
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
      }
    }, {
      key: "_getGameComponents",
      value: function _getGameComponents(gameName) {
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = this.gameComponents[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var comp = _step4.value;
            if (comp.game.name === gameName) return comp;
          }
        } catch (err) {
          _didIteratorError4 = true;
          _iteratorError4 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
              _iterator4.return();
            }
          } finally {
            if (_didIteratorError4) {
              throw _iteratorError4;
            }
          }
        }
      }
    }, {
      key: "_findPlayer",
      value: function _findPlayer(playerName) {
        var _iteratorNormalCompletion5 = true;
        var _didIteratorError5 = false;
        var _iteratorError5 = undefined;

        try {
          for (var _iterator5 = this.rooms[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
            var inst = _step5.value;
            if (inst.players.some(function (player) {
              return player.name === playerName;
            })) return inst;
          }
        } catch (err) {
          _didIteratorError5 = true;
          _iteratorError5 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion5 && _iterator5.return != null) {
              _iterator5.return();
            }
          } finally {
            if (_didIteratorError5) {
              throw _iteratorError5;
            }
          }
        }
      }
    }, {
      key: "join",
      value: async function join(gameName, gameID, playerID) {
        try {
          var inst = this._findPlayer(this.playerName);

          if (inst) {
            throw new Error('player has already joined ' + inst.gameID);
          }

          inst = this._getGameInstance(gameID);

          if (!inst) {
            throw new Error('game instance ' + gameID + ' not found');
          }

          var resp = await fetch(this._baseUrl() + '/' + gameName + '/' + gameID + '/join', {
            method: 'POST',
            body: JSON.stringify({
              playerID: playerID,
              playerName: this.playerName
            }),
            headers: {
              'Content-Type': 'application/json'
            }
          });
          if (resp.status !== 200) throw new Error('HTTP status ' + resp.status);
          var json = await resp.json();
          inst.players[Number.parseInt(playerID)].name = this.playerName;
          this.playerCredentials = json.playerCredentials;
        } catch (error) {
          throw new Error('failed to join room ' + gameID + ' (' + error + ')');
        }
      }
    }, {
      key: "leave",
      value: async function leave(gameName, gameID) {
        try {
          var inst = this._getGameInstance(gameID);

          if (!inst) throw new Error('game instance not found');
          var _iteratorNormalCompletion6 = true;
          var _didIteratorError6 = false;
          var _iteratorError6 = undefined;

          try {
            for (var _iterator6 = inst.players[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
              var player = _step6.value;

              if (player.name === this.playerName) {
                var resp = await fetch(this._baseUrl() + '/' + gameName + '/' + gameID + '/leave', {
                  method: 'POST',
                  body: JSON.stringify({
                    playerID: player.id,
                    credentials: this.playerCredentials
                  }),
                  headers: {
                    'Content-Type': 'application/json'
                  }
                });

                if (resp.status !== 200) {
                  throw new Error('HTTP status ' + resp.status);
                }

                delete player.name;
                delete this.playerCredentials;
                return;
              }
            }
          } catch (err) {
            _didIteratorError6 = true;
            _iteratorError6 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion6 && _iterator6.return != null) {
                _iterator6.return();
              }
            } finally {
              if (_didIteratorError6) {
                throw _iteratorError6;
              }
            }
          }

          throw new Error('player not found in room');
        } catch (error) {
          throw new Error('failed to leave room ' + gameID + ' (' + error + ')');
        }
      }
    }, {
      key: "disconnect",
      value: async function disconnect() {
        var inst = this._findPlayer(this.playerName);

        if (inst) {
          await this.leave(inst.gameName, inst.gameID);
        }

        this.rooms = [];
        this.playerName = 'Visitor';
      }
    }, {
      key: "create",
      value: async function create(gameName, numPlayers) {
        try {
          var comp = this._getGameComponents(gameName);

          if (!comp) throw new Error('game not found');
          if (numPlayers < comp.game.minPlayers || numPlayers > comp.game.maxPlayers) throw new Error('invalid number of players ' + numPlayers);
          var resp = await fetch(this._baseUrl() + '/' + gameName + '/create', {
            method: 'POST',
            body: JSON.stringify({
              numPlayers: numPlayers
            }),
            headers: {
              'Content-Type': 'application/json'
            }
          });
          if (resp.status !== 200) throw new Error('HTTP status ' + resp.status);
        } catch (error) {
          throw new Error('failed to create room for ' + gameName + ' (' + error + ')');
        }
      }
    }]);

    return _LobbyConnectionImpl;
  }();
  /**
   * LobbyConnection
   *
   * Lobby model.
   *
   * @param {string}   server - '<host>:<port>' of the server.
   * @param {Array}    gameComponents - A map of Board and Game objects for the supported games.
   * @param {string}   playerName - The name of the player.
   * @param {string}   playerCredentials - The credentials currently used by the player, if any.
   *
   * Returns:
   *   A JS object that synchronizes the list of running game instances with the server and provides an API to create/join/start instances.
   */


  function LobbyConnection(opts) {
    return new _LobbyConnectionImpl(opts);
  }

  var LobbyLoginForm =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(LobbyLoginForm, _React$Component);

    function LobbyLoginForm() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, LobbyLoginForm);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(LobbyLoginForm)).call.apply(_getPrototypeOf2, [this].concat(args)));

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
        playerName: _this.props.playerName,
        nameErrorMsg: ''
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onClickEnter", function () {
        if (_this.state.playerName === '') return;

        _this.props.onEnter(_this.state.playerName);
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onKeyPress", function (event) {
        if (event.key === 'Enter') {
          _this.onClickEnter();
        }
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onChangePlayerName", function (event) {
        var name = event.target.value.trim();

        _this.setState({
          playerName: name,
          nameErrorMsg: name.length > 0 ? '' : 'empty player name'
        });
      });

      return _this;
    }

    _createClass(LobbyLoginForm, [{
      key: "render",
      value: function render() {
        return React.createElement("div", null, React.createElement("p", {
          className: "phase-title"
        }, "Choose a player name:"), React.createElement("input", {
          type: "text",
          value: this.state.playerName,
          onChange: this.onChangePlayerName,
          onKeyPress: this.onKeyPress
        }), React.createElement("span", {
          className: "buttons"
        }, React.createElement("button", {
          className: "buttons",
          onClick: this.onClickEnter
        }, "Enter")), React.createElement("br", null), React.createElement("span", {
          className: "error-msg"
        }, this.state.nameErrorMsg, React.createElement("br", null)));
      }
    }]);

    return LobbyLoginForm;
  }(React.Component);

  _defineProperty(LobbyLoginForm, "propTypes", {
    playerName: PropTypes.string,
    onEnter: PropTypes.func.isRequired
  });

  _defineProperty(LobbyLoginForm, "defaultProps", {
    playerName: ''
  });

  var LobbyRoomInstance =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(LobbyRoomInstance, _React$Component);

    function LobbyRoomInstance() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, LobbyRoomInstance);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(LobbyRoomInstance)).call.apply(_getPrototypeOf2, [this].concat(args)));

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_createSeat", function (player) {
        return player.name || '[free]';
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_createInstanceButtons", function (inst) {
        var playerSeat = inst.players.find(function (player) {
          return player.name === _this.props.playerName;
        });
        var freeSeat = inst.players.find(function (player) {
          return !player.name;
        });

        if (playerSeat && freeSeat) {
          // already seated: waiting for game to start
          return React.createElement("button", {
            onClick: function onClick() {
              return _this.props.onClickLeave(inst.gameName, inst.gameID);
            }
          }, "Leave");
        }

        if (freeSeat) {
          // at least 1 seat is available
          return React.createElement("button", {
            onClick: function onClick() {
              return _this.props.onClickJoin(inst.gameName, inst.gameID, '' + freeSeat.id);
            }
          }, "Join");
        } // room is full


        if (playerSeat) {
          return React.createElement("button", {
            onClick: function onClick() {
              return _this.props.onClickPlay(inst.gameName, {
                gameID: inst.gameID,
                playerID: '' + playerSeat.id,
                numPlayers: inst.players.length
              });
            }
          }, "Play");
        } // allow spectating


        return React.createElement("button", {
          onClick: function onClick() {
            return _this.props.onClickPlay(inst.gameName, {
              gameID: inst.gameID,
              numPlayers: inst.players.length
            });
          }
        }, "Spectate");
      });

      return _this;
    }

    _createClass(LobbyRoomInstance, [{
      key: "render",
      value: function render() {
        var room = this.props.room;
        var status = 'OPEN';

        if (!room.players.find(function (player) {
          return !player.name;
        })) {
          status = 'RUNNING';
        }

        return React.createElement("tr", {
          key: 'line-' + room.gameID
        }, React.createElement("td", {
          key: 'cell-name-' + room.gameID
        }, room.gameName), React.createElement("td", {
          key: 'cell-status-' + room.gameID
        }, status), React.createElement("td", {
          key: 'cell-seats-' + room.gameID
        }, room.players.map(this._createSeat).join(', ')), React.createElement("td", {
          key: 'cell-buttons-' + room.gameID
        }, this._createInstanceButtons(room)));
      }
    }]);

    return LobbyRoomInstance;
  }(React.Component);

  _defineProperty(LobbyRoomInstance, "propTypes", {
    room: PropTypes.shape({
      gameName: PropTypes.string.isRequired,
      gameID: PropTypes.string.isRequired,
      players: PropTypes.array.isRequired
    }),
    playerName: PropTypes.string.isRequired,
    onClickJoin: PropTypes.func.isRequired,
    onClickLeave: PropTypes.func.isRequired,
    onClickPlay: PropTypes.func.isRequired
  });

  var LobbyCreateRoomForm =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(LobbyCreateRoomForm, _React$Component);

    function LobbyCreateRoomForm(props) {
      var _this;

      _classCallCheck(this, LobbyCreateRoomForm);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(LobbyCreateRoomForm).call(this, props));
      /* fix min and max number of players */

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
        selectedGame: 0,
        numPlayers: 2
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_createGameNameOption", function (game, idx) {
        return React.createElement("option", {
          key: 'name-option-' + idx,
          value: idx
        }, game.game.name);
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_createNumPlayersOption", function (idx) {
        return React.createElement("option", {
          key: 'num-option-' + idx,
          value: idx
        }, idx);
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_createNumPlayersRange", function (game) {
        return _toConsumableArray(new Array(game.maxPlayers + 1).keys()).slice(game.minPlayers);
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onChangeNumPlayers", function (event) {
        _this.setState({
          numPlayers: Number.parseInt(event.target.value)
        });
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onChangeSelectedGame", function (event) {
        var idx = Number.parseInt(event.target.value);

        _this.setState({
          selectedGame: idx,
          numPlayers: _this.props.games[idx].game.minPlayers
        });
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onClickCreate", function () {
        _this.props.createGame(_this.props.games[_this.state.selectedGame].game.name, _this.state.numPlayers);
      });

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = props.games[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var game = _step.value;
          var game_details = game.game;

          if (!game_details.minPlayers) {
            game_details.minPlayers = 1;
          }

          if (!game_details.maxPlayers) {
            game_details.maxPlayers = 4;
          }

          console.assert(game_details.maxPlayers >= game_details.minPlayers);
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

      _this.state = {
        selectedGame: 0,
        numPlayers: props.games[0].game.minPlayers
      };
      return _this;
    }

    _createClass(LobbyCreateRoomForm, [{
      key: "render",
      value: function render() {
        var _this2 = this;

        return React.createElement("div", null, React.createElement("select", {
          value: this.state.selectedGame,
          onChange: function onChange(evt) {
            return _this2.onChangeSelectedGame(evt);
          }
        }, this.props.games.map(this._createGameNameOption)), React.createElement("span", null, "Players:"), React.createElement("select", {
          value: this.state.numPlayers,
          onChange: this.onChangeNumPlayers
        }, this._createNumPlayersRange(this.props.games[this.state.selectedGame].game).map(this._createNumPlayersOption)), React.createElement("span", {
          className: "buttons"
        }, React.createElement("button", {
          onClick: this.onClickCreate
        }, "Create")));
      }
    }]);

    return LobbyCreateRoomForm;
  }(React.Component);

  _defineProperty(LobbyCreateRoomForm, "propTypes", {
    games: PropTypes.array.isRequired,
    createGame: PropTypes.func.isRequired
  });

  var LobbyPhases = {
    ENTER: 'enter',
    PLAY: 'play',
    LIST: 'list'
  };
  /**
   * Lobby
   *
   * React lobby component.
   *
   * @param {Array}  gameComponents - An array of Board and Game objects for the supported games.
   * @param {string} lobbyServer - Address of the lobby server (for example 'localhost:8000').
   *                               If not set, defaults to the server that served the page.
   * @param {string} gameServer - Address of the game server (for example 'localhost:8001').
   *                              If not set, defaults to the server that served the page.
   * @param {function} clientFactory - Function that is used to create the game clients.
   * @param {bool}   debug - Enable debug information (default: false).
   *
   * Returns:
   *   A React component that provides a UI to create, list, join, leave, play or spectate game instances.
   */

  var Lobby =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(Lobby, _React$Component);

    function Lobby(_props) {
      var _this;

      _classCallCheck(this, Lobby);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Lobby).call(this, _props));

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
        phase: LobbyPhases.ENTER,
        playerName: 'Visitor',
        runningGame: null,
        errorMsg: '',
        credentialStore: {}
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_createConnection", function (props) {
        var name = _this.state.playerName;
        _this.connection = LobbyConnection({
          server: props.lobbyServer,
          gameComponents: props.gameComponents,
          playerName: name,
          playerCredentials: _this.state.credentialStore[name]
        });
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_updateCredentials", function (playerName, credentials) {
        _this.setState(function (prevState) {
          // clone store or componentDidUpdate will not be triggered
          var store = Object.assign({}, prevState.credentialStore);
          store[[playerName]] = credentials;
          return {
            credentialStore: store
          };
        });
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_updateConnection", async function () {
        await _this.connection.refresh();

        _this.forceUpdate();
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_enterLobby", function (playerName) {
        _this.setState({
          playerName: playerName,
          phase: LobbyPhases.LIST
        });
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_exitLobby", async function () {
        await _this.connection.disconnect();

        _this.setState({
          phase: LobbyPhases.ENTER,
          errorMsg: ''
        });
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_createRoom", async function (gameName, numPlayers) {
        try {
          await _this.connection.create(gameName, numPlayers);
          await _this.connection.refresh(); // rerender

          _this.setState({});
        } catch (error) {
          _this.setState({
            errorMsg: error.message
          });
        }
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_joinRoom", async function (gameName, gameID, playerID) {
        try {
          await _this.connection.join(gameName, gameID, playerID);
          await _this.connection.refresh();

          _this._updateCredentials(_this.connection.playerName, _this.connection.playerCredentials);
        } catch (error) {
          _this.setState({
            errorMsg: error.message
          });
        }
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_leaveRoom", async function (gameName, gameID) {
        try {
          await _this.connection.leave(gameName, gameID);
          await _this.connection.refresh();

          _this._updateCredentials(_this.connection.playerName, _this.connection.playerCredentials);
        } catch (error) {
          _this.setState({
            errorMsg: error.message
          });
        }
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_startGame", function (gameName, gameOpts) {
        var gameCode = _this.connection._getGameComponents(gameName);

        if (!gameCode) {
          _this.setState({
            errorMsg: 'game ' + gameName + ' not supported'
          });

          return;
        }

        var multiplayer = undefined;

        if (gameOpts.numPlayers > 1) {
          if (_this.props.gameServer) {
            multiplayer = {
              server: _this.props.gameServer
            };
          } else {
            multiplayer = true;
          }
        }

        var app = _this.props.clientFactory({
          game: gameCode.game,
          board: gameCode.board,
          debug: _this.props.debug,
          multiplayer: multiplayer
        });

        var game = {
          app: app,
          gameID: gameOpts.gameID,
          playerID: gameOpts.numPlayers > 1 ? gameOpts.playerID : null,
          credentials: _this.connection.playerCredentials
        };

        _this.setState({
          phase: LobbyPhases.PLAY,
          runningGame: game
        });
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_exitRoom", function () {
        _this.setState({
          phase: LobbyPhases.LIST,
          runningGame: null
        });
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_getPhaseVisibility", function (phase) {
        return _this.state.phase !== phase ? 'hidden' : 'phase';
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "renderRooms", function (rooms, playerName) {
        return rooms.map(function (room) {
          var gameID = room.gameID,
              gameName = room.gameName,
              players = room.players;
          return React.createElement(LobbyRoomInstance, {
            key: 'instance-' + gameID,
            room: {
              gameID: gameID,
              gameName: gameName,
              players: Object.values(players)
            },
            playerName: playerName,
            onClickJoin: _this._joinRoom,
            onClickLeave: _this._leaveRoom,
            onClickPlay: _this._startGame
          });
        });
      });

      _this._createConnection(_this.props);

      _this._updateConnection();

      return _this;
    }

    _createClass(Lobby, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        var cookie = Cookies.load('lobbyState') || {};

        if (cookie.phase && cookie.phase === LobbyPhases.PLAY) {
          cookie.phase = LobbyPhases.LIST;
        }

        this.setState({
          phase: cookie.phase || LobbyPhases.ENTER,
          playerName: cookie.playerName || 'Visitor',
          credentialStore: cookie.credentialStore || {}
        });
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps, prevState) {
        var name = this.state.playerName;
        var creds = this.state.credentialStore[name];

        if (prevState.phase !== this.state.phase || prevState.credentialStore[name] !== creds || prevState.playerName !== name) {
          this._createConnection(this.props);

          this._updateConnection();

          var cookie = {
            phase: this.state.phase,
            playerName: name,
            credentialStore: this.state.credentialStore
          };
          Cookies.save('lobbyState', cookie, {
            path: '/'
          });
        }
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props = this.props,
            gameComponents = _this$props.gameComponents,
            renderer = _this$props.renderer;
        var _this$state = this.state,
            errorMsg = _this$state.errorMsg,
            playerName = _this$state.playerName,
            phase = _this$state.phase,
            runningGame = _this$state.runningGame;

        if (renderer) {
          return renderer({
            errorMsg: errorMsg,
            gameComponents: gameComponents,
            rooms: this.connection.rooms,
            phase: phase,
            playerName: playerName,
            runningGame: runningGame,
            handleEnterLobby: this._enterLobby,
            handleExitLobby: this._exitLobby,
            handleCreateRoom: this._createRoom,
            handleJoinRoom: this._joinRoom,
            handleLeaveRoom: this._leaveRoom,
            handleExitRoom: this._exitRoom,
            handleRefreshRooms: this._updateConnection,
            handleStartGame: this._startGame
          });
        }

        return React.createElement("div", {
          id: "lobby-view",
          style: {
            padding: 50
          }
        }, React.createElement("div", {
          className: this._getPhaseVisibility(LobbyPhases.ENTER)
        }, React.createElement(LobbyLoginForm, {
          key: playerName,
          playerName: playerName,
          onEnter: this._enterLobby
        })), React.createElement("div", {
          className: this._getPhaseVisibility(LobbyPhases.LIST)
        }, React.createElement("p", null, "Welcome, ", playerName), React.createElement("div", {
          className: "phase-title",
          id: "game-creation"
        }, React.createElement("span", null, "Create a room:"), React.createElement(LobbyCreateRoomForm, {
          games: gameComponents,
          createGame: this._createRoom
        })), React.createElement("p", {
          className: "phase-title"
        }, "Join a room:"), React.createElement("div", {
          id: "instances"
        }, React.createElement("table", null, React.createElement("tbody", null, this.renderRooms(this.connection.rooms, playerName))), React.createElement("span", {
          className: "error-msg"
        }, errorMsg, React.createElement("br", null))), React.createElement("p", {
          className: "phase-title"
        }, "Rooms that become empty are automatically deleted.")), React.createElement("div", {
          className: this._getPhaseVisibility(LobbyPhases.PLAY)
        }, runningGame && React.createElement(runningGame.app, {
          gameID: runningGame.gameID,
          playerID: runningGame.playerID,
          credentials: runningGame.credentials
        }), React.createElement("div", {
          className: "buttons",
          id: "game-exit"
        }, React.createElement("button", {
          onClick: this._exitRoom
        }, "Exit game"))), React.createElement("div", {
          className: "buttons",
          id: "lobby-exit"
        }, React.createElement("button", {
          onClick: this._exitLobby
        }, "Exit lobby")));
      }
    }]);

    return Lobby;
  }(React.Component);

  _defineProperty(Lobby, "propTypes", {
    gameComponents: PropTypes.array.isRequired,
    lobbyServer: PropTypes.string,
    gameServer: PropTypes.string,
    debug: PropTypes.bool,
    clientFactory: PropTypes.func
  });

  _defineProperty(Lobby, "defaultProps", {
    debug: false,
    clientFactory: Client$1
  });

  /*
   * Copyright 2017 The boardgame.io Authors
   *
   * Use of this source code is governed by a MIT-style
   * license that can be found in the LICENSE file or at
   * https://opensource.org/licenses/MIT.
   */

  exports.Client = Client$1;
  exports.Lobby = Lobby;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
