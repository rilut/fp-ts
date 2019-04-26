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
exports.URI = 'Tuple';
/**
 * @since 2.0.0
 */
exports.getShow = function (SL, SA) {
    return {
        show: function (t) { return "[" + SL.show(exports.fst(t)) + ", " + SA.show(exports.snd(t)) + "]"; }
    };
};
/**
 * @since 2.0.0
 */
exports.fst = function (fa) {
    return fa[0];
};
/**
 * @since 2.0.0
 */
exports.snd = function (fa) {
    return fa[1];
};
/**
 * @since 2.0.0
 */
exports.swap = function (fa) {
    return [exports.snd(fa), exports.fst(fa)];
};
var compose = function (bc, fa) {
    return [exports.fst(fa), exports.snd(bc)];
};
var map = function (fa, f) {
    return [exports.fst(fa), f(exports.snd(fa))];
};
var bimap = function (fa, f, g) {
    return [f(exports.fst(fa)), g(exports.snd(fa))];
};
var extract = exports.snd;
var extend = function (fa, f) {
    return [exports.fst(fa), f(fa)];
};
var reduce = function (fa, b, f) {
    return f(b, exports.snd(fa));
};
var foldMap = function (M) { return function (fa, f) {
    return f(exports.snd(fa));
}; };
var reduceRight = function (fa, b, f) {
    return f(exports.snd(fa), b);
};
/**
 * @since 2.0.0
 */
exports.getEq = function (SA, SB) {
    return Eq_1.getTupleEq(SA, SB);
};
/**
 * To obtain the result, the `fst`s are `compare`d, and if they are `EQ`ual, the
 * `snd`s are `compare`d.
 *
 * @since 2.0.0
 */
exports.getOrd = function (OL, OA) {
    return Ord_1.getSemigroup().concat(Ord_1.contramap(OL, exports.fst), Ord_1.contramap(OA, exports.snd));
};
/**
 * @since 2.0.0
 */
exports.getSemigroup = function (SL, SA) {
    return Semigroup_1.getTupleSemigroup(SL, SA);
};
/**
 * @since 2.0.0
 */
exports.getMonoid = function (ML, MA) {
    return Monoid_1.getTupleMonoid(ML, MA);
};
/**
 * @since 2.0.0
 */
exports.getApply = function (S) {
    var ap = function (fab, fa) {
        return [S.concat(exports.fst(fab), exports.fst(fa)), exports.snd(fab)(exports.snd(fa))];
    };
    return {
        URI: exports.URI,
        _L: function_1.phantom,
        map: map,
        ap: ap
    };
};
var of = function (M) { return function (a) {
    return [M.empty, a];
}; };
/**
 * @since 2.0.0
 */
exports.getApplicative = function (M) {
    return __assign({}, exports.getApply(M), { of: of(M) });
};
/**
 * @since 2.0.0
 */
exports.getChain = function (S) {
    var chain = function (fa, f) {
        var _a = f(exports.snd(fa)), fs = _a[0], s = _a[1];
        return [S.concat(exports.fst(fa), fs), s];
    };
    return __assign({}, exports.getApply(S), { chain: chain });
};
/**
 * @since 2.0.0
 */
exports.getMonad = function (M) {
    return __assign({}, exports.getChain(M), { of: of(M) });
};
/**
 * @since 2.0.0
 */
exports.getChainRec = function (M) {
    var chainRec = function (a, f) {
        var result = f(a);
        var acc = M.empty;
        var s = exports.snd(result);
        while (s._tag === 'Left') {
            acc = M.concat(acc, exports.fst(result));
            result = f(s.left);
            s = exports.snd(result);
        }
        return [M.concat(acc, exports.fst(result)), s.right];
    };
    return __assign({}, exports.getChain(M), { chainRec: chainRec });
};
var traverse = function (F) { return function (ta, f) {
    return F.map(f(exports.snd(ta)), function (b) { return [exports.fst(ta), b]; });
}; };
var sequence = function (F) { return function (ta) {
    return F.map(exports.snd(ta), function (b) { return [exports.fst(ta), b]; });
}; };
/**
 * @since 2.0.0
 */
exports.tuple = {
    URI: exports.URI,
    compose: compose,
    map: map,
    bimap: bimap,
    extract: extract,
    extend: extend,
    reduce: reduce,
    foldMap: foldMap,
    reduceRight: reduceRight,
    traverse: traverse,
    sequence: sequence
};
