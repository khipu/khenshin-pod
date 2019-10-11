(function(f){var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.KhenshinHelper = f()})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(_dereq_,module,exports){
        "use strict";
        var __assign = (this && this.__assign) || function () {
            __assign = Object.assign || function(t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
                }
                return t;
            };
            return __assign.apply(this, arguments);
        };
        var __importDefault = (this && this.__importDefault) || function (mod) {
            return (mod && mod.__esModule) ? mod : { "default": mod };
        };
        Object.defineProperty(exports, "__esModule", { value: true });
        var Encoder_1 = __importDefault(_dereq_("./Encoder"));
        var Logger_1 = _dereq_("./Logger");
        var Capture = /** @class */ (function () {
            function Capture() {
                this._isHead = true;
                this._classMap = {};
                this._classCount = 0;
                this._shouldHandleImgDataUrl = true;
                this._logger = new Logger_1.Logger();
                this._isHead = true;
                this._classMap = {};
                this._classCount = 0;
                this._shouldHandleImgDataUrl = true;
                this._doc = document;
                this._canvas = this._doc.createElement('canvas');
                this._ctx = this._canvas.getContext('2d');
                this._options = {
                    tagsOfIgnoredDocHeadElements: ['script', 'link', 'style'],
                    tagsOfIgnoredDocBodyElements: ['script'],
                    classesOfIgnoredDocBodyElements: [],
                    attrKeyValuePairsOfIgnoredElements: {},
                    tagsOfSkippedElementsForChildTreeCssHandling: ['svg'],
                    attrKeyForSavingElementOrigClass: '_class',
                    attrKeyForSavingElementOrigStyle: '_style',
                    prefixForNewGeneratedClasses: 'c',
                    imageFormatForDataUrl: 'image/png',
                    imageQualityForDataUrl: 0.92,
                    rulesToAddToDocStyle: [],
                    logLevel: 'warn',
                };
            }
            Capture._getClassName = function (domElm) {
                var classes = domElm.className;
                return classes instanceof SVGAnimatedString ? classes.baseVal : classes;
            };
            Capture._handleElmValue = function (domElm, newElm) {
                if (domElm.tagName.toLowerCase() === 'input' && domElm.getAttribute('type') === 'text') {
                    newElm.setAttribute('value', domElm.getAttribute('value') || '');
                }
                else if (domElm.tagName.toLowerCase() === 'select' && domElm.children) {
                    newElm.setAttribute('value', domElm.getAttribute('value') || '');
                    for (var i = domElm.children.length - 1; i >= 0; i--) {
                        if (domElm.children[i].getAttribute('value') === (domElm.getAttribute('value') || '')) {
                            newElm.children[i].setAttribute('selected', '');
                        }
                        else {
                            newElm.children[i].removeAttribute('selected');
                        }
                    }
                }
            };
            Capture._isFrame = function (domElm) {
                return domElm instanceof HTMLFrameElement
                    || domElm instanceof HTMLIFrameElement
                    || domElm.tagName.toLowerCase() === 'frame'
                    || domElm.tagName.toLowerCase() === 'iframe';
            };
            Capture.prototype.capture = function (outputType, htmlDocument, options) {
                var output = '';
                var startTime = (new Date()).getTime();
                try {
                    this._overrideOptions(options);
                    this._doc = htmlDocument || document;
                    this._logger.setLogLevel(this._options.logLevel);
                    this._logger.info("capture() outputType: " + outputType + " - start");
                    var newHtmlObject = this._getHtmlObject();
                    output = this._prepareOutput(newHtmlObject, outputType);
                }
                catch (ex) {
                    this._logger.error("capture() - error - " + ex.message);
                }
                finally {
                    this._logger.info("capture() - end - " + ((new Date()).getTime() - startTime) + "ms");
                }
                return output;
            };
            Capture.prototype._overrideOptions = function (options) {
                if (options) {
                    this._options = __assign({}, this._options, options);
                }
            };
            Capture.prototype._getImgDataUrl = function (imgElm) {
                var imgDataUrl = '';
                try {
                    if (!this._canvas) {
                        this._canvas = this._doc.createElement('canvas');
                        this._ctx = this._canvas.getContext('2d');
                    }
                    this._canvas.width = imgElm.clientWidth;
                    this._canvas.height = imgElm.clientHeight;
                    this._ctx.drawImage(imgElm, 0, 0);
                    imgDataUrl = this._canvas.toDataURL(this._options.imageFormatForDataUrl, this._options.imageQualityForDataUrl);
                }
                catch (ex) {
                    this._logger.warn("getImgDataUrl() - " + ex.message);
                    this._shouldHandleImgDataUrl = false;
                }
                return imgDataUrl;
            };
            Capture.prototype._getClasses = function (domElm) {
                var classes = [];
                var className = domElm.className instanceof SVGAnimatedString ? domElm.className.baseVal : domElm.className;
                if (className && className.length > 0) {
                    var classNames = className.split(' ');
                    classNames.forEach(function (c) {
                        if (c) {
                            classes.push(c);
                        }
                    });
                }
                return classes;
            };
            Capture.prototype._handleElmCss = function (domElm, newElm) {
                // Ignoramos clases css de tag html
                if (newElm.tagName.toLowerCase() === 'html') {
                    return;
                }
                if (this._getClasses(newElm).length > 0) {
                    if (this._options.attrKeyForSavingElementOrigClass) {
                        newElm.setAttribute(this._options.attrKeyForSavingElementOrigClass, Capture._getClassName(newElm));
                    }
                    newElm.removeAttribute('class');
                }
                if (newElm.getAttribute('style')) {
                    if (this._options.attrKeyForSavingElementOrigStyle) {
                        var style = newElm.getAttribute('style') || '';
                        newElm.setAttribute(this._options.attrKeyForSavingElementOrigStyle, style);
                    }
                    newElm.removeAttribute('style');
                }
                var computedStyle = getComputedStyle(domElm);
                var classStr = '';
                for (var i = 0; i < computedStyle.length; i++) {
                    var property = computedStyle.item(i);
                    var value = computedStyle.getPropertyValue(property);
                    if (property == null || value == null || property.trim().length === 0 || value.trim().length === 0) {
                        continue;
                    }
                    if (Capture.excludedComputedCssProperties.indexOf(property) >= 0) {
                        continue;
                    }
                    var mapKey = property + ':' + value;
                    var className = this._classMap[mapKey];
                    if (!className) {
                        this._classCount++;
                        className = (this._options.prefixForNewGeneratedClasses ? this._options.prefixForNewGeneratedClasses : 'c') + this._classCount;
                        this._classMap[mapKey] = className;
                    }
                    classStr += (className + ' ');
                }
                if (classStr) {
                    var originalClasses = newElm.getAttribute(this._options.attrKeyForSavingElementOrigClass) || '';
                    newElm.setAttribute('class', originalClasses + ' ' + classStr.trim());
                }
            };
            Capture.prototype._appendNewStyle = function (newHtml) {
                // Type depends on the browser implementation, left as any to avoid issues
                var style = this._doc.createElement('style');
                style.type = 'text/css';
                var cssText = this._options.rulesToAddToDocStyle ? this._options.rulesToAddToDocStyle.join('') : '';
                for (var def in this._classMap) {
                    if (this._classMap.hasOwnProperty(def)) {
                        cssText += ('.' + this._classMap[def] + '{' + def + '}');
                    }
                }
                if (style.styleSheet) {
                    style.styleSheet.cssText = cssText;
                }
                else {
                    style.appendChild(this._doc.createTextNode(cssText));
                }
                newHtml.children[0].appendChild(style);
            };
            Capture.prototype._shouldIgnoreElm = function (domElm) {
                var _this = this;
                var shouldRemoveElm = false;
                if (this._isHead && this._options.tagsOfIgnoredDocHeadElements && this._options.tagsOfIgnoredDocHeadElements.indexOf(domElm.tagName.toLowerCase()) > -1 ||
                    !this._isHead && this._options.tagsOfIgnoredDocBodyElements && this._options.tagsOfIgnoredDocBodyElements.indexOf(domElm.tagName.toLowerCase()) > -1) {
                    shouldRemoveElm = true;
                }
                if (!shouldRemoveElm && this._options.attrKeyValuePairsOfIgnoredElements) {
                    for (var attrKey in this._options.attrKeyValuePairsOfIgnoredElements) {
                        if (this._options.attrKeyValuePairsOfIgnoredElements.hasOwnProperty(attrKey)) {
                            for (var _i = 0, _a = Array.from(domElm.attributes); _i < _a.length; _i++) {
                                var attribute = _a[_i];
                                if (attribute.specified && attribute.value === this._options.attrKeyValuePairsOfIgnoredElements[attrKey]) {
                                    shouldRemoveElm = true;
                                }
                            }
                        }
                    }
                }
                if (!shouldRemoveElm && !this._isHead && this._options.classesOfIgnoredDocBodyElements) {
                    var domElmClasses = this._getClasses(domElm);
                    domElmClasses.forEach(function (c) {
                        if (!shouldRemoveElm && _this._options.classesOfIgnoredDocBodyElements.indexOf(c) > -1) {
                            shouldRemoveElm = true;
                        }
                    });
                }
                return shouldRemoveElm;
            };
            Capture.prototype._recursiveWalk = function (domElm, newElm, handleCss) {
                if (this._shouldHandleImgDataUrl && !this._isHead && domElm.tagName.toLowerCase() === 'img') {
                    var imgDataUrl = this._getImgDataUrl(domElm);
                    if (imgDataUrl) {
                        newElm.setAttribute('src', imgDataUrl);
                    }
                }
                if (handleCss) {
                    this._handleElmCss(domElm, newElm);
                    if (this._options.tagsOfSkippedElementsForChildTreeCssHandling && this._options.tagsOfSkippedElementsForChildTreeCssHandling.indexOf(domElm.tagName.toLowerCase()) > -1) {
                        handleCss = false;
                    }
                }
                if (domElm instanceof HTMLInputElement && domElm.value) {
                    Capture._handleElmValue(domElm, newElm);
                }
                if (Capture._isFrame(domElm)) {
                    var src = domElm.getAttribute('name') || domElm.id;
                    if (src != null && src.length > 0) {
                        src += '.html';
                    }
                    newElm.setAttribute('src', src);
                }
                if (domElm.children) {
                    for (var i = domElm.children.length - 1; i >= 0; i--) {
                        if (this._shouldIgnoreElm(domElm.children[i])) {
                            newElm.removeChild(newElm.children[i]);
                        }
                        else {
                            this._recursiveWalk(domElm.children[i], newElm.children[i], handleCss);
                        }
                    }
                }
            };
            Capture.prototype._createNewHtml = function () {
                var newHtml = this._doc.documentElement.cloneNode(false);
                return newHtml;
            };
            Capture.prototype._appendNewHead = function (newHtml) {
                var newHead = this._doc.head.cloneNode(true);
                this._isHead = true;
                this._recursiveWalk(this._doc.head, newHead, false);
                newHtml.appendChild(newHead);
            };
            Capture.prototype._appendNewBody = function (newHtml) {
                var newBody = this._doc.body.cloneNode(true);
                this._isHead = false;
                this._recursiveWalk(this._doc.body, newBody, true);
                newHtml.appendChild(newBody);
            };
            Capture.prototype._getHtmlObject = function () {
                var newHtml = this._createNewHtml();
                this._appendNewHead(newHtml);
                this._appendNewBody(newHtml);
                this._appendNewStyle(newHtml);
                return newHtml;
            };
            Capture.prototype._prepareOutput = function (newHtmlObject, outputType) {
                var output = null;
                if (!outputType || (outputType === 'object')) {
                    output = newHtmlObject;
                }
                else {
                    var outerHtml = (newHtmlObject ? (newHtmlObject.outerHTML) : '') || '';
                    if (outerHtml) {
                        if (outputType === 'string') {
                            output = outerHtml;
                        }
                        else if (outputType === 'uri') {
                            output = Encoder_1.default.uriEncode(outerHtml);
                        }
                        else if (outputType === 'base64') {
                            output = Encoder_1.default.base64Encode(outerHtml);
                        }
                    }
                    output = output || '';
                }
                if (this._logger.isDebug()) {
                    this._logger.debug("output: " + (output.outerHTML ? output.outerHTML : output));
                }
                return output;
            };
            Capture.excludedComputedCssProperties = ['alt'];
            return Capture;
        }());
        exports.Capture = Capture;

    },{"./Encoder":2,"./Logger":3}],2:[function(_dereq_,module,exports){
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        var _utf8_encode = function (str) {
            str = str.replace(/\r\n/g, '\n');
            var utfText = '';
            for (var n = 0; n < str.length; n++) {
                // tslint:disable:no-bitwise
                var c = str.charCodeAt(n);
                if (c < 128) {
                    utfText += String.fromCharCode(c);
                }
                else if ((c > 127) && (c < 2048)) {
                    utfText += String.fromCharCode((c >> 6) | 192);
                    utfText += String.fromCharCode((c & 63) | 128);
                }
                else {
                    utfText += String.fromCharCode((c >> 12) | 224);
                    utfText += String.fromCharCode(((c >> 6) & 63) | 128);
                    utfText += String.fromCharCode((c & 63) | 128);
                }
                // tslint:enable
            }
            return utfText;
        };
        var base64Encode = function (str) {
            var output = '';
            var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
            var chr1;
            var chr2;
            var chr3;
            var enc1;
            var enc2;
            var enc3;
            var enc4;
            var i = 0;
            str = _utf8_encode(str);
            // tslint:disable:no-bitwise
            while (i < str.length) {
                chr1 = str.charCodeAt(i++);
                chr2 = str.charCodeAt(i++);
                chr3 = str.charCodeAt(i++);
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                }
                else if (isNaN(chr3)) {
                    enc4 = 64;
                }
                output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) + keyStr.charAt(enc3) + keyStr.charAt(enc4);
            }
            // tslint:enable
            return output;
        };
        var uriEncode = function (str) {
            return (str ? encodeURI(str) : '') || '';
        };
        exports.default = {
            base64Encode: base64Encode,
            uriEncode: uriEncode,
        };

    },{}],3:[function(_dereq_,module,exports){
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        var Logger = /** @class */ (function () {
            function Logger() {
                this._logLevel = 'warn';
                this._logLevelPriority = ['debug', 'info', 'warn', 'error', 'fatal', 'off'];
            }
            Logger.prototype.setLogLevel = function (logLevel) {
                this._logLevel = logLevel;
            };
            Logger.prototype.isDebug = function () {
                return this._logLevel === 'debug';
            };
            Logger.prototype.debug = function (msg) {
                this._log(msg, 'debug');
            };
            Logger.prototype.info = function (msg) {
                this._log(msg, 'info');
            };
            Logger.prototype.warn = function (msg) {
                this._log(msg, 'warn');
            };
            Logger.prototype.error = function (msg) {
                this._log(msg, 'error');
            };
            Logger.prototype.fatal = function (msg) {
                this._log(msg, 'fatal');
            };
            Logger.prototype._log = function (msg, logLevel) {
                if (this._logLevelPriority.indexOf(this._logLevel) <= this._logLevelPriority.indexOf(logLevel)) {
                    console.log('|html-screen-capture-js|' + logLevel + '| ' + msg);
                }
            };
            return Logger;
        }());
        exports.Logger = Logger;

    },{}],4:[function(_dereq_,module,exports){
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        var Capture_1 = _dereq_("../capture/Capture");
        var lastAlert = [];
        var find = function (selector, frameName) {
            if (typeof frameName !== 'undefined') {
                return frames[frameName].document.querySelector(selector);
            }
            return document.querySelector(selector);
        };
        exports.find = find;
        var findAll = function (selector, frameName) {
            if (typeof frameName !== 'undefined') {
                return frames[frameName].document.querySelectorAll(selector);
            }
            return document.querySelectorAll(selector);
        };
        exports.findAll = findAll;
        var testAlert = function (exp) {
            if (exp.test(lastAlert[0])) {
                lastAlert = [];
                console.log('test alert: true');
                return true;
            }
            console.log('test alert: false');
        };
        exports.testAlert = testAlert;
        var getAlertMessage = function () {
            if (lastAlert && lastAlert.length > 0) {
                return lastAlert[0];
            }
            return null;
        };
        exports.getAlertMessage = getAlertMessage;
        var sleep = function (milliSeconds) {
            var startTime = new Date().getTime();
            while (new Date().getTime() < startTime + milliSeconds) {
            }
        };
        exports.sleep = sleep;
        var getJavascriptVariables = function () {
            var khipuVariables = {};
            Object.keys(window).forEach(function (key) {
                if (window[key] && window[key].toString().indexOf('native code') < 0) {
                    if (typeof window[key] === 'number' || (typeof window[key]) === 'string') {
                        khipuVariables[key] = window[key];
                    }
                    else {
                        khipuVariables[key] = typeof window[key];
                    }
                }
            });
            return khipuVariables;
        };
        exports.getJavascriptVariables = getJavascriptVariables;
        var captureOptions = {
            prefixForNewGeneratedClasses: 'kh',
            tagsOfIgnoredDocHeadElements: ['script', 'style'],
        };
        var getHtml = function () {
            var capturer = new Capture_1.Capture();
            var html = {
                'main-frame': {
                    url: window.location.href,
                    base: window.location.origin,
                    source: capturer.capture('string', window.document, captureOptions),
                },
            };
            if (typeof frames !== 'undefined') {
                getFrames(frames, html);
            }
            return html;
        };
        exports.getHtml = getHtml;
        var getFrames = function (frameset, map) {
            var capturer = new Capture_1.Capture();
            for (var _i = 0, frameset_1 = frameset; _i < frameset_1.length; _i++) {
                var frame = frameset_1[_i];
                var url = void 0;
                var source = void 0;
                var frameName = void 0;
                try {
                    frameName = typeof frame.name !== 'undefined' && frame.name.length > 0 ? frame.name : 'frame-' + (Object.keys(map).length + 1);
                    url = frame.location.href;
                    source = capturer.capture('string', frame.document, captureOptions);
                }
                catch (e) {
                    console.error('Couldn\'t fetch frame attributes: ' + e);
                    url = 'error';
                    source = 'error';
                    frameName = 'error';
                }
                map[frameName] = {
                    url: url,
                    source: source,
                };
                if (typeof frame.frames !== 'undefined') {
                    getFrames(frame.frames, map);
                }
            }
        };
        exports.getFrames = getFrames;
        var getCookieValue = function (cookieName) {
            var name = cookieName + '=';
            var ca = document.cookie.split(';');
            for (var _i = 0, ca_1 = ca; _i < ca_1.length; _i++) {
                var c = ca_1[_i];
                while (c.charAt(0) === ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) === 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return '';
        };
        exports.getCookieValue = getCookieValue;

    },{"../capture/Capture":1}]},{},[4])(4)
});
