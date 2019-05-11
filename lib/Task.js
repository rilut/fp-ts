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
var function_1 = require("./function");
/**
 * @since 2.0.0
 */
exports.URI = 'Task';
/**
 * @since 2.0.0
 */
exports.never = function () { return new Promise(function (_) { return undefined; }); };
/**
 * @since 2.0.0
 */
function getSemigroup(S) {
    return {
        concat: function (x, y) { return function () { return x().then(function (rx) { return y().then(function (ry) { return S.concat(rx, ry); }); }); }; }
    };
}
exports.getSemigroup = getSemigroup;
/**
 * @since 2.0.0
 */
function getMonoid(M) {
    return {
        concat: getSemigroup(M).concat,
        empty: exports.task.of(M.empty)
    };
}
exports.getMonoid = getMonoid;
/**
 * @since 2.0.0
 */
function getRaceMonoid() {
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
        empty: exports.never
    };
}
exports.getRaceMonoid = getRaceMonoid;
/**
 * @since 2.0.0
 */
function delay(millis, ma) {
    return function () {
        return new Promise(function (resolve) {
            setTimeout(function () {
                // tslint:disable-next-line: no-floating-promises
                ma().then(resolve);
            }, millis);
        });
    };
}
exports.delay = delay;
/**
 * @since 2.0.0
 */
function fromIO(ma) {
    return function () { return Promise.resolve(ma()); };
}
exports.fromIO = fromIO;
/**
 * @since 2.0.0
 */
exports.task = {
    URI: exports.URI,
    map: function (ma, f) { return function () { return ma().then(f); }; },
    of: function (a) { return function () { return Promise.resolve(a); }; },
    ap: function (mab, ma) { return function () { return Promise.all([mab(), ma()]).then(function (_a) {
        var f = _a[0], a = _a[1];
        return f(a);
    }); }; },
    chain: function (ma, f) { return function () { return ma().then(function (a) { return f(a)(); }); }; },
    fromIO: fromIO,
    fromTask: function_1.identity
};
/**
 * Like `Task` but `ap` is sequential
 *
 * @since 2.0.0
 */
exports.taskSeq = __assign({}, exports.task, { ap: function (mab, ma) { return function () { return mab().then(function (f) { return ma().then(function (a) { return f(a); }); }); }; } });
