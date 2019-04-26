"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var function_1 = require("./function");
exports.URI = 'Traced';
/**
 * Extracts a value at a relative position which depends on the current value.
 * @since 2.0.0
 */
exports.tracks = function (M, f) { return function (wa) {
    return wa(f(wa(M.empty)));
}; };
/**
 * Get the current position
 * @since 2.0.0
 */
exports.listen = function (wa) {
    return function (e) { return function_1.tuple(wa(e), e); };
};
/**
 * Get a value which depends on the current position
 * @since 2.0.0
 */
exports.listens = function (wa, f) {
    return function (e) { return function_1.tuple(wa(e), f(e)); };
};
/**
 * Apply a function to the current position
 * @since 2.0.0
 */
exports.censor = function (wa, f) {
    return function (e) { return wa(f(e)); };
};
/**
 * @since 2.0.0
 */
function getComonad(monoid) {
    function extend(wa, f) {
        return function (p1) { return f(function (p2) { return wa(monoid.concat(p1, p2)); }); };
    }
    function extract(wa) {
        return wa(monoid.empty);
    }
    return {
        URI: exports.URI,
        _L: function_1.phantom,
        map: map,
        extend: extend,
        extract: extract
    };
}
exports.getComonad = getComonad;
function map(wa, f) {
    return function (p) { return f(wa(p)); };
}
/**
 * @since 2.0.0
 */
exports.traced = {
    URI: exports.URI,
    map: map
};
