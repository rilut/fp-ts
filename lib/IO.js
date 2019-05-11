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
 * @file `IO<A>` represents a synchronous computation that yields a value of type `A` and **never fails**.
 * If you want to represent a synchronous computation that may fail, please see `IOEither`.
 */
var function_1 = require("./function");
/**
 * @since 2.0.0
 */
exports.URI = 'IO';
/**
 * @since 2.0.0
 */
function getSemigroup(S) {
    return {
        concat: function (x, y) { return function () { return S.concat(x(), y()); }; }
    };
}
exports.getSemigroup = getSemigroup;
/**
 * @since 2.0.0
 */
function getMonoid(M) {
    return __assign({}, getSemigroup(M), { empty: exports.io.of(M.empty) });
}
exports.getMonoid = getMonoid;
/**
 * @since 2.0.0
 */
exports.io = {
    URI: exports.URI,
    map: function (ma, f) { return function () { return f(ma()); }; },
    of: function (a) { return function () { return a; }; },
    ap: function (mab, ma) { return function () { return mab()(ma()); }; },
    chain: function (ma, f) { return function () { return f(ma())(); }; },
    fromIO: function_1.identity
};
