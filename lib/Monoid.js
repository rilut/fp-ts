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
var Semigroup_1 = require("./Semigroup");
/**
 * @since 2.0.0
 */
function fold(M) {
    var foldSemigroupM = Semigroup_1.fold(M);
    return function (as) { return foldSemigroupM(M.empty, as); };
}
exports.fold = fold;
/**
 * Given a tuple of monoids returns a monoid for the tuple
 *
 * @example
 * import { getTupleMonoid, monoidString, monoidSum, monoidAll } from 'fp-ts/lib/Monoid'
 *
 * const M1 = getTupleMonoid(monoidString, monoidSum)
 * assert.deepStrictEqual(M1.concat(['a', 1], ['b', 2]), ['ab', 3])
 *
 * const M2 = getTupleMonoid(monoidString, monoidSum, monoidAll)
 * assert.deepStrictEqual(M2.concat(['a', 1, true], ['b', 2, false]), ['ab', 3, false])
 *
 * @since 2.0.0
 */
exports.getTupleMonoid = function () {
    var monoids = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        monoids[_i] = arguments[_i];
    }
    return __assign({}, Semigroup_1.getTupleSemigroup.apply(void 0, monoids), { empty: monoids.map(function (m) { return m.empty; }) });
};
/**
 * @since 2.0.0
 */
exports.getDualMonoid = function (M) {
    return __assign({}, Semigroup_1.getDualSemigroup(M), { empty: M.empty });
};
/**
 * Boolean monoid under conjunction
 * @since 2.0.0
 */
exports.monoidAll = __assign({}, Semigroup_1.semigroupAll, { empty: true });
/**
 * Boolean monoid under disjunction
 * @since 2.0.0
 */
exports.monoidAny = __assign({}, Semigroup_1.semigroupAny, { empty: false });
/**
 * Number monoid under addition
 * @since 2.0.0
 */
exports.monoidSum = __assign({}, Semigroup_1.semigroupSum, { empty: 0 });
/**
 * Number monoid under multiplication
 * @since 2.0.0
 */
exports.monoidProduct = __assign({}, Semigroup_1.semigroupProduct, { empty: 1 });
/**
 * @since 2.0.0
 */
exports.monoidString = __assign({}, Semigroup_1.semigroupString, { empty: '' });
/**
 * @since 2.0.0
 */
exports.monoidVoid = __assign({}, Semigroup_1.semigroupVoid, { empty: undefined });
/**
 * @since 2.0.0
 */
exports.getFunctionMonoid = function (M) { return function () {
    return __assign({}, Semigroup_1.getFunctionSemigroup(M)(), { empty: function () { return M.empty; } });
}; };
/**
 * @since 2.0.0
 */
function getEndomorphismMonoid() {
    return {
        concat: function (x, y) { return function (a) { return x(y(a)); }; },
        empty: function_1.identity
    };
}
exports.getEndomorphismMonoid = getEndomorphismMonoid;
/**
 * @since 2.0.0
 */
exports.getStructMonoid = function (monoids) {
    var empty = {};
    for (var _i = 0, _a = Object.keys(monoids); _i < _a.length; _i++) {
        var key = _a[_i];
        empty[key] = monoids[key].empty;
    }
    return __assign({}, Semigroup_1.getStructSemigroup(monoids), { empty: empty });
};
/**
 * @since 2.0.0
 */
exports.getMeetMonoid = function (B) {
    return __assign({}, Semigroup_1.getMeetSemigroup(B), { empty: B.top });
};
/**
 * @since 2.0.0
 */
exports.getJoinMonoid = function (B) {
    return __assign({}, Semigroup_1.getJoinSemigroup(B), { empty: B.bottom });
};
