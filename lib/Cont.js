"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.URI = 'Cont';
/**
 * @since 2.0.0
 */
exports.cont = {
    URI: exports.URI,
    map: function (ma, f) { return function (c) { return ma(function (a) { return c(f(a)); }); }; },
    of: function (a) { return function (c) { return c(a); }; },
    ap: function (mab, ma) { return function (c) { return mab(function (f) { return ma(function (a) { return c(f(a)); }); }); }; },
    chain: function (ma, f) { return function (c) { return ma(function (a) { return f(a)(c); }); }; }
};
