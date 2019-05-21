"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var A = require("./Array");
var Semigroup_1 = require("./Semigroup");
var Option_1 = require("./Option");
/**
 * @since 2.0.0
 */
exports.URI = 'NonEmptyArray';
/**
 * Builds a `NonEmptyArray` from a provably (compile time) non empty `Array`.
 *
 * @since 2.0.0
 */
function make(as) {
    return as;
}
exports.make = make;
/**
 * Append an element to the front of an array, creating a new non empty array
 *
 * @example
 * import { cons } from 'fp-ts/lib/NonEmptyArray'
 *
 * assert.deepStrictEqual(cons(1, [2, 3, 4]), [1, 2, 3, 4])
 *
 * @since 2.0.0
 */
exports.cons = A.cons;
/**
 * Append an element to the end of an array, creating a new non empty array
 *
 * @example
 * import { snoc } from 'fp-ts/lib/NonEmptyArray'
 *
 * assert.deepStrictEqual(snoc([1, 2, 3], 4), [1, 2, 3, 4])
 *
 * @since 2.0.0
 */
exports.snoc = A.snoc;
/**
 * Builds a `NonEmptyArray` from an `Array` returning `none` if `as` is an empty array
 *
 * @since 2.0.0
 */
function fromArray(as) {
    return as.length > 0 ? Option_1.some(as) : Option_1.none;
}
exports.fromArray = fromArray;
/**
 * @since 2.0.0
 */
function getShow(S) {
    var SA = A.getShow(S);
    return {
        show: function (arr) { return "make(" + SA.show(arr) + ")"; }
    };
}
exports.getShow = getShow;
/**
 * @since 2.0.0
 */
function head(nea) {
    return nea[0];
}
exports.head = head;
/**
 * @since 2.0.0
 */
function tail(nea) {
    return nea.slice(1);
}
exports.tail = tail;
/**
 * @since 2.0.0
 */
exports.reverse = A.reverse;
/**
 * @since 2.0.0
 */
function min(ord) {
    var S = Semigroup_1.getMeetSemigroup(ord);
    return function (nea) { return nea.reduce(S.concat); };
}
exports.min = min;
/**
 * @since 2.0.0
 */
function max(ord) {
    var S = Semigroup_1.getJoinSemigroup(ord);
    return function (nea) { return nea.reduce(S.concat); };
}
exports.max = max;
/**
 * Builds a `Semigroup` instance for `NonEmptyArray`
 *
 * @since 2.0.0
 */
function getSemigroup() {
    return {
        concat: function (x, y) { return x.concat(y); }
    };
}
exports.getSemigroup = getSemigroup;
/**
 * @example
 * import { make, getEq, cons } from 'fp-ts/lib/NonEmptyArray'
 * import { eqNumber } from 'fp-ts/lib/Eq'
 *
 * const E = getEq(eqNumber)
 * assert.strictEqual(E.equals(cons(1, [2]), make([1, 2])), true)
 * assert.strictEqual(E.equals(cons(1, [2]), make([1, 3])), false)
 *
 * @since 2.0.0
 */
exports.getEq = A.getEq;
/**
 * Group equal, consecutive elements of an array into non empty arrays.
 *
 * @example
 * import { cons, group } from 'fp-ts/lib/NonEmptyArray'
 * import { ordNumber } from 'fp-ts/lib/Ord'
 *
 * assert.deepStrictEqual(group(ordNumber)([1, 2, 1, 1]), [
 *   cons(1, []),
 *   cons(2, []),
 *   cons(1, [1])
 * ])
 *
 * @since 2.0.0
 */
function group(E) {
    return function (as) {
        var len = as.length;
        if (len === 0) {
            return A.empty;
        }
        var r = [];
        var head = as[0];
        var nea = make([head]);
        for (var i = 1; i < len; i++) {
            var x = as[i];
            if (E.equals(x, head)) {
                nea.push(x);
            }
            else {
                r.push(nea);
                head = x;
                nea = make([head]);
            }
        }
        r.push(nea);
        return r;
    };
}
exports.group = group;
/**
 * Sort and then group the elements of an array into non empty arrays.
 *
 * @example
 * import { cons, groupSort } from 'fp-ts/lib/NonEmptyArray'
 * import { ordNumber } from 'fp-ts/lib/Ord'
 *
 * assert.deepStrictEqual(groupSort(ordNumber)([1, 2, 1, 1]), [cons(1, [1, 1]), cons(2, [])])
 *
 * @since 2.0.0
 */
function groupSort(O) {
    var sortO = A.sort(O);
    var groupO = group(O);
    return function (as) { return groupO(sortO(as)); };
}
exports.groupSort = groupSort;
/**
 * Splits an array into sub-non-empty-arrays stored in an object, based on the result of calling a `string`-returning
 * function on each element, and grouping the results according to values returned
 *
 * @example
 * import { cons, groupBy } from 'fp-ts/lib/NonEmptyArray'
 *
 * assert.deepStrictEqual(groupBy(['foo', 'bar', 'foobar'], a => String(a.length)), {
 *   '3': cons('foo', ['bar']),
 *   '6': cons('foobar', [])
 * })
 *
 * @since 2.0.0
 */
function groupBy(as, f) {
    var r = {};
    for (var _i = 0, as_1 = as; _i < as_1.length; _i++) {
        var a = as_1[_i];
        var k = f(a);
        if (r.hasOwnProperty(k)) {
            r[k].push(a);
        }
        else {
            r[k] = exports.cons(a, []);
        }
    }
    return r;
}
exports.groupBy = groupBy;
/**
 * @since 2.0.0
 */
function last(nea) {
    return nea[nea.length - 1];
}
exports.last = last;
/**
 * @since 2.0.0
 */
function sort(O) {
    return A.sort(O);
}
exports.sort = sort;
function findFirst(nea, predicate) {
    return A.findFirst(nea, predicate);
}
exports.findFirst = findFirst;
function findLast(nea, predicate) {
    return A.findLast(nea, predicate);
}
exports.findLast = findLast;
/**
 * @since 2.0.0
 */
function findIndex(nea, predicate) {
    return A.findIndex(nea, predicate);
}
exports.findIndex = findIndex;
/**
 * @since 2.0.0
 */
function findLastIndex(nea, predicate) {
    return A.findLastIndex(nea, predicate);
}
exports.findLastIndex = findLastIndex;
/**
 * @since 2.0.0
 */
function insertAt(i, a, nea) {
    return A.insertAt(i, a, nea);
}
exports.insertAt = insertAt;
/**
 * @since 2.0.0
 */
function updateAt(i, a, nea) {
    return A.updateAt(i, a, nea);
}
exports.updateAt = updateAt;
/**
 * @since 2.0.0
 */
function modifyAt(i, nea, f) {
    return A.modifyAt(i, nea, f);
}
exports.modifyAt = modifyAt;
/**
 * @since 2.0.0
 */
exports.copy = A.copy;
function filter(nea, predicate) {
    return filterWithIndex(nea, function (_, a) { return predicate(a); });
}
exports.filter = filter;
/**
 * @since 2.0.0
 */
function filterWithIndex(nea, predicate) {
    return fromArray(nea.filter(function (a, i) { return predicate(i, a); }));
}
exports.filterWithIndex = filterWithIndex;
var mapWithIndex = function (fa, f) {
    return fa.map(function (a, i) { return f(i, a); });
};
/**
 * @since 2.0.0
 */
exports.nonEmptyArray = {
    URI: exports.URI,
    map: A.array.map,
    mapWithIndex: mapWithIndex,
    of: A.array.of,
    ap: A.array.ap,
    chain: A.array.chain,
    extend: A.array.extend,
    extract: head,
    reduce: A.array.reduce,
    foldMap: A.array.foldMap,
    reduceRight: A.array.reduceRight,
    traverse: A.array.traverse,
    sequence: A.array.sequence,
    reduceWithIndex: A.array.reduceWithIndex,
    foldMapWithIndex: A.array.foldMapWithIndex,
    reduceRightWithIndex: A.array.reduceRightWithIndex,
    traverseWithIndex: A.array.traverseWithIndex
};
