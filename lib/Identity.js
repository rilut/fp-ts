"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ChainRec_1 = require("./ChainRec");
var function_1 = require("./function");
var Eq_1 = require("./Eq");
exports.URI = 'Identity';
/**
 * @since 2.0.0
 */
exports.getShow = function (S) {
    return {
        show: function (a) { return S.show(a); }
    };
};
/**
 * @since 2.0.0
 */
exports.getEq = function (E) {
    return Eq_1.fromEquals(function (x, y) { return E.equals(x, y); });
};
var map = function (fa, f) {
    return f(fa);
};
var of = function (a) {
    return a;
};
var ap = function (fab, fa) {
    return fab(fa);
};
var chain = function (fa, f) {
    return f(fa);
};
var reduce = function (fa, b, f) {
    return f(b, fa);
};
var foldMap = function (M) { return function (fa, f) {
    return f(fa);
}; };
var reduceRight = function (fa, b, f) {
    return f(fa, b);
};
var extend = function (ea, f) {
    return f(ea);
};
var extract = function (fa) {
    return fa;
};
var chainRec = function (a, f) {
    return ChainRec_1.tailRec(a, function (a) { return f(a); });
};
var traverse = function (F) { return function (ta, f) {
    return F.map(f(ta), of);
}; };
var sequence = function (F) { return function (ta) {
    return F.map(ta, of);
}; };
/**
 * @since 2.0.0
 */
exports.identity = {
    URI: exports.URI,
    map: map,
    of: of,
    ap: ap,
    chain: chain,
    reduce: reduce,
    foldMap: foldMap,
    reduceRight: reduceRight,
    traverse: traverse,
    sequence: sequence,
    alt: function_1.identity,
    extract: extract,
    extend: extend,
    chainRec: chainRec
};
