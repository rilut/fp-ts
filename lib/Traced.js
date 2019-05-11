"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var function_1 = require("./function");
/**
 * @since 2.0.0
 */
exports.URI = 'Traced';
/**
 * Extracts a value at a relative position which depends on the current value.
 *
 * @since 2.0.0
 */
function tracks(M, f) {
    return function (wa) { return wa(f(wa(M.empty))); };
}
exports.tracks = tracks;
/**
 * Get the current position
 *
 * @since 2.0.0
 */
function listen(wa) {
    return function (e) { return function_1.tuple(wa(e), e); };
}
exports.listen = listen;
/**
 * Get a value which depends on the current position
 *
 * @since 2.0.0
 */
function listens(wa, f) {
    return function (e) { return function_1.tuple(wa(e), f(e)); };
}
exports.listens = listens;
/**
 * Apply a function to the current position
 *
 * @since 2.0.0
 */
function censor(wa, f) {
    return function (e) { return wa(f(e)); };
}
exports.censor = censor;
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
var map = function (wa, f) {
    return function (p) { return f(wa(p)); };
};
/**
 * @since 2.0.0
 */
exports.traced = {
    URI: exports.URI,
    map: map
};
