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
exports.URI = 'IO';
/**
 * @since 2.0.0
 */
exports.run = function (fa) {
    return fa();
};
var map = function (fa, f) {
    return function () { return f(fa()); };
};
var of = function (a) {
    return function () { return a; };
};
var ap = function (fab, fa) {
    return function () { return fab()(fa()); };
};
var chain = function (fa, f) {
    return function () { return f(fa())(); };
};
/**
 * @since 2.0.0
 */
exports.getSemigroup = function (S) {
    return {
        concat: function (x, y) { return function () { return S.concat(x(), y()); }; }
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
exports.io = {
    URI: exports.URI,
    map: map,
    of: of,
    ap: ap,
    chain: chain,
    fromIO: function_1.identity
};
