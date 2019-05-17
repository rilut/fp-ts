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
var Eq_1 = require("./Eq");
var function_1 = require("./function");
var Monoid_1 = require("./Monoid");
var Ord_1 = require("./Ord");
/**
 * @since 2.0.0
 */
exports.URI = 'Option';
/**
 * @since 2.0.0
 */
exports.none = { _tag: 'None' };
/**
 * @since 2.0.0
 */
function some(a) {
    return { _tag: 'Some', value: a };
}
exports.some = some;
/**
 * Returns `true` if the option is an instance of `Some`, `false` otherwise
 *
 * @since 2.0.0
 */
function isSome(fa) {
    return fa._tag === 'Some';
}
exports.isSome = isSome;
/**
 * Returns `true` if the option is `None`, `false` otherwise
 *
 * @since 2.0.0
 */
function isNone(fa) {
    return fa._tag === 'None';
}
exports.isNone = isNone;
/**
 * @since 2.0.0
 */
function fold(onNone, onSome) {
    return function (ma) { return (isNone(ma) ? onNone() : onSome(ma.value)); };
}
exports.fold = fold;
/**
 * Constructs a new `Option` from a nullable type. If the value is `null` or `undefined`, returns `None`, otherwise
 * returns the value wrapped in a `Some`
 *
 * @example
 * import { none, some, fromNullable } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(fromNullable(undefined), none)
 * assert.deepStrictEqual(fromNullable(null), none)
 * assert.deepStrictEqual(fromNullable(1), some(1))
 *
 * @since 2.0.0
 */
function fromNullable(a) {
    return a == null ? exports.none : some(a);
}
exports.fromNullable = fromNullable;
/**
 * @since 2.0.0
 */
function fromEither(ma) {
    return ma._tag === 'Left' ? exports.none : some(ma.right);
}
exports.fromEither = fromEither;
/**
 * @since 2.0.0
 */
function toNullable(ma) {
    return isNone(ma) ? null : ma.value;
}
exports.toNullable = toNullable;
/**
 * @since 2.0.0
 */
function toUndefined(ma) {
    return isNone(ma) ? undefined : ma.value;
}
exports.toUndefined = toUndefined;
/**
 * @since 2.0.0
 */
function getOrElse(f) {
    return function (ma) { return (isNone(ma) ? f() : ma.value); };
}
exports.getOrElse = getOrElse;
/**
 * @since 2.0.0
 */
function elem(E) {
    return function (a, ma) { return (isNone(ma) ? false : E.equals(a, ma.value)); };
}
exports.elem = elem;
/**
 * @since 2.0.0
 */
function exists(predicate) {
    return function (ma) { return (isNone(ma) ? false : predicate(ma.value)); };
}
exports.exists = exists;
function fromPredicate(predicate) {
    return function (a) { return (predicate(a) ? some(a) : exports.none); };
}
exports.fromPredicate = fromPredicate;
/**
 * Transforms an exception into an `Option`. If `f` throws, returns `None`, otherwise returns the output wrapped in
 * `Some`
 *
 * @example
 * import { none, some, tryCatch } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(
 *   tryCatch(() => {
 *     throw new Error()
 *   }),
 *   none
 * )
 * assert.deepStrictEqual(tryCatch(() => 1), some(1))
 *
 * @since 2.0.0
 */
function tryCatch(f) {
    try {
        return some(f());
    }
    catch (e) {
        return exports.none;
    }
}
exports.tryCatch = tryCatch;
/**
 * Returns an `L` value if possible
 *
 * @since 2.0.0
 */
function getLeft(ma) {
    return ma._tag === 'Right' ? exports.none : some(ma.left);
}
exports.getLeft = getLeft;
/**
 * Returns an `A` value if possible
 *
 * @since 2.0.0
 */
function getRight(ma) {
    return ma._tag === 'Left' ? exports.none : some(ma.right);
}
exports.getRight = getRight;
/**
 * Returns a refinement from a prism.
 * This function ensures that a custom type guard definition is type-safe.
 *
 * ```ts
 * import { some, none, getRefinement } from 'fp-ts/lib/Option'
 *
 * type A = { type: 'A' }
 * type B = { type: 'B' }
 * type C = A | B
 *
 * const isA = (c: C): c is A => c.type === 'B' // <= typo but typescript doesn't complain
 * const isA = getRefinement<C, A>(c => (c.type === 'B' ? some(c) : none)) // static error: Type '"B"' is not assignable to type '"A"'
 * ```
 *
 * @since 2.0.0
 */
function getRefinement(getOption) {
    return function (a) { return isSome(getOption(a)); };
}
exports.getRefinement = getRefinement;
/**
 * @since 2.0.0
 */
function mapNullable(f) {
    return function (ma) { return (isNone(ma) ? exports.none : fromNullable(f(ma.value))); };
}
exports.mapNullable = mapNullable;
/**
 * @since 2.0.0
 */
function getShow(S) {
    return {
        show: function (ma) { return (isNone(ma) ? 'none' : "some(" + S.show(ma.value) + ")"); }
    };
}
exports.getShow = getShow;
/**
 * @example
 * import { none, some, getEq } from 'fp-ts/lib/Option'
 * import { eqNumber } from 'fp-ts/lib/Eq'
 *
 * const E = getEq(eqNumber)
 * assert.strictEqual(E.equals(none, none), true)
 * assert.strictEqual(E.equals(none, some(1)), false)
 * assert.strictEqual(E.equals(some(1), none), false)
 * assert.strictEqual(E.equals(some(1), some(2)), false)
 * assert.strictEqual(E.equals(some(1), some(1)), true)
 *
 * @since 2.0.0
 */
function getEq(E) {
    return Eq_1.fromEquals(function (x, y) { return (isNone(x) ? isNone(y) : isNone(y) ? false : E.equals(x.value, y.value)); });
}
exports.getEq = getEq;
/**
 * The `Ord` instance allows `Option` values to be compared with
 * `compare`, whenever there is an `Ord` instance for
 * the type the `Option` contains.
 *
 * `None` is considered to be less than any `Some` value.
 *
 *
 * @example
 * import { none, some, getOrd } from 'fp-ts/lib/Option'
 * import { ordNumber } from 'fp-ts/lib/Ord'
 *
 * const O = getOrd(ordNumber)
 * assert.strictEqual(O.compare(none, none), 0)
 * assert.strictEqual(O.compare(none, some(1)), -1)
 * assert.strictEqual(O.compare(some(1), none), 1)
 * assert.strictEqual(O.compare(some(1), some(2)), -1)
 * assert.strictEqual(O.compare(some(1), some(1)), 0)
 *
 * @since 2.0.0
 */
function getOrd(O) {
    return Ord_1.fromCompare(function (x, y) { return (isSome(x) ? (isSome(y) ? O.compare(x.value, y.value) : 1) : -1); });
}
exports.getOrd = getOrd;
/**
 * `Apply` semigroup
 *
 * | x       | y       | concat(x, y)       |
 * | ------- | ------- | ------------------ |
 * | none    | none    | none               |
 * | some(a) | none    | none               |
 * | none    | some(a) | none               |
 * | some(a) | some(b) | some(concat(a, b)) |
 *
 * @example
 * import { getApplySemigroup, some, none } from 'fp-ts/lib/Option'
 * import { semigroupSum } from 'fp-ts/lib/Semigroup'
 *
 * const S = getApplySemigroup(semigroupSum)
 * assert.deepStrictEqual(S.concat(none, none), none)
 * assert.deepStrictEqual(S.concat(some(1), none), none)
 * assert.deepStrictEqual(S.concat(none, some(1)), none)
 * assert.deepStrictEqual(S.concat(some(1), some(2)), some(3))
 *
 * @since 2.0.0
 */
function getApplySemigroup(S) {
    return {
        concat: function (x, y) { return (isSome(x) && isSome(y) ? some(S.concat(x.value, y.value)) : exports.none); }
    };
}
exports.getApplySemigroup = getApplySemigroup;
/**
 * @since 2.0.0
 */
function getApplyMonoid(M) {
    return __assign({}, getApplySemigroup(M), { empty: some(M.empty) });
}
exports.getApplyMonoid = getApplyMonoid;
/**
 * Monoid returning the left-most non-`None` value
 *
 * | x       | y       | concat(x, y) |
 * | ------- | ------- | ------------ |
 * | none    | none    | none         |
 * | some(a) | none    | some(a)      |
 * | none    | some(a) | some(a)      |
 * | some(a) | some(b) | some(a)      |
 *
 * @example
 * import { getFirstMonoid, some, none } from 'fp-ts/lib/Option'
 *
 * const M = getFirstMonoid<number>()
 * assert.deepStrictEqual(M.concat(none, none), none)
 * assert.deepStrictEqual(M.concat(some(1), none), some(1))
 * assert.deepStrictEqual(M.concat(none, some(1)), some(1))
 * assert.deepStrictEqual(M.concat(some(1), some(2)), some(1))
 *
 * @since 2.0.0
 */
function getFirstMonoid() {
    return {
        concat: function (x, y) { return (isNone(x) ? y : x); },
        empty: exports.none
    };
}
exports.getFirstMonoid = getFirstMonoid;
/**
 * Monoid returning the right-most non-`None` value
 *
 * | x       | y       | concat(x, y) |
 * | ------- | ------- | ------------ |
 * | none    | none    | none         |
 * | some(a) | none    | some(a)      |
 * | none    | some(a) | some(a)      |
 * | some(a) | some(b) | some(b)      |
 *
 * @example
 * import { getLastMonoid, some, none } from 'fp-ts/lib/Option'
 *
 * const M = getLastMonoid<number>()
 * assert.deepStrictEqual(M.concat(none, none), none)
 * assert.deepStrictEqual(M.concat(some(1), none), some(1))
 * assert.deepStrictEqual(M.concat(none, some(1)), some(1))
 * assert.deepStrictEqual(M.concat(some(1), some(2)), some(2))
 *
 * @since 2.0.0
 */
function getLastMonoid() {
    return Monoid_1.getDualMonoid(getFirstMonoid());
}
exports.getLastMonoid = getLastMonoid;
/**
 * Monoid returning the left-most non-`None` value. If both operands are `Some`s then the inner values are
 * appended using the provided `Semigroup`
 *
 * | x       | y       | concat(x, y)       |
 * | ------- | ------- | ------------------ |
 * | none    | none    | none               |
 * | some(a) | none    | some(a)            |
 * | none    | some(a) | some(a)            |
 * | some(a) | some(b) | some(concat(a, b)) |
 *
 * @example
 * import { getMonoid, some, none } from 'fp-ts/lib/Option'
 * import { semigroupSum } from 'fp-ts/lib/Semigroup'
 *
 * const M = getMonoid(semigroupSum)
 * assert.deepStrictEqual(M.concat(none, none), none)
 * assert.deepStrictEqual(M.concat(some(1), none), some(1))
 * assert.deepStrictEqual(M.concat(none, some(1)), some(1))
 * assert.deepStrictEqual(M.concat(some(1), some(2)), some(3))
 *
 * @since 2.0.0
 */
function getMonoid(S) {
    return {
        concat: function (x, y) { return (isNone(x) ? y : isNone(y) ? x : some(S.concat(x.value, y.value))); },
        empty: exports.none
    };
}
exports.getMonoid = getMonoid;
var filter = function (fa, predicate) {
    return isNone(fa) ? exports.none : predicate(fa.value) ? fa : exports.none;
};
var partition = function (fa, predicate) {
    return {
        left: filter(fa, function_1.not(predicate)),
        right: filter(fa, predicate)
    };
};
var chain = function (fa, f) {
    return isNone(fa) ? exports.none : f(fa.value);
};
var traverse = function (F) { return function (ta, f) {
    return isNone(ta) ? F.of(exports.none) : F.map(f(ta.value), some);
}; };
var sequence = function (F) { return function (ta) {
    return isNone(ta) ? F.of(exports.none) : F.map(ta.value, some);
}; };
var defaultSeparate = { left: exports.none, right: exports.none };
var map = function (ma, f) {
    return isNone(ma) ? exports.none : some(f(ma.value));
};
var separate = function (ma) {
    var o = map(ma, function (e) { return ({
        left: getLeft(e),
        right: getRight(e)
    }); });
    return isNone(o) ? defaultSeparate : o.value;
};
var wither = function (F) { return function (fa, f) {
    return isNone(fa) ? F.of(exports.none) : f(fa.value);
}; };
var wilt = function (F) { return function (fa, f) {
    var o = map(fa, function (a) {
        return F.map(f(a), function (e) { return ({
            left: getLeft(e),
            right: getRight(e)
        }); });
    });
    return isNone(o)
        ? F.of({
            left: exports.none,
            right: exports.none
        })
        : o.value;
}; };
var zero = function () { return exports.none; };
/**
 * @since 2.0.0
 */
exports.option = {
    URI: exports.URI,
    map: map,
    of: some,
    ap: function (mab, ma) { return (isNone(mab) ? exports.none : isNone(ma) ? exports.none : some(mab.value(ma.value))); },
    chain: chain,
    reduce: function (fa, b, f) { return (isNone(fa) ? b : f(b, fa.value)); },
    foldMap: function (M) { return function (fa, f) { return (isNone(fa) ? M.empty : f(fa.value)); }; },
    reduceRight: function (fa, b, f) { return (isNone(fa) ? b : f(fa.value, b)); },
    traverse: traverse,
    sequence: sequence,
    zero: zero,
    alt: function (ma, f) { return (isNone(ma) ? f() : ma); },
    extend: function (wa, f) { return (isNone(wa) ? exports.none : some(f(wa))); },
    compact: function (ma) { return chain(ma, function_1.identity); },
    separate: separate,
    filter: filter,
    filterMap: chain,
    partition: partition,
    partitionMap: function (fa, f) { return separate(map(fa, f)); },
    wither: wither,
    wilt: wilt
};
