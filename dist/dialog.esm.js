/*!
 * Dialog.js v1.0.0
 * https://lzread.github.io/dialog
 *
 * Copyright 2020-present lzread
 * Released under the MIT license
 *
 * Date: 2020-12-23T07:39:08.247Z
 */

function _typeof(obj) {
  "@babel/helpers - typeof";

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

var DEFAULTS = {
  title: '提示',
  width: '500px',
  height: 'auto',
  fullscreen: false,
  customClass: '',
  showClose: true,
  showToggle: false,
  modal: true,
  drag: false,
  closeOnClickModal: false,
  footer: true,
  cancelButtonText: "取消",
  submitButtonText: "确定",
  cancelCallBack: function cancelCallBack(element) {
    return true;
  },
  submitCallBack: function submitCallBack(element) {
    return true;
  },
  beforeClose: function beforeClose(element) {
    return true;
  }
};

var dialogTemplate = {
  dialogTemplate: function dialogTemplate() {
    return "\n        <div class=\"__dialog ".concat(this.options.customClass, "\">\n            <div class=\"__dialog-mask\" ").concat(this.options.closeOnClickModal ? 'data-dialog-action="close"' : '', " ").concat(this.options.modal ? '' : 'style="display:none;"', "></div>\n            <div class=\"__dialog-container ").concat(this.options.fullscreen ? '__dialog-fullscreen' : '', "\">\n                <div class=\"__dialog-header\">\n                    <div class=\"__dialog-header-title\"> ").concat(this.options.title, " </div>\n                    <div data-role=\"button\" class=\"__dialog-button\" data-dialog-action=\"toogle\" ").concat(this.options.showToggle ? '' : 'style="display:none;"', "></div>\n                    <div data-role=\"button\" class=\"__dialog-button\" data-dialog-action=\"close\" ").concat(this.options.showClose ? '' : 'style="display:none;"', "></div>\n                </div>\n                <div class=\"__dialog-body\">\n                    <div class=\"__dialog-body-inner\">\n                        ").concat(this.options.body, "\n                    </div>\n                </div>\n                <div class=\"__dialog-footer\">\n                    <div class=\"__dialog-footer-inner\">\n                        <div data-role=\"button\" class=\"__dialog-button\" data-dialog-action=\"cancel\"> ").concat(this.options.cancelButtonText, " </div>\n                        <div data-role=\"button\" class=\"__dialog-button\" data-dialog-action=\"submit\"> ").concat(this.options.submitButtonText, " </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n        ");
  }
};

var render = {
  render: function render() {
    var options = this.options,
        container = this.container;
    var width, height;

    if (options.width.includes("px")) {
      container.style.width = options.width;
      width = options.width.replace("px", "");
      container.style.left = window.innerWidth / 2 - width / 2 + 'px';
    } else if (options.width.includes("%")) {
      container.style.width = options.width;
      width = options.width.replace("%", "");
      container.style.left = width / 2 + '%';
    } else {
      width = options.width;
      container.style.width = options.width + 'px';
      container.style.left = window.innerWidth / 2 - width / 2 + 'px';
    }

    if (options.height.includes("px")) {
      container.style.height = options.height;
      height = options.height.replace("px", "");
      container.style.top = window.innerHeight / 2 - height / 2 + 'px';
    } else if (options.height.includes("%")) {
      container.style.height = options.height;
      height = options.height.replace("%", "");
      container.style.top = height / 2 + '%';
    } else if (options.height.includes("auto")) {
      container.style.maxHeight = '80%';
      container.style.height = "auto";
      container.style.top = '10%';
    } else {
      height = options.height;
      container.style.height = options.height + 'px';
      container.style.top = window.innerHeight / 2 - height / 2 + 'px';
    }
  }
};

var IS_BROWSER = typeof window !== 'undefined' && typeof window.document !== 'undefined';
var WINDOW = IS_BROWSER ? window : {};
/**
 * Check if the given value is not a number.
 */

var isNaN = Number.isNaN || WINDOW.isNaN;
/**
 * Check if the given value is a number.
 * @param {*} value - The value to check.
 * @returns {boolean} Returns `true` if the given value is a number, else `false`.
 */

function isNumber(value) {
  return typeof value === 'number' && !isNaN(value);
}
/**
 * Check if the given value is an object.
 * @param {*} value - The value to check.
 * @returns {boolean} Returns `true` if the given value is an object, else `false`.
 */

function isObject(value) {
  return _typeof(value) === 'object' && value !== null;
}
var hasOwnProperty = Object.prototype.hasOwnProperty;
/**
 * Check if the given value is a plain object.
 * @param {*} value - The value to check.
 * @returns {boolean} Returns `true` if the given value is a plain object, else `false`.
 */

function isPlainObject(value) {
  if (!isObject(value)) {
    return false;
  }

  try {
    var _constructor = value.constructor;
    var prototype = _constructor.prototype;
    return _constructor && prototype && hasOwnProperty.call(prototype, 'isPrototypeOf');
  } catch (error) {
    return false;
  }
}
/**
 * Check if the given value is a function.
 * @param {*} value - The value to check.
 * @returns {boolean} Returns `true` if the given value is a function, else `false`.
 */

function isFunction(value) {
  return typeof value === 'function';
}
/**
 * Extend the given object.
 * @param {*} obj - The object to be extended.
 * @param {*} args - The rest objects which will be merged to the first object.
 * @returns {Object} The extended object.
 */

var assign = Object.assign || function assign(obj) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  if (isObject(obj) && args.length > 0) {
    args.forEach(function (arg) {
      if (isObject(arg)) {
        Object.keys(arg).forEach(function (key) {
          obj[key] = arg[key];
        });
      }
    });
  }

  return obj;
};
/**
 * Iterate the given data.
 * @param {*} data - The data to iterate.
 * @param {Function} callback - The process function for each element.
 * @returns {*} The original data.
 */

function forEach(data, callback) {
  if (data && isFunction(callback)) {
    if (Array.isArray(data) || isNumber(data.length)
    /* array-like */
    ) {
        var length = data.length;
        var i;

        for (i = 0; i < length; i += 1) {
          if (callback.call(data, data[i], i, data) === false) {
            break;
          }
        }
      } else if (isObject(data)) {
      Object.keys(data).forEach(function (key) {
        callback.call(data, data[key], key, data);
      });
    }
  }

  return data;
}
/**
 * Check if the given element has a special class.
 * @param {Element} element - The element to check.
 * @param {string} value - The class to search.
 * @returns {boolean} Returns `true` if the special class was found.
 */

function hasClass(element, value) {
  if (!element || !value) {
    return false;
  }

  return element.classList ? element.classList.contains(value) : element.className.indexOf(value) > -1;
}
/**
 * Add classes to the given element.
 * @param {Element} element - The target element.
 * @param {string} value - The classes to be added.
 */

function addClass(element, value) {
  if (!element || !value) {
    return;
  }

  if (isNumber(element.length)) {
    forEach(element, function (elem) {
      addClass(elem, value);
    });
    return;
  }

  if (element.classList) {
    element.classList.add(value);
    return;
  }

  var className = element.className.trim();

  if (!className) {
    element.className = value;
  } else if (className.indexOf(value) < 0) {
    element.className = "".concat(className, " ").concat(value);
  }
}
/**
 * Remove classes from the given element.
 * @param {Element} element - The target element.
 * @param {string} value - The classes to be removed.
 */

function removeClass(element, value) {
  if (!element || !value) {
    return;
  }

  if (isNumber(element.length)) {
    forEach(element, function (elem) {
      removeClass(elem, value);
    });
    return;
  }

  if (element.classList) {
    element.classList.remove(value);
    return;
  }

  if (element.className.indexOf(value) >= 0) {
    element.className = element.className.replace(value, '');
  }
}
/**
 * Remove event listener from the target element.
 * @param {Element} element - The event target.
 * @param {string} type - The event type(s).
 * @param {Function} listener - The event listener.
 * @param {Object} options - The event options.
 */

function removeListener(element, type, listener) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var handler = listener;
  type.trim().split(/\s\s*/).forEach(function (event) {
    if (!onceSupported) {
      var listeners = element.listeners;

      if (listeners && listeners[event] && listeners[event][listener]) {
        handler = listeners[event][listener];
        delete listeners[event][listener];

        if (Object.keys(listeners[event]).length === 0) {
          delete listeners[event];
        }

        if (Object.keys(listeners).length === 0) {
          delete element.listeners;
        }
      }
    }

    element.removeEventListener(event, handler, options);
  });
}
/**
 * Add event listener to the target element.
 * @param {Element} element - The event target.
 * @param {string} type - The event type(s).
 * @param {Function} listener - The event listener.
 * @param {Object} options - The event options.
 */

function addListener(element, type, listener) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var _handler = listener;
  type.trim().split(/\s\s*/).forEach(function (event) {
    if (options.once && !onceSupported) {
      var _element$listeners = element.listeners,
          listeners = _element$listeners === void 0 ? {} : _element$listeners;

      _handler = function handler() {
        delete listeners[event][listener];
        element.removeEventListener(event, _handler, options);

        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        listener.apply(element, args);
      };

      if (!listeners[event]) {
        listeners[event] = {};
      }

      if (listeners[event][listener]) {
        element.removeEventListener(event, listeners[event][listener], options);
      }

      listeners[event][listener] = _handler;
      element.listeners = listeners;
    }

    element.addEventListener(event, _handler, options);
  });
}
/**
 * Get data from the given element.
 * @param {Element} element - The target element.
 * @param {string} name - The data key to get.
 * @returns {string} The data value.
 */

function getData(element, name) {
  return element.getAttribute("data-".concat(hyphenate(name)));
}
function hyphenate(value) {
  return value.replace(/\s\s*/, '$1-$2').toLowerCase();
}

var onceSupported = function () {
  var supported = false;

  if (IS_BROWSER) {
    var once = false;

    var listener = function listener() {};

    var options = Object.defineProperty({}, 'once', {
      get: function get() {
        supported = true;
        return once;
      },

      /**
       * This setter can fix a `TypeError` in strict mode
       * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Getter_only}
       * @param {boolean} value - The value to set
       */
      set: function set(value) {
        once = value;
      }
    });
    WINDOW.addEventListener('test', listener, options);
    WINDOW.removeEventListener('test', listener, options);
  }

  return supported;
}();

var methods = {
  show: function show() {
    this.dialog.style.display = 'block';
    this.isShow = true;
    this.bind();
    this.render();

    if (this.options.fullscreen) {
      this.fullscreen();
    }
  },
  hide: function hide() {
    this.dialog.style.display = 'none';
    this.isShow = false;
    this.unbind();
    this.reset();
  },
  min: function min() {
    this.render();
  },
  max: function max() {
    var container = this.container;
    container.style.left = 0;
    container.style.top = 0;
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.maxHeight = '';
  },
  fullscreen: function fullscreen() {
    var button = this.button;
    this.max();
    forEach(button, function (e, i) {
      if (getData(e, 'dialog-action') == 'toogle') {
        addClass(e, 'isActive');
      }
    });
  },
  reset: function reset() {
    var button = this.button;
    forEach(button, function (e, i) {
      removeClass(e, 'isActive');
    });
    this.render();
  }
};

var events = {
  bind: function bind() {
    var options = this.options,
        dialog = this.dialog,
        mask = this.mask,
        header = this.header;
    addListener(dialog, 'click', this.onClick = this.click.bind(this));
    addListener(window, 'resize', this.onResize = this.resize.bind(this));

    if (options.drag) {
      addListener(header, 'mousedown', this.onmousedown = this.mousedown.bind(this));
      addListener(document, 'mousemove', this.onmousemove = this.mousemove.bind(this));
      addListener(document, 'mouseup', this.onmouseup = this.mouseup.bind(this));
    }
  },
  unbind: function unbind() {
    var options = this.options,
        dialog = this.dialog,
        header = this.header;
    removeListener(dialog, 'click', this.onClick);
    removeListener(window, 'resize', this.onResize);

    if (options.drag) {
      removeListener(header, 'mousedown', this.onmousedown);
      removeListener(document, 'mousemove', this.onmousemove);
      removeListener(document, 'mouseup', this.onmouseup);
    }
  }
};

var handlers = {
  click: function click(event) {
    var target = event.target;
    var options = this.options;
    var action = getData(target, 'dialog-action');

    switch (action) {
      case 'toogle':
        if (hasClass(target, 'isActive')) {
          removeClass(target, 'isActive');
          this.min();
        } else {
          addClass(target, 'isActive');
          this.max();
        }

        break;

      case 'close':
        if (options.beforeClose(this)) {
          this.hide();
        }

        break;

      case 'cancel':
        if (options.cancelCallBack(this)) {
          this.hide();
        }

        break;

      case 'submit':
        if (options.submitCallBack(this)) {
          this.hide();
        }

        break;
    }
  },
  dblclick: function dblclick(event) {
    event.preventDefault();
  },
  mousedown: function mousedown(event) {
    event.preventDefault();
    var container = this.container;
    this.clientX = event.clientX - container.offsetLeft;
    this.clientY = event.clientY - container.offsetTop;
    this.drag = true;
    return false;
  },
  mousemove: function mousemove(event) {
    event.preventDefault();

    if (!this.drag) {
      return;
    }

    var container = this.container;
    var x = event.clientX - this.clientX;
    var y = event.clientY - this.clientY;

    if (x < 0) {
      x = 0;
    } else if (x > document.documentElement.clientWidth - container.offsetWidth) {
      x = document.documentElement.clientWidth - container.offsetWidth;
    }

    if (y < 0) {
      y = 0;
    } else if (y > document.documentElement.clientHeight - container.offsetHeight) {
      y = document.documentElement.clientHeight - container.offsetHeight;
    }

    container.style.left = x + "px";
    container.style.top = y + "px";
    return false;
  },
  mouseup: function mouseup(event) {
    event.preventDefault();
    this.drag = false;
  },
  resize: function resize() {
    this.render();
  }
};

var Dialog = /*#__PURE__*/function () {
  function Dialog(element) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Dialog);

    if (!element || element.nodeType !== 1) {
      throw new Error('The first argument is required and must be an element.');
    }

    this.element = element;
    this.options = assign({}, DEFAULTS, isPlainObject(options) && options);
    this.init();
  }

  _createClass(Dialog, [{
    key: "init",
    value: function init() {
      var element = this.element,
          options = this.options;
      var isDiv = element.tagName.toLowerCase() === 'div';

      if (!isDiv) {
        throw new Error('The element must be div.');
      }

      this.bulid();
    }
  }, {
    key: "bulid",
    value: function bulid() {
      var element = this.element,
          options = this.options;
      var template = document.createElement('div');
      options.body = element.innerHTML;
      element.parentNode.removeChild(element);
      template.innerHTML = this.dialogTemplate();
      var dialog = template.querySelector(".__dialog");
      var mask = template.querySelector(".__dialog-mask");
      var container = dialog.querySelector(".__dialog-container");
      var header = dialog.querySelector(".__dialog-header");
      var body = dialog.querySelector(".__dialog-body-inner");
      var footer = dialog.querySelector(".__dialog-footer-inner");
      var title = header.querySelector(".__dialog-header-title");
      var button = dialog.querySelectorAll(".__dialog-button");

      if (!options.footer) {
        footer.parentNode.removeChild(footer);
      }

      this.dialog = dialog;
      this.mask = mask;
      this.container = container;
      this.header = header;
      this.body = body;
      this.footer = footer;
      this.title = title;
      this.button = button;
      this.render();
      document.body.appendChild(dialog);
    }
  }]);

  return Dialog;
}();

assign(Dialog.prototype, render, methods, events, handlers, dialogTemplate);

export default Dialog;
//# sourceMappingURL=dialog.esm.js.map
