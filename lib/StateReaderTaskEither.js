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
var RTE = require("./ReaderTaskEither");
var stateT = require("./StateT");
var Either_1 = require("./Either");
exports.URI = 'StateReaderTaskEither';
/**
 * @since 2.0.0
 */
function run(ma, s, e) {
    return ma(s)(e)();
}
exports.run = run;
/**
 * @since 2.0.0
 */
function evalState(ma, s, e) {
    return run(ma, s, e).then(function (e) { return Either_1.either.map(e, function (_a) {
        var a = _a[0];
        return a;
    }); });
}
exports.evalState = evalState;
/**
 * @since 2.0.0
 */
function execState(ma, s, e) {
    return run(ma, s, e).then(function (e) { return Either_1.either.map(e, function (_a) {
        var _ = _a[0], s = _a[1];
        return s;
    }); });
}
exports.execState = execState;
var T = stateT.getStateT(RTE.readerTaskEither);
/**
 * @since 2.0.0
 */
exports.fromRight = T.of;
/**
 * @since 2.0.0
 */
exports.fromState = T.fromState;
/**
 * @since 2.0.0
 */
exports.fromReaderTaskEither = T.fromM;
/**
 * @since 2.0.0
 */
exports.stateReaderTaskEither = {
    URI: exports.URI,
    map: T.map,
    of: exports.fromRight,
    ap: T.ap,
    chain: T.chain
};
/**
 * Like `stateReaderTaskEither` but `ap` is sequential
 * @since 2.0.0
 */
exports.stateReaderTaskEitherSeq = __assign({}, exports.stateReaderTaskEither, { ap: function (fab, fa) { return exports.stateReaderTaskEither.chain(fab, function (f) { return exports.stateReaderTaskEither.map(fa, f); }); } });
