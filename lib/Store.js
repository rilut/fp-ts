"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.URI = 'Store';
var map = function (sa, f) {
    return { peek: function (s) { return f(sa.peek(s)); }, pos: sa.pos };
};
var extract = function (sa) {
    return sa.peek(sa.pos);
};
/** Reposition the focus at the specified position */
function seek(sa, s) {
    return { peek: sa.peek, pos: s };
}
exports.seek = seek;
var extend = function (sa, f) {
    return { peek: function (s) { return f(seek(sa, s)); }, pos: sa.pos };
};
/**
 * Extract a value from a position which depends on the current position
 *
 * @since 2.0.0
 */
exports.peeks = function (f) { return function (sa) { return function (_) {
    return sa.peek(f(sa.pos));
}; }; };
/**
 * Reposition the focus at the specified position, which depends on the current position
 *
 * @since 2.0.0
 */
exports.seeks = function (f) { return function (sa) {
    return { peek: sa.peek, pos: f(sa.pos) };
}; };
function experiment(F) {
    return function (f) { return function (sa) { return F.map(f(sa.pos), function (s) { return sa.peek(s); }); }; };
}
exports.experiment = experiment;
/**
 * @since 2.0.0
 */
exports.store = {
    URI: exports.URI,
    map: map,
    extract: extract,
    extend: extend
};
