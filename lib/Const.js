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
exports.URI = 'Const';
/**
 * @since 2.0.0
 */
exports.make = function (l) {
    return l;
};
/**
 * @since 2.0.0
 */
exports.getShow = function (S) {
    return {
        show: function (c) { return "make(" + S.show(c) + ")"; }
    };
};
/**
 * @since 2.0.0
 */
function getEq(E) {
    return E;
}
exports.getEq = getEq;
var map = function (fa, f) {
    return fa;
};
/**
 * @since 2.0.0
 */
exports.getApply = function (S) {
    var ap = function (fab, fa) {
        return exports.make(S.concat(fab, fa));
    };
    return {
        URI: exports.URI,
        _L: function_1.phantom,
        map: map,
        ap: ap
    };
};
/**
 * @since 2.0.0
 */
exports.getApplicative = function (M) {
    return __assign({}, exports.getApply(M), { of: function () { return exports.make(M.empty); } });
};
/**
 * @since 2.0.0
 */
exports.const_ = {
    URI: exports.URI,
    map: map,
    contramap: function (fa) { return fa; }
};
