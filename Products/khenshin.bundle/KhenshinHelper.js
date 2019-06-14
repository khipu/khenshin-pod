(function(f){var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.KhenshinHelper = f()})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(_dereq_,module,exports){
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.lastAlert = [];
        function find(selector, frameName) {
            if (typeof frameName !== 'undefined') {
                return frames[frameName].document.querySelector(selector);
            }
            return document.querySelector(selector);
        }
        exports.find = find;
        function findAll(selector, frameName) {
            if (typeof frameName !== 'undefined') {
                return frames[frameName].document.querySelectorAll(selector);
            }
            return document.querySelectorAll(selector);
        }
        exports.findAll = findAll;
        function testAlert(exp) {
            if (exp.test(exports.lastAlert[0])) {
                exports.lastAlert = [];
                console.log('test alert: true');
                return true;
            }
            console.log('test alert: false');
        }
        exports.testAlert = testAlert;
        function getAlertMessage() {
            if (exports.lastAlert && exports.lastAlert.length > 0) {
                return exports.lastAlert[0];
            }
            return null;
        }
        exports.getAlertMessage = getAlertMessage;
        function sleep(milliSeconds) {
            var startTime = new Date().getTime();
            while (new Date().getTime() < startTime + milliSeconds) { }
        }
        exports.sleep = sleep;
        function getJavascriptVariables() {
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
        }
        exports.getJavascriptVariables = getJavascriptVariables;
        function getHtml() {
            var xmlSerializer = new XMLSerializer();
            var html = {
                'main-frame': {
                    url: window.location.href,
                    base: window.location.origin,
                    source: xmlSerializer.serializeToString(document),
                },
            };
            if (typeof frames !== 'undefined') {
                getFrames(frames, html);
            }
            return html;
        }
        exports.getHtml = getHtml;
        function getFrames(frameset, map) {
            var xmlSerializer = new XMLSerializer();
            for (var _i = 0, frameset_1 = frameset; _i < frameset_1.length; _i++) {
                var frame = frameset_1[_i];
                var url = void 0;
                var source = void 0;
                var frameName = void 0;
                try {
                    frameName = typeof frame.name !== 'undefined' && frame.name.length > 0 ? frame.name : 'frame-' + (Object.keys(map).length + 1);
                    url = frame.location.href;
                    source = xmlSerializer.serializeToString(frame.document);
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
        }
        exports.getFrames = getFrames;
        function getCookieValue(cookieName) {
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
        }
        exports.getCookieValue = getCookieValue;

    },{}]},{},[1])(1)
});
