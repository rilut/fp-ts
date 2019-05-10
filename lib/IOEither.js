"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var E = require("./Either");
var EitherT_1 = require("./EitherT");
var IO_1 = require("./IO");
var T = EitherT_1.getEitherM(IO_1.io);
exports.URI = 'IOEither';
/**
 * @since 2.0.0
 */
exports.left = T.left;
/**
 * @since 2.0.0
 */
exports.right = T.of;
/**
 * @since 2.0.0
 */
exports.rightIO = T.rightM;
/**
 * @since 2.0.0
 */
exports.leftIO = T.leftM;
/**
 * @since 2.0.0
 */
exports.fromEither = IO_1.io.of;
/**
 * @since 2.0.0
 */
function fromOption(ma, onNone) {
    return exports.fromEither(E.fromOption(ma, onNone));
}
exports.fromOption = fromOption;
function fromPredicate(predicate, onFalse) {
    var f = E.fromPredicate(predicate, onFalse);
    return function (a) { return exports.fromEither(f(a)); };
}
exports.fromPredicate = fromPredicate;
/**
 * @since 2.0.0
 */
exports.fold = T.fold;
/**
 * @since 2.0.0
 */
exports.getOrElse = T.getOrElse;
function filterOrElse(ma, p, zero) {
    return IO_1.io.map(ma, function (e) { return E.filterOrElse(e, p, zero); });
}
exports.filterOrElse = filterOrElse;
/**
 * @since 2.0.0
 */
exports.orElse = T.orElse;
/**
 * @since 2.0.0
 */
exports.swap = T.swap;
/**
 * @since 2.0.0
 */
function getSemigroup(S) {
    return IO_1.getSemigroup(E.getSemigroup(S));
}
exports.getSemigroup = getSemigroup;
/**
 * @since 2.0.0
 */
function getApplySemigroup(S) {
    return IO_1.getSemigroup(E.getApplySemigroup(S));
}
exports.getApplySemigroup = getApplySemigroup;
/**
 * @since 2.0.0
 */
function getApplyMonoid(M) {
    return {
        concat: getApplySemigroup(M).concat,
        empty: exports.right(M.empty)
    };
}
exports.getApplyMonoid = getApplyMonoid;
/**
 * Constructs a new `IOEither` from a function that performs a side effect and might throw
 * @since 2.0.0
 */
function tryCatch(f, onError) {
    return function () { return E.tryCatch(f, onError); };
}
exports.tryCatch = tryCatch;
/**
 * Make sure that a resource is cleaned up in the event of an exception. The
 * release action is called regardless of whether the body action throws or
 * returns.
 *
 * @since 2.0.0
 */
exports.bracket = T.bracket;
/**
 * @since 2.0.0
 */
exports.ioEither = {
    URI: exports.URI,
    bimap: T.bimap,
    mapLeft: T.mapLeft,
    map: T.map,
    of: exports.right,
    ap: T.ap,
    chain: T.chain,
    alt: exports.orElse,
    fromIO: exports.rightIO
};
