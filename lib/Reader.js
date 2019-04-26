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
var function_1 = require("./function");
var E = require("./Either");
exports.URI = 'Reader';
/**
 * @since 2.0.0
 */
function run(ma, e) {
    return ma(e);
}
exports.run = run;
/**
 * Reads the current context
 *
 * @since 2.0.0
 */
function ask() {
    return function_1.identity;
}
exports.ask = ask;
/**
 * Projects a value from the global context in a Reader
 *
 * @since 2.0.0
 */
function asks(f) {
    return f;
}
exports.asks = asks;
/**
 * changes the value of the local context during the execution of the action `ma`
 *
 * @since 2.0.0
 */
function local(ma, f) {
    return function (e) { return ma(f(e)); };
}
exports.local = local;
/**
 * @since 2.0.0
 */
function getSemigroup(S) {
    return {
        concat: function (x, y) { return function (e) { return S.concat(x(e), y(e)); }; }
    };
}
exports.getSemigroup = getSemigroup;
/**
 * @since 2.0.0
 */
function getMonoid(M) {
    return __assign({}, getSemigroup(M), { empty: function () { return M.empty; } });
}
exports.getMonoid = getMonoid;
function left(pab) {
    return function (e) { return E.fold(e, function (a) { return E.left(pab(a)); }, E.right); };
}
function right(pbc) {
    return function (e) { return E.fold(e, E.left, function (b) { return E.right(pbc(b)); }); };
}
/**
 * @since 2.0.0
 */
exports.reader = {
    URI: exports.URI,
    map: function (ma, f) { return function (e) { return f(ma(e)); }; },
    of: function (a) { return function () { return a; }; },
    ap: function (mab, ma) { return function (e) { return mab(e)(ma(e)); }; },
    chain: function (ma, f) { return function (e) { return f(ma(e))(e); }; },
    promap: function (mbc, f, g) { return function (a) { return g(mbc(f(a))); }; },
    compose: function (ab, la) { return function (l) { return ab(la(l)); }; },
    id: function () { return function_1.identity; },
    first: function (pab) { return function (_a) {
        var a = _a[0], c = _a[1];
        return [pab(a), c];
    }; },
    second: function (pbc) { return function (_a) {
        var a = _a[0], b = _a[1];
        return [a, pbc(b)];
    }; },
    left: left,
    right: right
};
