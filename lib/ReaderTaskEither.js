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
var ReaderT_1 = require("./ReaderT");
var TE = require("./TaskEither");
var T = ReaderT_1.getReaderM(TE.taskEither);
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
function left(l) {
    return exports.fromTaskEither(TE.left(l));
}
exports.left = left;
/**
 * @since 2.0.0
 */
exports.right = T.of;
/**
 * @since 2.0.0
 */
function rightTask(ma) {
    return exports.fromTaskEither(TE.rightTask(ma));
}
exports.rightTask = rightTask;
/**
 * @since 2.0.0
 */
function leftTask(ma) {
    return exports.fromTaskEither(TE.leftTask(ma));
}
exports.leftTask = leftTask;
/**
 * @since 2.0.0
 */
exports.fromTaskEither = T.fromM;
/**
 * @since 2.0.0
 */
exports.rightReader = T.fromReader;
/**
 * @since 2.0.0
 */
function leftReader(ml) {
    return function (e) { return TE.left(ml(e)); };
}
exports.leftReader = leftReader;
/**
 * @since 2.0.0
 */
function fromIOEither(ma) {
    return exports.fromTaskEither(TE.fromIOEither(ma));
}
exports.fromIOEither = fromIOEither;
/**
 * @since 2.0.0
 */
function fromEither(ma) {
    return exports.fromTaskEither(TE.fromEither(ma));
}
exports.fromEither = fromEither;
/**
 * @since 2.0.0
 */
function fromOption(ma, onNone) {
    return exports.fromTaskEither(TE.fromOption(ma, onNone));
}
exports.fromOption = fromOption;
/**
 * @since 2.0.0
 */
function rightIO(ma) {
    return exports.fromTaskEither(TE.rightIO(ma));
}
exports.rightIO = rightIO;
/**
 * @since 2.0.0
 */
function leftIO(ml) {
    return exports.fromTaskEither(TE.leftIO(ml));
}
exports.leftIO = leftIO;
function fromPredicate(predicate, onFalse) {
    var f = TE.fromPredicate(predicate, onFalse);
    return function (a) { return exports.fromTaskEither(f(a)); };
}
exports.fromPredicate = fromPredicate;
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
exports.ask = T.ask;
/**
 * @since 2.0.0
 */
exports.asks = T.asks;
/**
 * @since 2.0.0
 */
exports.local = T.local;
/**
 * @since 2.0.0
 */
exports.readerTaskEither = {
    URI: exports.URI,
    map: T.map,
    of: exports.right,
    ap: T.ap,
    chain: T.chain,
    alt: orElse,
    bimap: function (ma, f, g) { return function (e) { return TE.taskEither.bimap(ma(e), f, g); }; },
    mapLeft: function (ma, f) { return function (e) { return TE.taskEither.mapLeft(ma(e), f); }; },
    fromIO: rightIO,
    fromTask: rightTask,
    throwError: left,
    fromEither: fromEither,
    fromOption: fromOption
};
/**
 * Like `readerTaskEither` but `ap` is sequential
 * @since 2.0.0
 */
exports.readerTaskEitherSeq = __assign({}, exports.readerTaskEither, { ap: function (fab, fa) { return T.chain(fab, function (f) { return T.map(fa, f); }); } });
