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
var readerT = require("./ReaderT");
var Task_1 = require("./Task");
var TE = require("./TaskEither");
var T = readerT.getReaderT(TE.taskEither);
exports.URI = 'ReaderTaskEither';
/**
 * @since 2.0.0
 */
function run(ma, e) {
    return ma(e)();
}
exports.run = run;
/**
 * @since 2.0.0
 */
function fold(ma, onLeft, onRight) {
    return function (e) { return TE.fold(ma(e), onLeft, onRight); };
}
exports.fold = fold;
/**
 * @since 2.0.0
 */
function orElse(ma, f) {
    return function (e) { return TE.orElse(ma(e), function (l) { return f(l)(e); }); };
}
exports.orElse = orElse;
/**
 * @since 2.0.0
 */
function mapLeft(ma, f) {
    return function (e) { return TE.mapLeft(ma(e), f); };
}
exports.mapLeft = mapLeft;
/**
 * @since 2.0.0
 */
function ask() {
    return function (e) { return TE.taskEither.of(e); };
}
exports.ask = ask;
/**
 * @since 2.0.0
 */
function asks(f) {
    return function (e) { return TE.taskEither.of(f(e)); };
}
exports.asks = asks;
/**
 * @since 2.0.0
 */
function local(ma, f) {
    return function (e) { return ma(f(e)); };
}
exports.local = local;
/**
 * @since 2.0.0
 */
function right(ma) {
    return function () { return TE.right(ma); };
}
exports.right = right;
/**
 * @since 2.0.0
 */
function left(ma) {
    return function () { return TE.left(ma); };
}
exports.left = left;
/**
 * @since 2.0.0
 */
function fromTaskEither(ma) {
    return function () { return ma; };
}
exports.fromTaskEither = fromTaskEither;
/**
 * @since 2.0.0
 */
exports.fromReader = T.fromReader;
/**
 * @since 2.0.0
 */
function fromLeft(l) {
    return fromTaskEither(TE.fromLeft(l));
}
exports.fromLeft = fromLeft;
/**
 * @since 2.0.0
 */
exports.fromRight = T.of;
/**
 * @since 2.0.0
 */
function fromIOEither(ma) {
    return fromTaskEither(TE.fromIOEither(ma));
}
exports.fromIOEither = fromIOEither;
function fromPredicate(predicate, onFalse) {
    var f = TE.fromPredicate(predicate, onFalse);
    return function (a) { return fromTaskEither(f(a)); };
}
exports.fromPredicate = fromPredicate;
/**
 * @since 2.0.0
 */
function tryCatch(f, onError) {
    return function (e) { return TE.tryCatch(function () { return f(e); }, function (reason) { return onError(reason, e); }); };
}
exports.tryCatch = tryCatch;
/**
 * @since 2.0.0
 */
exports.readerTaskEither = {
    URI: exports.URI,
    map: T.map,
    of: exports.fromRight,
    ap: T.ap,
    chain: T.chain,
    alt: orElse,
    bimap: function (ma, f, g) { return function (e) { return TE.taskEither.bimap(ma(e), f, g); }; },
    fromIO: function (ma) { return function () { return TE.taskEither.fromIO(ma); }; },
    fromTask: right,
    throwError: fromLeft,
    fromEither: function (e) { return function () { return Task_1.task.of(e); }; },
    fromOption: function (o, onNone) { return (o._tag === 'None' ? fromLeft(onNone()) : exports.fromRight(o.value)); }
};
/**
 * Like `readerTaskEither` but `ap` is sequential
 * @since 2.0.0
 */
exports.readerTaskEitherSeq = __assign({}, exports.readerTaskEither, { ap: function (fab, fa) { return exports.readerTaskEither.chain(fab, function (f) { return exports.readerTaskEither.map(fa, f); }); } });
