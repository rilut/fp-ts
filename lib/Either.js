"use strict";
/**
 * @file Represents a value of one of two possible types (a disjoint union).
 *
 * An instance of `Either` is either an instance of `Left` or `Right`.
 *
 * A common use of `Either` is as an alternative to `Option` for dealing with possible missing values. In this usage,
 * `None` is replaced with a `Left` which can contain useful information. `Right` takes the place of `Some`. Convention
 * dictates that `Left` is used for failure and `Right` is used for success.
 *
 * For example, you could use `Either<string, number>` to detect whether a received input is a `string` or a `number`.
 *
 * ```ts
 * const parse = (errorMessage: string) => (input: string): Either<string, number> => {
 *   const n = parseInt(input, 10)
 *   return isNaN(n) ? left(errorMessage) : right(n)
 * }
 * ```
 *
 * `Either` is right-biased, which means that `Right` is assumed to be the default case to operate on. If it is `Left`,
 * operations like `map`, `chain`, ... return the `Left` value unchanged:
 *
 * ```ts
 * import { either } from 'fp-ts/lib/Either'
 *
 * either.map(right(12), double) // right(24)
 * either.map(left(23), double)  // left(23)
 * ```
 */
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
var ChainRec_1 = require("./ChainRec");
var Eq_1 = require("./Eq");
var function_1 = require("./function");
/**
 * @since 2.0.0
 */
exports.URI = 'Either';
/**
 * Constructs a new `Either` holding a `Left` value. This usually represents a failure, due to the right-bias of this
 * structure
 *
 * @since 2.0.0
 */
function left(l) {
    return { _tag: 'Left', left: l };
}
exports.left = left;
/**
 * Constructs a new `Either` holding a `Right` value. This usually represents a successful value due to the right bias
 * of this structure
 *
 * @since 2.0.0
 */
function right(a) {
    return { _tag: 'Right', right: a };
}
exports.right = right;
/**
 * @since 2.0.0
 */
function fromOption(ma, onNone) {
    return ma._tag === 'None' ? left(onNone()) : right(ma.value);
}
exports.fromOption = fromOption;
function fromPredicate(predicate, onFalse) {
    return function (a) { return (predicate(a) ? right(a) : left(onFalse(a))); };
}
exports.fromPredicate = fromPredicate;
/**
 * Takes a default and a nullable value, if the value is not nully, turn it into a `Right`, if the value is nully use
 * the provided default as a `Left`
 *
 * @since 2.0.0
 */
function fromNullable(a, l) {
    return a == null ? left(l) : right(a);
}
exports.fromNullable = fromNullable;
/**
 * Default value for the `onError` argument of `tryCatch`
 *
 * @since 2.0.0
 */
function toError(e) {
    return e instanceof Error ? e : new Error(String(e));
}
exports.toError = toError;
/**
 * Constructs a new `Either` from a function that might throw
 *
 * @example
 * import { Either, left, right, tryCatch } from 'fp-ts/lib/Either'
 *
 * const unsafeHead = <A>(as: Array<A>): A => {
 *   if (as.length > 0) {
 *     return as[0]
 *   } else {
 *     throw new Error('empty array')
 *   }
 * }
 *
 * const head = <A>(as: Array<A>): Either<Error, A> => {
 *   return tryCatch(() => unsafeHead(as), e => (e instanceof Error ? e : new Error('unknown error')))
 * }
 *
 * assert.deepStrictEqual(head([]), left(new Error('empty array')))
 * assert.deepStrictEqual(head([1, 2, 3]), right(1))
 *
 * @since 2.0.0
 */
function tryCatch(f, onError) {
    try {
        return right(f());
    }
    catch (e) {
        return left(onError(e));
    }
}
exports.tryCatch = tryCatch;
/**
 * @since 2.0.0
 */
function fold(ma, onLeft, onRight) {
    return isLeft(ma) ? onLeft(ma.left) : onRight(ma.right);
}
exports.fold = fold;
/**
 * @since 2.0.0
 */
function getShow(SL, SA) {
    return {
        show: function (ma) { return (isLeft(ma) ? "left(" + SL.show(ma.left) + ")" : "right(" + SA.show(ma.right) + ")"); }
    };
}
exports.getShow = getShow;
/**
 * @since 2.0.0
 */
function getEq(SL, SA) {
    return Eq_1.fromEquals(function (x, y) {
        return isLeft(x) ? isLeft(y) && SL.equals(x.left, y.left) : isRight(y) && SA.equals(x.right, y.right);
    });
}
exports.getEq = getEq;
/**
 * Semigroup returning the left-most non-`Left` value. If both operands are `Right`s then the inner values are
 * appended using the provided `Semigroup`
 *
 * @example
 * import { getSemigroup, left, right } from 'fp-ts/lib/Either'
 * import { semigroupSum } from 'fp-ts/lib/Semigroup'
 *
 * const S = getSemigroup<string, number>(semigroupSum)
 * assert.deepStrictEqual(S.concat(left('a'), left('b')), left('a'))
 * assert.deepStrictEqual(S.concat(left('a'), right(2)), right(2))
 * assert.deepStrictEqual(S.concat(right(1), left('b')), right(1))
 * assert.deepStrictEqual(S.concat(right(1), right(2)), right(3))
 *
 *
 * @since 2.0.0
 */
function getSemigroup(S) {
    return {
        concat: function (x, y) { return (isLeft(y) ? x : isLeft(x) ? y : right(S.concat(x.right, y.right))); }
    };
}
exports.getSemigroup = getSemigroup;
/**
 * `Apply` semigroup
 *
 * @example
 * import { getApplySemigroup, left, right } from 'fp-ts/lib/Either'
 * import { semigroupSum } from 'fp-ts/lib/Semigroup'
 *
 * const S = getApplySemigroup<string, number>(semigroupSum)
 * assert.deepStrictEqual(S.concat(left('a'), left('b')), left('a'))
 * assert.deepStrictEqual(S.concat(left('a'), right(2)), left('a'))
 * assert.deepStrictEqual(S.concat(right(1), left('b')), left('b'))
 * assert.deepStrictEqual(S.concat(right(1), right(2)), right(3))
 *
 *
 * @since 2.0.0
 */
function getApplySemigroup(S) {
    return {
        concat: function (x, y) { return (isLeft(x) ? x : isLeft(y) ? y : right(S.concat(x.right, y.right))); }
    };
}
exports.getApplySemigroup = getApplySemigroup;
/**
 * @since 2.0.0
 */
function getApplyMonoid(M) {
    return __assign({}, getApplySemigroup(M), { empty: right(M.empty) });
}
exports.getApplyMonoid = getApplyMonoid;
/**
 * Returns `true` if the either is an instance of `Left`, `false` otherwise
 *
 * @since 2.0.0
 */
function isLeft(ma) {
    switch (ma._tag) {
        case 'Left':
            return true;
        case 'Right':
            return false;
    }
}
exports.isLeft = isLeft;
/**
 * Returns `true` if the either is an instance of `Right`, `false` otherwise
 *
 * @since 2.0.0
 */
function isRight(ma) {
    return isLeft(ma) ? false : true;
}
exports.isRight = isRight;
/**
 * @since 2.0.0
 */
function swap(ma) {
    return isLeft(ma) ? right(ma.left) : left(ma.right);
}
exports.swap = swap;
/**
 * @since 2.0.0
 */
function orElse(ma, f) {
    return isLeft(ma) ? f(ma.left) : ma;
}
exports.orElse = orElse;
/**
 * @since 2.0.0
 */
function getOrElse(ma, f) {
    return isLeft(ma) ? f(ma.left) : ma.right;
}
exports.getOrElse = getOrElse;
function filterOrElse(ma, predicate, zero) {
    return isLeft(ma) ? ma : predicate(ma.right) ? ma : left(zero(ma.right));
}
exports.filterOrElse = filterOrElse;
/**
 * Converts a JavaScript Object Notation (JSON) string into an object.
 *
 * @example
 * import { parseJSON, toError, right, left } from 'fp-ts/lib/Either'
 *
 * assert.deepStrictEqual(parseJSON('{"a":1}', toError), right({ a: 1 }))
 * assert.deepStrictEqual(parseJSON('{"a":}', toError), left(new SyntaxError('Unexpected token } in JSON at position 5')))
 *
 * @since 2.0.0
 */
function parseJSON(s, onError) {
    return tryCatch(function () { return JSON.parse(s); }, onError);
}
exports.parseJSON = parseJSON;
/**
 * Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
 *
 * @example
 * import { stringifyJSON, toError, right, left } from 'fp-ts/lib/Either'
 *
 * assert.deepStrictEqual(stringifyJSON({ a: 1 }, toError), right('{"a":1}'))
 * const circular: any = { ref: null }
 * circular.ref = circular
 * assert.deepStrictEqual(stringifyJSON(circular, toError), left(new TypeError('Converting circular structure to JSON')))
 *
 * @since 2.0.0
 */
function stringifyJSON(u, onError) {
    return tryCatch(function () { return JSON.stringify(u); }, onError);
}
exports.stringifyJSON = stringifyJSON;
//
// instances
//
var map = function (ma, f) {
    return isLeft(ma) ? ma : right(f(ma.right));
};
var ap = function (mab, ma) {
    return isLeft(mab) ? mab : fold(ma, left, function (a) { return right(mab.right(a)); });
};
var chain = function (ma, f) {
    return isLeft(ma) ? ma : f(ma.right);
};
var bimap = function (ma, f, g) {
    return isLeft(ma) ? left(f(ma.left)) : right(g(ma.right));
};
var extend = function (ma, f) {
    return isLeft(ma) ? ma : right(f(ma));
};
var reduce = function (ma, b, f) {
    return isLeft(ma) ? b : f(b, ma.right);
};
var foldMap = function (M) { return function (ma, f) {
    return isLeft(ma) ? M.empty : f(ma.right);
}; };
var reduceRight = function (ma, b, f) {
    return isLeft(ma) ? b : f(ma.right, b);
};
var traverse = function (F) { return function (ma, f) {
    return isLeft(ma) ? F.of(left(ma.left)) : F.map(f(ma.right), of);
}; };
var sequence = function (F) { return function (ma) {
    return isLeft(ma) ? F.of(left(ma.left)) : F.map(ma.right, right);
}; };
var chainRec = function (a, f) {
    return ChainRec_1.tailRec(f(a), function (e) {
        return isLeft(e)
            ? right(left(e.left))
            : isLeft(e.right)
                ? left(f(e.right.left))
                : right(right(e.right.right));
    });
};
var of = right;
/**
 * Builds `Compactable` instance for `Either` given a `Monoid` for the left side
 *
 * @since 2.0.0
 */
function getCompactable(M) {
    var empty = left(M.empty);
    var onNone = function () { return M.empty; };
    var compact = function (ma) {
        return isLeft(ma) ? ma : fromOption(ma.right, onNone);
    };
    var separate = function (ma) {
        return isLeft(ma)
            ? { left: ma, right: ma }
            : isLeft(ma.right)
                ? { left: right(ma.right.left), right: empty }
                : { left: empty, right: right(ma.right.right) };
    };
    return {
        URI: exports.URI,
        _L: function_1.phantom,
        compact: compact,
        separate: separate
    };
}
exports.getCompactable = getCompactable;
/**
 * Builds `Filterable` instance for `Either` given a `Monoid` for the left side
 *
 * @since 2.0.0
 */
function getFilterable(M) {
    var C = getCompactable(M);
    var empty = left(M.empty);
    var onNone = function () { return M.empty; };
    var partitionMap = function (ma, f) {
        if (isLeft(ma)) {
            return { left: ma, right: ma };
        }
        var e = f(ma.right);
        return isLeft(e) ? { left: right(e.left), right: empty } : { left: empty, right: right(e.right) };
    };
    var partition = function (ma, p) {
        return isLeft(ma)
            ? { left: ma, right: ma }
            : p(ma.right)
                ? { left: empty, right: right(ma.right) }
                : { left: right(ma.right), right: empty };
    };
    var filterMap = function (ma, f) {
        return isLeft(ma) ? ma : fromOption(f(ma.right), onNone);
    };
    var filter = function (ma, p) { return filterOrElse(ma, p, function () { return M.empty; }); };
    return __assign({}, C, { map: map,
        partitionMap: partitionMap,
        filterMap: filterMap,
        partition: partition,
        filter: filter });
}
exports.getFilterable = getFilterable;
/**
 * Builds `Witherable` instance for `Either` given `Monoid` for the left side
 *
 * @since 2.0.0
 */
function getWitherable(M) {
    var filterableM = getFilterable(M);
    var wither = function (F) {
        var traverseF = traverse(F);
        return function (ma, f) { return F.map(traverseF(ma, f), filterableM.compact); };
    };
    var wilt = function (F) {
        var traverseF = traverse(F);
        return function (ma, f) { return F.map(traverseF(ma, f), filterableM.separate); };
    };
    return __assign({}, filterableM, { traverse: traverse,
        sequence: sequence,
        reduce: reduce,
        foldMap: foldMap,
        reduceRight: reduceRight,
        wither: wither,
        wilt: wilt });
}
exports.getWitherable = getWitherable;
/**
 * @since 2.0.0
 */
exports.either = {
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
    bimap: bimap,
    mapLeft: function (ma, f) { return (isLeft(ma) ? left(f(ma.left)) : ma); },
    alt: orElse,
    extend: extend,
    chainRec: chainRec
};
