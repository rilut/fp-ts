"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var function_1 = require("./function");
exports.URI = 'Writer';
/**
 * @since 2.0.0
 */
exports.evalWriter = function (fa) {
    return fa()[0];
};
/**
 * @since 2.0.0
 */
exports.execWriter = function (fa) {
    return fa()[1];
};
/**
 * Appends a value to the accumulator
 *
 * @since 2.0.0
 */
exports.tell = function (w) {
    return function () { return [undefined, w]; };
};
/**
 * Modifies the result to include the changes to the accumulator
 *
 * @since 2.0.0
 */
exports.listen = function (fa) {
    return function () {
        var _a = fa(), a = _a[0], w = _a[1];
        return [[a, w], w];
    };
};
/**
 * Applies the returned function to the accumulator
 *
 * @since 2.0.0
 */
exports.pass = function (fa) {
    return function () {
        var _a = fa(), _b = _a[0], a = _b[0], f = _b[1], w = _a[1];
        return [a, f(w)];
    };
};
/**
 * Projects a value from modifications made to the accumulator during an action
 *
 * @since 2.0.0
 */
exports.listens = function (fa, f) {
    return function () {
        var _a = fa(), a = _a[0], w = _a[1];
        return [[a, f(w)], w];
    };
};
/**
 * Modify the final accumulator value by applying a function
 *
 * @since 2.0.0
 */
exports.censor = function (fa, f) {
    return function () {
        var _a = fa(), a = _a[0], w = _a[1];
        return [a, f(w)];
    };
};
function map(fa, f) {
    return function () {
        var _a = fa(), a = _a[0], w = _a[1];
        return [f(a), w];
    };
}
/**
 *
 * @since 2.0.0
 */
exports.getMonad = function (M) {
    return {
        URI: exports.URI,
        _L: function_1.phantom,
        map: map,
        of: function (a) { return function () { return [a, M.empty]; }; },
        ap: function (mab, ma) { return function () {
            var _a = mab(), f = _a[0], w1 = _a[1];
            var _b = ma(), a = _b[0], w2 = _b[1];
            return [f(a), M.concat(w1, w2)];
        }; },
        chain: function (ma, f) { return function () {
            var _a = ma(), a = _a[0], w1 = _a[1];
            var _b = f(a)(), b = _b[0], w2 = _b[1];
            return [b, M.concat(w1, w2)];
        }; }
    };
};
/**
 * @since 2.0.0
 */
exports.writer = {
    URI: exports.URI,
    map: map
};
