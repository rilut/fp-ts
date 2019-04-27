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
var E = require("./Either");
var EitherT_1 = require("./EitherT");
var function_1 = require("./function");
var T = require("./Task");
var task = T.task;
exports.URI = 'TaskEither';
var eitherT = EitherT_1.getEitherT(task);
/**
 * @since 2.0.0
 */
exports.fold = eitherT.fold;
/**
 * @since 2.0.0
 */
function foldTask(ma, onLeft, onRight) {
    return task.chain(ma, function (e) { return E.fold(e, onLeft, onRight); });
}
exports.foldTask = foldTask;
/**
 * @since 2.0.0
 */
function getOrElse(ma, f) {
    return exports.fold(ma, f, function_1.identity);
}
exports.getOrElse = getOrElse;
/**
 * @since 2.0.0
 */
function mapLeft(ma, f) {
    return task.map(ma, function (e) { return E.mapLeft(e, f); });
}
exports.mapLeft = mapLeft;
function filterOrElse(ma, p, zero) {
    return task.map(ma, function (e) { return E.filterOrElse(e, p, zero); });
}
exports.filterOrElse = filterOrElse;
/**
 * @since 2.0.0
 */
exports.fromRight = eitherT.of;
/**
 * @since 2.0.0
 */
function orElse(ma, f) {
    return task.chain(ma, function (e) { return E.fold(e, f, eitherT.of); });
}
exports.orElse = orElse;
/**
 * @since 2.0.0
 */
function right(fa) {
    return task.map(fa, E.right);
}
exports.right = right;
/**
 * @since 2.0.0
 */
function left(fl) {
    return task.map(fl, E.left);
}
exports.left = left;
/**
 * @since 2.0.0
 */
function fromLeft(l) {
    return task.of(E.left(l));
}
exports.fromLeft = fromLeft;
/**
 * @since 2.0.0
 */
exports.fromIOEither = T.task.fromIO;
function fromPredicate(predicate, onFalse) {
    var f = E.fromPredicate(predicate, onFalse);
    return function (a) { return task.of(f(a)); };
}
exports.fromPredicate = fromPredicate;
/**
 * @since 2.0.0
 */
function getSemigroup(S) {
    return T.getSemigroup(E.getSemigroup(S));
}
exports.getSemigroup = getSemigroup;
/**
 * @since 2.0.0
 */
function getApplySemigroup(S) {
    return T.getSemigroup(E.getApplySemigroup(S));
}
exports.getApplySemigroup = getApplySemigroup;
/**
 * @since 2.0.0
 */
function getApplyMonoid(M) {
    return __assign({}, getApplySemigroup(M), { empty: exports.fromRight(M.empty) });
}
exports.getApplyMonoid = getApplyMonoid;
/**
 * Transforms a `Promise` into a `TaskEither`, catching the possible error.
 *
 * @example
 * import { createHash } from 'crypto'
 * import { TaskEither, tryCatch } from 'fp-ts/lib/TaskEither'
 * import { createReadStream } from 'fs'
 * import { left } from 'fp-ts/lib/Either'
 *
 * function md5(path: string): TaskEither<string, string> {
 *   const mkHash = (p: string) =>
 *     new Promise<string>((resolve, reject) => {
 *       const hash = createHash('md5')
 *       const rs = createReadStream(p)
 *       rs.on('error', (error: Error) => reject(error.message))
 *       rs.on('data', (chunk: string) => hash.update(chunk))
 *       rs.on('end', () => resolve(hash.digest('hex')))
 *     })
 *   return tryCatch(() => mkHash(path), message => `cannot create md5 hash: ${String(message)}`)
 * }
 *
 * md5('foo')()
 *   .then(x => {
 *     assert.deepStrictEqual(x, left(`cannot create md5 hash: ENOENT: no such file or directory, open 'foo'`))
 *   })
 *
 *
 * @since 2.0.0
 */
function tryCatch(f, onRejected) {
    return T.tryCatch(f, onRejected);
}
exports.tryCatch = tryCatch;
function taskify(f) {
    return function () {
        var args = Array.prototype.slice.call(arguments);
        return function () {
            return new Promise(function (resolve) {
                var cbResolver = function (e, r) { return (e != null ? resolve(E.left(e)) : resolve(E.right(r))); };
                f.apply(null, args.concat(cbResolver));
            });
        };
    };
}
exports.taskify = taskify;
/**
 * @since 2.0.0
 */
function attempt(ma) {
    return task.map(ma, E.right);
}
exports.attempt = attempt;
/**
 * Make sure that a resource is cleaned up in the event of an exception. The
 * release action is called regardless of whether the body action throws or
 * returns.
 *
 * @since 2.0.0
 */
function bracket(acquire, use, release) {
    return exports.taskEither.chain(acquire, function (a) {
        return exports.taskEither.chain(attempt(use(a)), function (e) {
            return exports.taskEither.chain(release(a, e), function () { return E.fold(e, fromLeft, exports.taskEither.of); });
        });
    });
}
exports.bracket = bracket;
/**
 * @since 2.0.0
 */
exports.taskEither = {
    URI: exports.URI,
    bimap: function (ma, f, g) { return task.map(ma, function (e) { return E.either.bimap(e, f, g); }); },
    map: eitherT.map,
    of: exports.fromRight,
    ap: eitherT.ap,
    chain: eitherT.chain,
    alt: orElse,
    fromIO: function (ma) { return right(T.task.fromIO(ma)); },
    fromTask: right,
    throwError: fromLeft,
    fromEither: task.of,
    fromOption: function (o, onNone) { return (o._tag === 'None' ? fromLeft(onNone()) : exports.fromRight(o.value)); }
};
/**
 * Like `TaskEither` but `ap` is sequential
 *
 * @since 2.0.0
 */
exports.taskEitherSeq = __assign({}, exports.taskEither, { ap: function (fab, fa) { return exports.taskEither.chain(fab, function (f) { return exports.taskEither.map(fa, f); }); } });
