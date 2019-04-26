"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @since 2.0.0
 */
exports.identity = function (a) {
    return a;
};
/**
 * @since 2.0.0
 */
exports.unsafeCoerce = exports.identity;
/**
 * @since 2.0.0
 */
exports.not = function (predicate) {
    return function (a) { return !predicate(a); };
};
function or(p1, p2) {
    return function (a) { return p1(a) || p2(a); };
}
exports.or = or;
/**
 * @since 2.0.0
 */
exports.and = function (p1, p2) {
    return function (a) { return p1(a) && p2(a); };
};
/**
 * @since 2.0.0
 */
exports.constant = function (a) {
    return function () { return a; };
};
/**
 * A thunk that returns always `true`
 *
 * @since 2.0.0
 */
exports.constTrue = function () {
    return true;
};
/**
 * A thunk that returns always `false`
 *
 * @since 2.0.0
 */
exports.constFalse = function () {
    return false;
};
/**
 * A thunk that returns always `null`
 *
 * @since 2.0.0
 */
exports.constNull = function () {
    return null;
};
/**
 * A thunk that returns always `undefined`
 *
 * @since 2.0.0
 */
exports.constUndefined = function () {
    return;
};
/**
 * A thunk that returns always `void`
 *
 * @since 2.0.0
 */
exports.constVoid = function () {
    return;
};
/**
 * Flips the order of the arguments to a function of two arguments.
 *
 * @since 2.0.0
 */
exports.flip = function (f) {
    return function (b) { return function (a) { return f(a)(b); }; };
};
/**
 * The `on` function is used to change the domain of a binary operator.
 *
 * @since 2.0.0
 */
exports.on = function (op) { return function (f) {
    return function (x, y) { return op(f(x), f(y)); };
}; };
function compose() {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i] = arguments[_i];
    }
    var len = fns.length - 1;
    return function (x) {
        var y = x;
        for (var i = len; i > -1; i--) {
            y = fns[i].call(this, y);
        }
        return y;
    };
}
exports.compose = compose;
function pipe() {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i] = arguments[_i];
    }
    var len = fns.length - 1;
    return function (x) {
        var y = x;
        for (var i = 0; i <= len; i++) {
            y = fns[i].call(this, y);
        }
        return y;
    };
}
exports.pipe = pipe;
/**
 * @since 2.0.0
 */
exports.concat = function (x, y) {
    var lenx = x.length;
    var leny = y.length;
    var r = Array(lenx + leny);
    for (var i = 0; i < lenx; i++) {
        r[i] = x[i];
    }
    for (var i = 0; i < leny; i++) {
        r[i + lenx] = y[i];
    }
    return r;
};
/**
 * @since 2.0.0
 */
function curried(f, n, acc) {
    return function (x) {
        var combined = exports.concat(acc, [x]);
        return n === 0 ? f.apply(this, combined) : curried(f, n - 1, combined);
    };
}
exports.curried = curried;
function curry(f) {
    return curried(f, f.length - 1, []);
}
exports.curry = curry;
/**
 * @since 2.0.0
 */
exports.tuple = function () {
    var t = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        t[_i] = arguments[_i];
    }
    return t;
};
/**
 * Applies a function to an argument ($)
 *
 * @since 2.0.0
 */
exports.apply = function (f) { return function (a) {
    return f(a);
}; };
/**
 * Applies an argument to a function (#)
 *
 * @since 2.0.0
 */
exports.applyFlipped = function (a) { return function (f) {
    return f(a);
}; };
/**
 * For use with phantom fields
 *
 * @since 2.0.0
 */
exports.phantom = undefined;
/**
 * @since 2.0.0
 */
exports.increment = function (n) {
    return n + 1;
};
/**
 * @since 2.0.0
 */
exports.decrement = function (n) {
    return n - 1;
};
