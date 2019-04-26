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
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file `Task<A>` represents an asynchronous computation that yields a value of type `A` and **never fails**.
 * If you want to represent an asynchronous computation that may fail, please see `TaskEither`.
 */
var Either_1 = require("./Either");
var function_1 = require("./function");
exports.URI = 'Task';
var map = function (fa, f) {
    return function () { return fa().then(f); };
};
var of = function (a) {
    return function () { return Promise.resolve(a); };
};
var ap = function (fab, fa) {
    return function () { return Promise.all([fab(), fa()]).then(function (_a) {
        var f = _a[0], a = _a[1];
        return f(a);
    }); };
};
var chain = function (fa, f) {
    return function () { return fa().then(function (a) { return f(a)(); }); };
};
/**
 * @since 2.0.0
 */
exports.getRaceMonoid = function () {
    return {
        concat: function (x, y) { return function () {
            return new Promise(function (resolve, reject) {
                var running = true;
                var resolveFirst = function (a) {
                    if (running) {
                        running = false;
                        resolve(a);
                    }
                };
                var rejectFirst = function (e) {
                    if (running) {
                        running = false;
                        reject(e);
                    }
                };
                x().then(resolveFirst, rejectFirst);
                y().then(resolveFirst, rejectFirst);
            });
        }; },
        empty: never
    };
};
var never = function () { return new Promise(function (_) { return undefined; }); };
/**
 * @since 2.0.0
 */
exports.getSemigroup = function (S) {
    return {
        concat: function (x, y) { return function () { return x().then(function (rx) { return y().then(function (ry) { return S.concat(rx, ry); }); }); }; }
    };
};
/**
 * @since 2.0.0
 */
exports.getMonoid = function (M) {
    return __assign({}, exports.getSemigroup(M), { empty: of(M.empty) });
};
/**
 * @since 2.0.0
 */
exports.tryCatch = function (f, onrejected) {
    return function () { return f().then(Either_1.right, function (reason) { return Either_1.left(onrejected(reason)); }); };
};
/**
 * @since 2.0.0
 */
exports.delay = function (millis, a) {
    return function () {
        return new Promise(function (resolve) {
            setTimeout(function () {
                resolve(a);
            }, millis);
        });
    };
};
/**
 * @since 2.0.0
 */
exports.task = {
    URI: exports.URI,
    map: map,
    of: of,
    ap: ap,
    chain: chain,
    fromIO: function (ma) { return function () { return Promise.resolve(ma()); }; },
    fromTask: function_1.identity
};
/**
 * Like `Task` but `ap` is sequential
 *
 * @since 2.0.0
 */
exports.taskSeq = __assign({}, exports.task, { ap: function (fab, fa) { return chain(fab, function (f) { return map(fa, f); }); } });
