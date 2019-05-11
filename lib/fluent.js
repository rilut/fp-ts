"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var function_1 = require("./function");
/**
 * @since 2.0.0
 */
var Fluent = /** @class */ (function () {
    function Fluent(I, value) {
        this.I = I;
        this.value = value;
    }
    Fluent.prototype.show = function () {
        return this.I.show(this.value);
    };
    Fluent.prototype.equals = function (that) {
        return this.I.equals(this.value, that);
    };
    Fluent.prototype.compare = function (that) {
        return this.I.compare(this.value, that);
    };
    Fluent.prototype.concat = function (that) {
        return this.I.concat(this.value, that);
    };
    Fluent.prototype.map = function (f) {
        return new Fluent(this.I, this.I.map(this.value, f));
    };
    Fluent.prototype.mapWithIndex = function (f) {
        return new Fluent(this.I, this.I.mapWithIndex(this.value, f));
    };
    Fluent.prototype.ap = function (fab) {
        return new Fluent(this.I, this.I.ap(fab, this.value));
    };
    Fluent.prototype.apFirst = function (that) {
        return new Fluent(this.I, this.I.ap(this.I.map(this.value, function (a) { return function () { return a; }; }), that));
    };
    Fluent.prototype.apSecond = function (that) {
        return new Fluent(this.I, this.I.ap(this.I.map(this.value, function () { return function (b) { return b; }; }), that));
    };
    Fluent.prototype.chain = function (f) {
        return new Fluent(this.I, this.I.chain(this.value, f));
    };
    Fluent.prototype.flatten = function () {
        return new Fluent(this.I, this.I.chain(this.value, function_1.identity));
    };
    Fluent.prototype.extend = function (f) {
        return new Fluent(this.I, this.I.extend(this.value, f));
    };
    Fluent.prototype.duplicate = function () {
        return new Fluent(this.I, this.I.extend(this.value, function_1.identity));
    };
    Fluent.prototype.reduce = function (b, f) {
        return this.I.reduce(this.value, b, f);
    };
    Fluent.prototype.foldMap = function (M) {
        var _this = this;
        var foldMapM = this.I.foldMap(M);
        return function (f) { return foldMapM(_this.value, f); };
    };
    Fluent.prototype.reduceRight = function (b, f) {
        return this.I.reduceRight(this.value, b, f);
    };
    Fluent.prototype.reduceWithIndex = function (b, f) {
        return this.I.reduceWithIndex(this.value, b, f);
    };
    Fluent.prototype.foldMapWithIndex = function (M) {
        var _this = this;
        var foldMapWithIndexM = this.I.foldMapWithIndex(M);
        return function (f) { return foldMapWithIndexM(_this.value, f); };
    };
    Fluent.prototype.reduceRightWithIndex = function (b, f) {
        return this.I.reduceRightWithIndex(this.value, b, f);
    };
    Fluent.prototype.alt = function (that) {
        return new Fluent(this.I, this.I.alt(this.value, that));
    };
    Fluent.prototype.compact = function () {
        return new Fluent(this.I, this.I.compact(this.value));
    };
    Fluent.prototype.separate = function () {
        return this.I.separate(this.value);
    };
    Fluent.prototype.filter = function (predicate) {
        return new Fluent(this.I, this.I.filter(this.value, predicate));
    };
    Fluent.prototype.filterMap = function (f) {
        return new Fluent(this.I, this.I.filterMap(this.value, f));
    };
    Fluent.prototype.partition = function (predicate) {
        return this.I.partition(this.value, predicate);
    };
    Fluent.prototype.partitionMap = function (f) {
        return this.I.partitionMap(this.value, f);
    };
    Fluent.prototype.filterWithIndex = function (p) {
        return new Fluent(this.I, this.I.filterWithIndex(this.value, p));
    };
    Fluent.prototype.filterMapWithIndex = function (f) {
        return new Fluent(this.I, this.I.filterMapWithIndex(this.value, f));
    };
    Fluent.prototype.partitionWithIndex = function (p) {
        return this.I.partitionWithIndex(this.value, p);
    };
    Fluent.prototype.partitionMapWithIndex = function (f) {
        return this.I.partitionMapWithIndex(this.value, f);
    };
    Fluent.prototype.bimap = function (f, g) {
        return new Fluent(this.I, this.I.bimap(this.value, f, g));
    };
    Fluent.prototype.mapLeft = function (f) {
        return new Fluent(this.I, this.I.mapLeft(this.value, f));
    };
    Fluent.prototype.promap = function (f, g) {
        return new Fluent(this.I, this.I.promap(this.value, f, g));
    };
    Fluent.prototype.compose = function (that) {
        return new Fluent(this.I, this.I.compose(that, this.value));
    };
    return Fluent;
}());
exports.Fluent = Fluent;
function fluent(I) {
    return function (fa) { return new Fluent(I, fa); };
}
exports.fluent = fluent;
