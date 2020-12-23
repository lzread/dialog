export const IS_BROWSER = typeof window !== 'undefined' && typeof window.document !== 'undefined';
export const WINDOW = IS_BROWSER ? window : {};
/**
 * Check if the given value is a string.
 * @param {*} value - The value to check.
 * @returns {boolean} Returns `true` if the given value is a string, else `false`.
 */
export function isString(value) {
    return typeof value === 'string';
}

/**
 * Check if the given value is not a number.
 */
export const isNaN = Number.isNaN || WINDOW.isNaN;

/**
 * Check if the given value is a number.
 * @param {*} value - The value to check.
 * @returns {boolean} Returns `true` if the given value is a number, else `false`.
 */
export function isNumber(value) {
    return typeof value === 'number' && !isNaN(value);
}

/**
 * Check if the given value is undefined.
 * @param {*} value - The value to check.
 * @returns {boolean} Returns `true` if the given value is undefined, else `false`.
 */
export function isUndefined(value) {
    return typeof value === 'undefined';
}

/**
 * Check if the given value is an object.
 * @param {*} value - The value to check.
 * @returns {boolean} Returns `true` if the given value is an object, else `false`.
 */
export function isObject(value) {
    return typeof value === 'object' && value !== null;
}

const { hasOwnProperty } = Object.prototype;

/**
 * Check if the given value is a plain object.
 * @param {*} value - The value to check.
 * @returns {boolean} Returns `true` if the given value is a plain object, else `false`.
 */
export function isPlainObject(value) {
    if (!isObject(value)) {
        return false;
    }

    try {
        const { constructor } = value;
        const { prototype } = constructor;

        return constructor && prototype && hasOwnProperty.call(prototype, 'isPrototypeOf');
    } catch (error) {
        return false;
    }
}

/**
 * Check if the given value is a function.
 * @param {*} value - The value to check.
 * @returns {boolean} Returns `true` if the given value is a function, else `false`.
 */
export function isFunction(value) {
    return typeof value === 'function';
}
/**
 * Extend the given object.
 * @param {*} obj - The object to be extended.
 * @param {*} args - The rest objects which will be merged to the first object.
 * @returns {Object} The extended object.
 */
export const assign = Object.assign || function assign(obj, ...args) {
    if (isObject(obj) && args.length > 0) {
        args.forEach((arg) => {
            if (isObject(arg)) {
                Object.keys(arg).forEach((key) => {
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
export function forEach(data, callback) {
    if (data && isFunction(callback)) {
        if (Array.isArray(data) || isNumber(data.length)/* array-like */) {
            const { length } = data;
            let i;

            for (i = 0; i < length; i += 1) {
                if (callback.call(data, data[i], i, data) === false) {
                    break;
                }
            }
        } else if (isObject(data)) {
            Object.keys(data).forEach((key) => {
                callback.call(data, data[key], key, data);
            });
        }
    }

    return data;
}
/**
 * Apply styles to the given element.
 * @param {Element} element - The target element.
 * @param {Object} styles - The styles for applying.
 */
export function setStyle(element, styles) {
    const { style } = element;

    forEach(styles, (value, property) => {
        if (REGEXP_SUFFIX.test(property) && isNumber(value)) {
            value += 'px';
        }

        style[property] = value;
    });
}
/**
 * Check if the given element has a special class.
 * @param {Element} element - The element to check.
 * @param {string} value - The class to search.
 * @returns {boolean} Returns `true` if the special class was found.
 */
export function hasClass(element, value) {
    if (!element || !value) {
        return false;
    }

    return element.classList
        ? element.classList.contains(value)
        : element.className.indexOf(value) > -1;
}

/**
 * Add classes to the given element.
 * @param {Element} element - The target element.
 * @param {string} value - The classes to be added.
 */
export function addClass(element, value) {
    if (!element || !value) {
        return;
    }

    if (isNumber(element.length)) {
        forEach(element, (elem) => {
            addClass(elem, value);
        });
        return;
    }

    if (element.classList) {
        element.classList.add(value);
        return;
    }

    const className = element.className.trim();

    if (!className) {
        element.className = value;
    } else if (className.indexOf(value) < 0) {
        element.className = `${className} ${value}`;
    }
}

/**
 * Remove classes from the given element.
 * @param {Element} element - The target element.
 * @param {string} value - The classes to be removed.
 */
export function removeClass(element, value) {
    if (!element || !value) {
        return;
    }

    if (isNumber(element.length)) {
        forEach(element, (elem) => {
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
 * Add or remove classes from the given element.
 * @param {Element} element - The target element.
 * @param {string} value - The classes to be toggled.
 * @param {boolean} added - Add only.
 */
export function toggleClass(element, value, added) {
    if (!value) {
        return;
    }

    if (isNumber(element.length)) {
        forEach(element, (elem) => {
            toggleClass(elem, value, added);
        });
        return;
    }

    // IE10-11 doesn't support the second parameter of `classList.toggle`
    if (added) {
        addClass(element, value);
    } else {
        removeClass(element, value);
    }
}

/**
 * Remove event listener from the target element.
 * @param {Element} element - The event target.
 * @param {string} type - The event type(s).
 * @param {Function} listener - The event listener.
 * @param {Object} options - The event options.
 */
export function removeListener(element, type, listener, options = {}) {
    let handler = listener;

    type.trim().split(/\s\s*/).forEach((event) => {
        if (!onceSupported) {
            const { listeners } = element;

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
export function addListener(element, type, listener, options = {}) {
    let handler = listener;

    type.trim().split(/\s\s*/).forEach((event) => {
        if (options.once && !onceSupported) {
            const { listeners = {} } = element;

            handler = (...args) => {
                delete listeners[event][listener];
                element.removeEventListener(event, handler, options);
                listener.apply(element, args);
            };

            if (!listeners[event]) {
                listeners[event] = {};
            }

            if (listeners[event][listener]) {
                element.removeEventListener(event, listeners[event][listener], options);
            }

            listeners[event][listener] = handler;
            element.listeners = listeners;
        }

        element.addEventListener(event, handler, options);
    });
}

/**
 * Dispatch event on the target element.
 * @param {Element} element - The event target.
 * @param {string} type - The event type(s).
 * @param {Object} data - The additional event data.
 * @param {Object} options - The additional event options.
 * @returns {boolean} Indicate if the event is default prevented or not.
 */
export function dispatchEvent(element, type, data, options) {
    let event;

    // Event and CustomEvent on IE9-11 are global objects, not constructors
    if (isFunction(Event) && isFunction(CustomEvent)) {
        event = new CustomEvent(type, {
            bubbles: true,
            cancelable: true,
            detail: data,
            ...options,
        });
    } else {
        event = document.createEvent('CustomEvent');
        event.initCustomEvent(type, true, true, data);
    }

    return element.dispatchEvent(event);
}

/**
 * Get data from the given element.
 * @param {Element} element - The target element.
 * @param {string} name - The data key to get.
 * @returns {string} The data value.
 */
export function getData(element, name) {
    return element.getAttribute(`data-${hyphenate(name)}`);
}

/**
 * Set data to the given element.
 * @param {Element} element - The target element.
 * @param {string} name - The data key to set.
 * @param {string} data - The data value.
 */
export function setData(element, name, data) {
    element.setAttribute(`data-${hyphenate(name)}`, data);
}

/**
 * Remove data from the given element.
 * @param {Element} element - The target element.
 * @param {string} name - The data key to remove.
 */
export function removeData(element, name) {
    if (isObject(element[name])) {
        try {
            delete element[name];
        } catch (error) {
            element[name] = undefined;
        }
    } else if (element.dataset) {
        // #128 Safari not allows to delete dataset property
        try {
            delete element.dataset[name];
        } catch (error) {
            element.dataset[name] = undefined;
        }
    } else {
        element.removeAttribute(`data-${hyphenate(name)}`);
    }
}

export function hyphenate(value) {
    return value.replace(/\s\s*/, '$1-$2').toLowerCase();
}

const onceSupported = (() => {
    let supported = false;
  
    if (IS_BROWSER) {
      let once = false;
      const listener = () => {};
      const options = Object.defineProperty({}, 'once', {
        get() {
          supported = true;
          return once;
        },
  
        /**
         * This setter can fix a `TypeError` in strict mode
         * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Getter_only}
         * @param {boolean} value - The value to set
         */
        set(value) {
          once = value;
        },
      });
  
      WINDOW.addEventListener('test', listener, options);
      WINDOW.removeEventListener('test', listener, options);
    }
  
    return supported;
  })();
  