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
var Monoid_1 = require("./Monoid");
var Ord_1 = require("./Ord");
var Semigroup_1 = require("./Semigroup");
var Eq_1 = require("./Eq");
/**
 * @since 2.0.0
 */
exports.URI = 'Tuple';
/**
 * @since 2.0.0
 */
function getShow(SL, SA) {
    return {
        show: function (t) { return "[" + SL.show(fst(t)) + ", " + SA.show(snd(t)) + "]"; }
    };
}
exports.getShow = getShow;
/**
 * @since 2.0.0
 */
function fst(fa) {
    return fa[0];
}
exports.fst = fst;
/**
 * @since 2.0.0
 */
function snd(fa) {
    return fa[1];
}
exports.snd = snd;
/**
 * @since 2.0.0
 */
function swap(fa) {
    return [snd(fa), fst(fa)];
}
exports.swap = swap;
var compose = function (bc, fa) {
    return [fst(fa), snd(bc)];
};
var map = function (fa, f) {
    return [fst(fa), f(snd(fa))];
};
var bimap = function (fa, f, g) {
    return [f(fst(fa)), g(snd(fa))];
};
var extract = snd;
var extend = function (fa, f) {
    return [fst(fa), f(fa)];
};
var reduce = function (fa, b, f) {
    return f(b, snd(fa));
};
var foldMap = function (_) { return function (fa, f) {
    return f(snd(fa));
}; };
var reduceRight = function (fa, b, f) {
    return f(snd(fa), b);
};
/**
 * @since 2.0.0
 */
function getEq(EL, EA) {
    return Eq_1.getTupleEq(EL, EA);
}
exports.getEq = getEq;
/**
 * To obtain the result, the `fst`s are `compare`d, and if they are `EQ`ual, the
 * `snd`s are `compare`d.
 *
 * @since 2.0.0
 */
function getOrd(OL, OA) {
    return Ord_1.getSemigroup().concat(Ord_1.contramap(OL, fst), Ord_1.contramap(OA, snd));
}
exports.getOrd = getOrd;
/**
 * @since 2.0.0
 */
function getSemigroup(SL, SA) {
    return Semigroup_1.getTupleSemigroup(SL, SA);
}
exports.getSemigroup = getSemigroup;
/**
 * @since 2.0.0
 */
function getMonoid(ML, MA) {
    return Monoid_1.getTupleMonoid(ML, MA);
}
exports.getMonoid = getMonoid;
/**
 * @since 2.0.0
 */
function getApply(S) {
    return {
        URI: exports.URI,
        _L: function_1.phantom,
        map: map,
        ap: function (fab, fa) { return [S.concat(fst(fab), fst(fa)), snd(fab)(snd(fa))]; }
    };
}
exports.getApply = getApply;
var of = function (M) { return function (a) {
    return [M.empty, a];
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
            var _a = f(snd(fa)), fs = _a[0], s = _a[1];
            return [S.concat(fst(fa), fs), s];
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
        var s = snd(result);
        while (s._tag === 'Left') {
            acc = M.concat(acc, fst(result));
            result = f(s.left);
            s = snd(result);
        }
        return [M.concat(acc, fst(result)), s.right];
    };
    return __assign({}, getChain(M), { chainRec: chainRec });
}
exports.getChainRec = getChainRec;
var traverse = function (F) { return function (ta, f) {
    return F.map(f(snd(ta)), function (b) { return [fst(ta), b]; });
}; };
var sequence = function (F) { return function (ta) {
    return F.map(snd(ta), function (b) { return [fst(ta), b]; });
}; };
/**
 * @since 2.0.0
 */
exports.tuple = {
    URI: exports.URI,
    compose: compose,
    map: map,
    bimap: bimap,
    mapLeft: function (fla, f) { return bimap(fla, f, function_1.identity); },
    extract: extract,
    extend: extend,
    reduce: reduce,
    foldMap: foldMap,
    reduceRight: reduceRight,
    traverse: traverse,
    sequence: sequence
};
