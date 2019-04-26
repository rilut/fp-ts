"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.URI = 'State';
/**
 * @since 2.0.0
 */
function run(ma, s) {
    return ma(s);
}
exports.run = run;
/**
 * @since 2.0.0
 */
function evalState(ma, s) {
    return ma(s)[0];
}
exports.evalState = evalState;
/**
 * @since 2.0.0
 */
function execState(ma, s) {
    return ma(s)[1];
}
exports.execState = execState;
var map = function (fa, f) {
    return function (s) {
        var _a = fa(s), a = _a[0], s1 = _a[1];
        return [f(a), s1];
    };
};
var of = function (a) {
    return function (s) { return [a, s]; };
};
var ap = function (fab, fa) {
    return chain(fab, function (f) { return map(fa, f); }); // <= derived
};
var chain = function (fa, f) {
    return function (s) {
        var _a = fa(s), a = _a[0], s1 = _a[1];
        return f(a)(s1);
    };
};
/**
 * Get the current state
 *
 * @since 2.0.0
 */
exports.get = function () {
    return function (s) { return [s, s]; };
};
/**
 * Set the state
 *
 * @since 2.0.0
 */
exports.put = function (s) {
    return function () { return [undefined, s]; };
};
/**
 * Modify the state by applying a function to the current state
 *
 * @since 2.0.0
 */
exports.modify = function (f) {
    return function (s) { return [undefined, f(s)]; };
};
/**
 * Get a value which depends on the current state
 *
 * @since 2.0.0
 */
exports.gets = function (f) {
    return function (s) { return [f(s), s]; };
};
/**
 * @since 2.0.0
 */
exports.state = {
    URI: exports.URI,
    map: map,
    of: of,
    ap: ap,
    chain: chain
};
