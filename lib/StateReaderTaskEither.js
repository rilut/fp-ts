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
var StateT_1 = require("./StateT");
var T = StateT_1.getStateM(RTE.readerTaskEither);
exports.URI = 'StateReaderTaskEither';
/**
 * @since 2.0.0
 */
function run(ma, s, e) {
    return ma(s)(e)();
}
exports.run = run;
/**
 * Run a computation in the `StateReaderTaskEither` monad, discarding the final state
 *
 * @since 2.0.0
 */
exports.evalState = T.evalState;
/**
 * Run a computation in the `StateReaderTaskEither` monad discarding the result
 *
 * @since 2.0.0
 */
exports.execState = T.execState;
/**
 * @since 2.0.0
 */
function fromLeft(l) {
    return exports.fromReaderTaskEither(RTE.fromLeft(l));
}
exports.fromLeft = fromLeft;
/**
 * @since 2.0.0
 */
exports.fromRight = T.of;
/**
 * @since 2.0.0
 */
function right(ma) {
    return exports.fromReaderTaskEither(RTE.right(ma));
}
exports.right = right;
/**
 * @since 2.0.0
 */
function left(ma) {
    return exports.fromReaderTaskEither(RTE.left(ma));
}
exports.left = left;
/**
 * @since 2.0.0
 */
function fromTaskEither(ma) {
    return exports.fromReaderTaskEither(RTE.fromTaskEither(ma));
}
exports.fromTaskEither = fromTaskEither;
/**
 * @since 2.0.0
 */
function fromReader(ma) {
    return exports.fromReaderTaskEither(RTE.fromReader(ma));
}
exports.fromReader = fromReader;
/**
 * @since 2.0.0
 */
function fromIOEither(ma) {
    return exports.fromReaderTaskEither(RTE.fromIOEither(ma));
}
exports.fromIOEither = fromIOEither;
/**
 * @since 2.0.0
 */
function fromEither(ma) {
    return exports.fromReaderTaskEither(RTE.fromEither(ma));
}
exports.fromEither = fromEither;
/**
 * @since 2.0.0
 */
function fromOption(ma, onNone) {
    return exports.fromReaderTaskEither(RTE.fromOption(ma, onNone));
}
exports.fromOption = fromOption;
/**
 * @since 2.0.0
 */
function fromIO(ma) {
    return exports.fromReaderTaskEither(RTE.fromIO(ma));
}
exports.fromIO = fromIO;
/**
 * @since 2.0.0
 */
exports.fromState = T.fromState;
/**
 * @since 2.0.0
 */
exports.fromReaderTaskEither = T.fromM;
/**
 * Get the current state
 *
 * @since 2.0.0
 */
exports.get = T.get;
/**
 * Set the state
 *
 * @since 2.0.0
 */
exports.put = T.put;
/**
 * Modify the state by applying a function to the current state
 *
 * @since 2.0.0
 */
exports.modify = T.modify;
/**
 * Get a value which depends on the current state
 *
 * @since 2.0.0
 */
exports.gets = T.gets;
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
