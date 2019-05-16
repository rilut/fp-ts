"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var function_1 = require("./function");
/**
 * @since 2.0.0
 */
var Wrapper = /** @class */ (function () {
    function Wrapper(I, value) {
        this.I = I;
        this.value = value;
    }
    Wrapper.prototype.pipe = function (f) {
        return new Wrapper(this.I, f(this.value));
    };
    Wrapper.prototype.apply = function (f) {
        return f(this.value);
    };
    Wrapper.prototype.show = function () {
        return this.I.show(this.value);
    };
    Wrapper.prototype.equals = function (that) {
        return this.I.equals(this.value, that);
    };
    Wrapper.prototype.compare = function (that) {
        return this.I.compare(this.value, that);
    };
    Wrapper.prototype.concat = function (that) {
        return this.I.concat(this.value, that);
    };
    Wrapper.prototype.map = function (f) {
        return new Wrapper(this.I, this.I.map(this.value, f));
    };
    Wrapper.prototype.mapWithIndex = function (f) {
        return new Wrapper(this.I, this.I.mapWithIndex(this.value, f));
    };
    Wrapper.prototype.ap = function (fab) {
        return new Wrapper(this.I, this.I.ap(fab, this.value));
    };
    Wrapper.prototype.apFirst = function (that) {
        return new Wrapper(this.I, this.I.ap(this.I.map(this.value, function (a) { return function () { return a; }; }), that));
    };
    Wrapper.prototype.apSecond = function (that) {
        return new Wrapper(this.I, this.I.ap(this.I.map(this.value, function () { return function (b) { return b; }; }), that));
    };
    Wrapper.prototype.chain = function (f) {
        return new Wrapper(this.I, this.I.chain(this.value, f));
    };
    Wrapper.prototype.flatten = function () {
        return new Wrapper(this.I, this.I.chain(this.value, function_1.identity));
    };
    Wrapper.prototype.extend = function (f) {
        return new Wrapper(this.I, this.I.extend(this.value, f));
    };
    Wrapper.prototype.duplicate = function () {
        return new Wrapper(this.I, this.I.extend(this.value, function_1.identity));
    };
    Wrapper.prototype.reduce = function (b, f) {
        return this.I.reduce(this.value, b, f);
    };
    Wrapper.prototype.foldMap = function (M) {
        var _this = this;
        var foldMapM = this.I.foldMap(M);
        return function (f) { return foldMapM(_this.value, f); };
    };
    Wrapper.prototype.reduceRight = function (b, f) {
        return this.I.reduceRight(this.value, b, f);
    };
    Wrapper.prototype.reduceWithIndex = function (b, f) {
        return this.I.reduceWithIndex(this.value, b, f);
    };
    Wrapper.prototype.foldMapWithIndex = function (M) {
        var _this = this;
        var foldMapWithIndexM = this.I.foldMapWithIndex(M);
        return function (f) { return foldMapWithIndexM(_this.value, f); };
    };
    Wrapper.prototype.reduceRightWithIndex = function (b, f) {
        return this.I.reduceRightWithIndex(this.value, b, f);
    };
    Wrapper.prototype.alt = function (that) {
        return new Wrapper(this.I, this.I.alt(this.value, that));
    };
    Wrapper.prototype.compact = function () {
        return new Wrapper(this.I, this.I.compact(this.value));
    };
    Wrapper.prototype.separate = function () {
        return this.I.separate(this.value);
    };
    Wrapper.prototype.filter = function (predicate) {
        return new Wrapper(this.I, this.I.filter(this.value, predicate));
    };
    Wrapper.prototype.filterMap = function (f) {
        return new Wrapper(this.I, this.I.filterMap(this.value, f));
    };
    Wrapper.prototype.partition = function (predicate) {
        return this.I.partition(this.value, predicate);
    };
    Wrapper.prototype.partitionMap = function (f) {
        return this.I.partitionMap(this.value, f);
    };
    Wrapper.prototype.filterWithIndex = function (p) {
        return new Wrapper(this.I, this.I.filterWithIndex(this.value, p));
    };
    Wrapper.prototype.filterMapWithIndex = function (f) {
        return new Wrapper(this.I, this.I.filterMapWithIndex(this.value, f));
    };
    Wrapper.prototype.partitionWithIndex = function (p) {
        return this.I.partitionWithIndex(this.value, p);
    };
    Wrapper.prototype.partitionMapWithIndex = function (f) {
        return this.I.partitionMapWithIndex(this.value, f);
    };
    Wrapper.prototype.bimap = function (f, g) {
        return new Wrapper(this.I, this.I.bimap(this.value, f, g));
    };
    Wrapper.prototype.mapLeft = function (f) {
        return new Wrapper(this.I, this.I.mapLeft(this.value, f));
    };
    Wrapper.prototype.promap = function (f, g) {
        return new Wrapper(this.I, this.I.promap(this.value, f, g));
    };
    Wrapper.prototype.compose = function (that) {
        return new Wrapper(this.I, this.I.compose(that, this.value));
    };
    return Wrapper;
}());
function fluent(I) {
    return function (fa) { return new Wrapper(I, fa); };
}
exports.fluent = fluent;
