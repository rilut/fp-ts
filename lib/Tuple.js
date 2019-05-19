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
/**
 * @since 2.0.0
 */
exports.URI = 'Tuple';
/**
 * @since 2.0.0
 */
function getShow(SA, SS) {
    return {
        show: function (sa) { return "[" + SA.show(fst(sa)) + ", " + SS.show(snd(sa)) + "]"; }
    };
}
exports.getShow = getShow;
/**
 * @since 2.0.0
 */
function fst(sa) {
    return sa[0];
}
exports.fst = fst;
/**
 * @since 2.0.0
 */
function snd(sa) {
    return sa[1];
}
exports.snd = snd;
/**
 * @since 2.0.0
 */
function swap(sa) {
    return [snd(sa), fst(sa)];
}
exports.swap = swap;
var compose = function (bc, sa) {
    return [fst(bc), snd(sa)];
};
var map = function (sa, f) {
    return [f(fst(sa)), snd(sa)];
};
var bimap = function (sa, f, g) {
    return [g(fst(sa)), f(snd(sa))];
};
var extract = fst;
var extend = function (sa, f) {
    return [f(sa), snd(sa)];
};
var reduce = function (sa, b, f) {
    return f(b, fst(sa));
};
var foldMap = function (_) { return function (sa, f) {
    return f(fst(sa));
}; };
var reduceRight = function (sa, b, f) {
    return f(fst(sa), b);
};
/**
 * @since 2.0.0
 */
function getApply(S) {
    return {
        URI: exports.URI,
        _L: function_1.phantom,
        map: map,
        ap: function (fab, fa) { return [fst(fab)(fst(fa)), S.concat(snd(fab), snd(fa))]; }
    };
}
exports.getApply = getApply;
var of = function (M) { return function (a) {
    return [a, M.empty];
}; };
/**
 * @since 2.0.0
 */
function getApplicative(M) {
    return __assign({}, getApply(M), { of: of(M) });
}
exports.getApplicative = getApplicative;
/**
 * @since 2.0.0
 */
function getChain(S) {
    return __assign({}, getApply(S), { chain: function (fa, f) {
            var _a = f(fst(fa)), b = _a[0], s = _a[1];
            return [b, S.concat(snd(fa), s)];
        } });
}
exports.getChain = getChain;
/**
 * @since 2.0.0
 */
function getMonad(M) {
    return __assign({}, getChain(M), { of: of(M) });
}
exports.getMonad = getMonad;
/**
 * @since 2.0.0
 */
function getChainRec(M) {
    var chainRec = function (a, f) {
        var result = f(a);
        var acc = M.empty;
        var s = fst(result);
        while (s._tag === 'Left') {
            acc = M.concat(acc, snd(result));
            result = f(s.left);
            s = fst(result);
        }
        return [s.right, M.concat(acc, snd(result))];
    };
    return __assign({}, getChain(M), { chainRec: chainRec });
}
exports.getChainRec = getChainRec;
var traverse = function (F) { return function (ta, f) {
    return F.map(f(fst(ta)), function (b) { return [b, snd(ta)]; });
}; };
var sequence = function (F) { return function (ta) {
    return F.map(fst(ta), function (a) { return [a, snd(ta)]; });
}; };
/**
 * @since 2.0.0
 */
exports.tuple = {
    URI: exports.URI,
    compose: compose,
    map: map,
    bimap: bimap,
    mapLeft: function (fla, f) { return [fst(fla), f(snd(fla))]; },
    extract: extract,
    extend: extend,
    reduce: reduce,
    foldMap: foldMap,
    reduceRight: reduceRight,
    traverse: traverse,
    sequence: sequence
};
