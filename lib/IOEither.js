"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var E = require("./Either");
var EitherT_1 = require("./EitherT");
var IO_1 = require("./IO");
exports.URI = 'IOEither';
var eitherT = EitherT_1.getEitherT(IO_1.io);
/**
 * @since 2.0.0
 */
function run(fa) {
    return fa();
}
exports.run = run;
/**
 * @since 2.0.0
 */
exports.fromRight = eitherT.of;
/**
 * @since 2.0.0
 */
function orElse(fa, f) {
    return IO_1.io.chain(fa, function (e) { return E.fold(e, f, eitherT.of); });
}
exports.orElse = orElse;
/**
 * @since 2.0.0
 */
function mapLeft(ma, f) {
    return IO_1.io.map(ma, function (e) { return E.mapLeft(e, f); });
}
exports.mapLeft = mapLeft;
/**
 * @since 2.0.0
 */
exports.fold = eitherT.fold;
/**
 * @since 2.0.0
 */
function right(fa) {
    return IO_1.io.map(fa, E.right);
}
exports.right = right;
/**
 * @since 2.0.0
 */
function left(fa) {
    return IO_1.io.map(fa, E.left);
}
exports.left = left;
/**
 * @since 2.0.0
 */
function fromLeft(l) {
    return IO_1.io.of(E.left(l));
}
exports.fromLeft = fromLeft;
/**
 * @since 2.0.0
 */
function tryCatch(f, onError) {
    return function () { return E.tryCatch(f, onError); };
}
exports.tryCatch = tryCatch;
/**
 * @since 2.0.0
 */
exports.ioEither = {
    URI: exports.URI,
    bimap: function (ma, f, g) { return IO_1.io.map(ma, function (e) { return E.either.bimap(e, f, g); }); },
    map: eitherT.map,
    of: exports.fromRight,
    ap: eitherT.ap,
    chain: eitherT.chain,
    alt: orElse,
    throwError: fromLeft,
    fromEither: IO_1.io.of,
    fromOption: function (o, onNone) { return (o._tag === 'None' ? fromLeft(onNone()) : exports.fromRight(o.value)); }
};
