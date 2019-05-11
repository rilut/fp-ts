"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var function_1 = require("./function");
/**
 * @since 2.0.0
 */
exports.URI = 'Identity';
/**
 * @since 2.0.0
 */
exports.getShow = function_1.identity;
/**
 * @since 2.0.0
 */
exports.getEq = function_1.identity;
var chainRec = function (a, f) {
    var v = f(a);
    while (v._tag === 'Left') {
        v = f(v.left);
    }
    return v.right;
};
var traverse = function (F) { return function (ta, f) {
    return F.map(f(ta), function_1.identity);
}; };
var sequence = function (F) { return function (ta) {
    return F.map(ta, function_1.identity);
}; };
/**
 * @since 2.0.0
 */
exports.identity = {
    URI: exports.URI,
    map: function (ma, f) { return f(ma); },
    of: function_1.identity,
    ap: function (mab, ma) { return mab(ma); },
    chain: function (ma, f) { return f(ma); },
    reduce: function (fa, b, f) { return f(b, fa); },
    foldMap: function (_) { return function (fa, f) { return f(fa); }; },
    reduceRight: function (fa, b, f) { return f(fa, b); },
    traverse: traverse,
    sequence: sequence,
    alt: function_1.identity,
    extract: function_1.identity,
    extend: function (wa, f) { return f(wa); },
    chainRec: chainRec
};
