"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @since 2.0.0
 */
exports.URI = 'Store';
var map = function (wa, f) {
    return { peek: function (s) { return f(wa.peek(s)); }, pos: wa.pos };
};
var extract = function (wa) {
    return wa.peek(wa.pos);
};
/**
 * Reposition the focus at the specified position
 *
 * @since 2.0.0
 */
function seek(s) {
    return function (wa) { return ({ peek: wa.peek, pos: s }); };
}
exports.seek = seek;
/**
 * Reposition the focus at the specified position, which depends on the current position
 *
 * @since 2.0.0
 */
function seeks(f) {
    return function (wa) { return ({ peek: wa.peek, pos: f(wa.pos) }); };
}
exports.seeks = seeks;
/**
 * Extract a value from a position which depends on the current position
 *
 * @since 2.0.0
 */
function peeks(f) {
    return function (wa) { return wa.peek(f(wa.pos)); };
}
exports.peeks = peeks;
function experiment(F) {
    return function (f) { return function (wa) { return F.map(f(wa.pos), function (s) { return wa.peek(s); }); }; };
}
exports.experiment = experiment;
var extend = function (wa, f) {
    return { peek: function (s) { return f({ peek: wa.peek, pos: s }); }, pos: wa.pos };
};
/**
 * @since 2.0.0
 */
exports.store = {
    URI: exports.URI,
    map: map,
    extract: extract,
    extend: extend
};
