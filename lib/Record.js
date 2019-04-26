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
var Option_1 = require("./Option");
var Eq_1 = require("./Eq");
var Show_1 = require("./Show");
exports.URI = 'Record';
/**
 * @since 2.0.0
 */
exports.getShow = function (S) {
    return {
        show: function (r) {
            var elements = collect(r, function (k, a) { return Show_1.showString.show(k) + ": " + S.show(a); }).join(', ');
            return elements === '' ? '{}' : "{ " + elements + " }";
        }
    };
};
/**
 * Calculate the number of key/value pairs in a record
 *
 * @since 2.0.0
 */
exports.size = function (r) {
    return Object.keys(r).length;
};
/**
 * Test whether a record is empty
 *
 * @since 2.0.0
 */
exports.isEmpty = function (r) {
    return Object.keys(r).length === 0;
};
var unorderedKeys = function (r) { return Object.keys(r); };
/**
 * @since 2.0.0
 */
function keys(r) {
    return unorderedKeys(r).sort();
}
exports.keys = keys;
/**
 * @since 2.0.0
 */
function collect(r, f) {
    var out = [];
    for (var _i = 0, _a = keys(r); _i < _a.length; _i++) {
        var key = _a[_i];
        out.push(f(key, r[key]));
    }
    return out;
}
exports.collect = collect;
/**
 * @since 2.0.0
 */
function toArray(d) {
    return collect(d, function (k, a) { return [k, a]; });
}
exports.toArray = toArray;
function toUnfoldable(unfoldable) {
    return function (d) {
        var arr = toArray(d);
        var len = arr.length;
        return unfoldable.unfold(0, function (b) { return (b < len ? Option_1.some([arr[b], b + 1]) : Option_1.none); });
    };
}
exports.toUnfoldable = toUnfoldable;
function insert(k, a, d) {
    if (d[k] === a) {
        return d;
    }
    var r = Object.assign({}, d);
    r[k] = a;
    return r;
}
exports.insert = insert;
function remove(k, d) {
    if (!d.hasOwnProperty(k)) {
        return d;
    }
    var r = Object.assign({}, d);
    delete r[k];
    return r;
}
exports.remove = remove;
function pop(k, d) {
    var a = exports.lookup(k, d);
    return Option_1.isNone(a) ? Option_1.none : Option_1.some([a.value, remove(k, d)]);
}
exports.pop = pop;
/**
 * Test whether one record contains all of the keys and values contained in another record
 *
 * @since 2.0.0
 */
exports.isSubrecord = function (E) { return function (d1, d2) {
    for (var k in d1) {
        if (!d2.hasOwnProperty(k) || !E.equals(d1[k], d2[k])) {
            return false;
        }
    }
    return true;
}; };
function getEq(E) {
    var isSubrecordE = exports.isSubrecord(E);
    return Eq_1.fromEquals(function (x, y) { return isSubrecordE(x, y) && isSubrecordE(y, x); });
}
exports.getEq = getEq;
var emptyObject = {};
function getMonoid(S) {
    return {
        concat: function (x, y) {
            var r = __assign({}, x);
            var keys = Object.keys(y);
            var len = keys.length;
            for (var i = 0; i < len; i++) {
                var k = keys[i];
                r[k] = x.hasOwnProperty(k) ? S.concat(x[k], y[k]) : y[k];
            }
            return r;
        },
        empty: emptyObject
    };
}
exports.getMonoid = getMonoid;
/**
 * Lookup the value for a key in a record
 * @since 2.0.0
 */
exports.lookup = function (key, fa) {
    return fa.hasOwnProperty(key) ? Option_1.some(fa[key]) : Option_1.none;
};
function filter(fa, p) {
    return filterWithIndex(fa, function (_, a) { return p(a); });
}
exports.filter = filter;
/**
 * @since 2.0.0
 */
exports.empty = {};
function mapWithIndex(fa, f) {
    var r = {};
    var keys = Object.keys(fa);
    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
        var key = keys_1[_i];
        r[key] = f(key, fa[key]);
    }
    return r;
}
exports.mapWithIndex = mapWithIndex;
function map(fa, f) {
    return mapWithIndex(fa, function (_, a) { return f(a); });
}
exports.map = map;
var reduce = function (fa, b, f) {
    return reduceWithIndex(fa, b, function (_, b, a) { return f(b, a); });
};
var foldMap = function (M) {
    var foldMapWithIndexM = foldMapWithIndex(M);
    return function (fa, f) { return foldMapWithIndexM(fa, function (_, a) { return f(a); }); };
};
var reduceRight = function (fa, b, f) {
    return reduceRightWithIndex(fa, b, function (_, a, b) { return f(a, b); });
};
function reduceWithIndex(fa, b, f) {
    var out = b;
    var keys = Object.keys(fa).sort();
    var len = keys.length;
    for (var i = 0; i < len; i++) {
        var k = keys[i];
        out = f(k, out, fa[k]);
    }
    return out;
}
exports.reduceWithIndex = reduceWithIndex;
function foldMapWithIndex(M) {
    return function (fa, f) {
        var out = M.empty;
        var keys = Object.keys(fa).sort();
        var len = keys.length;
        for (var i = 0; i < len; i++) {
            var k = keys[i];
            out = M.concat(out, f(k, fa[k]));
        }
        return out;
    };
}
exports.foldMapWithIndex = foldMapWithIndex;
function reduceRightWithIndex(fa, b, f) {
    var out = b;
    var keys = Object.keys(fa).sort();
    var len = keys.length;
    for (var i = len - 1; i >= 0; i--) {
        var k = keys[i];
        out = f(k, fa[k], out);
    }
    return out;
}
exports.reduceRightWithIndex = reduceRightWithIndex;
/**
 * Create a record with one key/value pair
 *
 * @since 2.0.0
 */
exports.singleton = function (k, a) {
    var _a;
    return _a = {}, _a[k] = a, _a;
};
function traverseWithIndex(F) {
    return function (ta, f) {
        var keys = Object.keys(ta);
        if (keys.length === 0) {
            return F.of(exports.empty);
        }
        var fr = F.of({});
        var _loop_1 = function (key) {
            fr = F.ap(F.map(fr, function (r) { return function (b) {
                r[key] = b;
                return r;
            }; }), f(key, ta[key]));
        };
        for (var _i = 0, keys_2 = keys; _i < keys_2.length; _i++) {
            var key = keys_2[_i];
            _loop_1(key);
        }
        return fr;
    };
}
exports.traverseWithIndex = traverseWithIndex;
function traverse(F) {
    var traverseWithIndexF = traverseWithIndex(F);
    return function (ta, f) { return traverseWithIndexF(ta, function (_, a) { return f(a); }); };
}
exports.traverse = traverse;
function sequence(F) {
    var traverseWithIndexF = traverseWithIndex(F);
    return function (ta) { return traverseWithIndexF(ta, function (_, a) { return a; }); };
}
exports.sequence = sequence;
var compact = function (fa) {
    var r = {};
    var keys = Object.keys(fa);
    for (var _i = 0, keys_3 = keys; _i < keys_3.length; _i++) {
        var key = keys_3[_i];
        var optionA = fa[key];
        if (Option_1.isSome(optionA)) {
            r[key] = optionA.value;
        }
    }
    return r;
};
var partitionMap = function (fa, f) {
    return partitionMapWithIndex(fa, function (_, a) { return f(a); });
};
var partition = function (fa, p) {
    return partitionWithIndex(fa, function (_, a) { return p(a); });
};
var separate = function (fa) {
    var left = {};
    var right = {};
    var keys = Object.keys(fa);
    for (var _i = 0, keys_4 = keys; _i < keys_4.length; _i++) {
        var key = keys_4[_i];
        var e = fa[key];
        switch (e._tag) {
            case 'Left':
                left[key] = e.left;
                break;
            case 'Right':
                right[key] = e.right;
                break;
        }
    }
    return {
        left: left,
        right: right
    };
};
function wither(F) {
    var traverseF = traverse(F);
    return function (wa, f) { return F.map(traverseF(wa, f), compact); };
}
function wilt(F) {
    var traverseF = traverse(F);
    return function (wa, f) { return F.map(traverseF(wa, f), separate); };
}
var filterMap = function (fa, f) {
    return filterMapWithIndex(fa, function (_, a) { return f(a); });
};
function partitionMapWithIndex(fa, f) {
    var left = {};
    var right = {};
    var keys = Object.keys(fa);
    for (var _i = 0, keys_5 = keys; _i < keys_5.length; _i++) {
        var key = keys_5[_i];
        var e = f(key, fa[key]);
        switch (e._tag) {
            case 'Left':
                left[key] = e.left;
                break;
            case 'Right':
                right[key] = e.right;
                break;
        }
    }
    return {
        left: left,
        right: right
    };
}
exports.partitionMapWithIndex = partitionMapWithIndex;
function partitionWithIndex(fa, p) {
    var left = {};
    var right = {};
    var keys = Object.keys(fa);
    for (var _i = 0, keys_6 = keys; _i < keys_6.length; _i++) {
        var key = keys_6[_i];
        var a = fa[key];
        if (p(key, a)) {
            right[key] = a;
        }
        else {
            left[key] = a;
        }
    }
    return {
        left: left,
        right: right
    };
}
exports.partitionWithIndex = partitionWithIndex;
function filterMapWithIndex(fa, f) {
    var r = {};
    var keys = Object.keys(fa);
    for (var _i = 0, keys_7 = keys; _i < keys_7.length; _i++) {
        var key = keys_7[_i];
        var optionB = f(key, fa[key]);
        if (Option_1.isSome(optionB)) {
            r[key] = optionB.value;
        }
    }
    return r;
}
exports.filterMapWithIndex = filterMapWithIndex;
function filterWithIndex(fa, p) {
    var r = {};
    var changed = false;
    for (var key in fa) {
        if (fa.hasOwnProperty(key)) {
            var a = fa[key];
            if (p(key, a)) {
                r[key] = a;
            }
            else {
                changed = true;
            }
        }
    }
    return changed ? r : fa;
}
exports.filterWithIndex = filterWithIndex;
function fromFoldable(M, F) {
    var fromFoldableMapM = fromFoldableMap(M, F);
    return function (fka) { return fromFoldableMapM(fka, function_1.identity); };
}
exports.fromFoldable = fromFoldable;
function fromFoldableMap(M, F) {
    return function (ta, f) {
        return F.reduce(ta, {}, function (r, a) {
            var _a = f(a), k = _a[0], b = _a[1];
            r[k] = r.hasOwnProperty(k) ? M.concat(r[k], b) : b;
            return r;
        });
    };
}
exports.fromFoldableMap = fromFoldableMap;
/**
 * @since 2.0.0
 */
function every(fa, predicate) {
    for (var k in fa) {
        if (!predicate(fa[k])) {
            return false;
        }
    }
    return true;
}
exports.every = every;
/**
 * @since 2.0.0
 */
function some(fa, predicate) {
    for (var k in fa) {
        if (predicate(fa[k])) {
            return true;
        }
    }
    return false;
}
exports.some = some;
/**
 * @since 2.0.0
 */
function elem(E) {
    return function (a, fa) { return some(fa, function (x) { return E.equals(x, a); }); };
}
exports.elem = elem;
/**
 * @since 2.0.0
 */
exports.record = {
    URI: exports.URI,
    map: map,
    reduce: reduce,
    foldMap: foldMap,
    reduceRight: reduceRight,
    traverse: traverse,
    sequence: sequence,
    compact: compact,
    separate: separate,
    filter: filter,
    filterMap: filterMap,
    partition: partition,
    partitionMap: partitionMap,
    wither: wither,
    wilt: wilt,
    mapWithIndex: mapWithIndex,
    reduceWithIndex: reduceWithIndex,
    foldMapWithIndex: foldMapWithIndex,
    reduceRightWithIndex: reduceRightWithIndex,
    traverseWithIndex: traverseWithIndex,
    partitionMapWithIndex: partitionMapWithIndex,
    partitionWithIndex: partitionWithIndex,
    filterMapWithIndex: filterMapWithIndex,
    filterWithIndex: filterWithIndex
};
