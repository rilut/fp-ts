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
var Either_1 = require("./Either");
var function_1 = require("./function");
var map = Either_1.either.map;
function getApplicative(S) {
    return {
        URI: Either_1.URI,
        _L: function_1.phantom,
        map: map,
        of: Either_1.either.of,
        ap: function (mab, ma) {
            return Either_1.isLeft(mab)
                ? Either_1.isLeft(ma)
                    ? Either_1.left(S.concat(mab.left, ma.left))
                    : mab
                : Either_1.isLeft(ma)
                    ? ma
                    : Either_1.right(mab.right(ma.right));
        }
    };
}
exports.getApplicative = getApplicative;
/**
 * **Note**: This function is here just to avoid switching to / from `Either`
 *
 * @since 2.0.0
 */
function getMonad(S) {
    return __assign({}, getApplicative(S), { chain: function (ma, f) { return (Either_1.isLeft(ma) ? ma : f(ma.right)); } });
}
exports.getMonad = getMonad;
/**
 * @since 2.0.0
 */
function getSemigroup(SL, SA) {
    return {
        concat: function (fx, fy) {
            return Either_1.isLeft(fx)
                ? Either_1.isLeft(fy)
                    ? Either_1.left(SL.concat(fx.left, fy.left))
                    : fx
                : Either_1.isLeft(fy)
                    ? fy
                    : Either_1.right(SA.concat(fx.right, fy.right));
        }
    };
}
exports.getSemigroup = getSemigroup;
/**
 * @since 2.0.0
 */
function getMonoid(SL, SA) {
    return __assign({}, getSemigroup(SL, SA), { empty: Either_1.right(SA.empty) });
}
exports.getMonoid = getMonoid;
/**
 * @since 2.0.0
 */
function getAlt(S) {
    return {
        URI: Either_1.URI,
        _L: function_1.phantom,
        map: map,
        alt: function (fx, f) {
            if (Either_1.isRight(fx)) {
                return fx;
            }
            var fy = f();
            return Either_1.isLeft(fy) ? Either_1.left(S.concat(fx.left, fy.left)) : fy;
        }
    };
}
exports.getAlt = getAlt;
/**
 * @since 2.0.0
 */
function getMonadThrow(S) {
    return __assign({}, getMonad(S), { throwError: Either_1.either.throwError, fromEither: Either_1.either.fromEither, fromOption: Either_1.either.fromOption });
}
exports.getMonadThrow = getMonadThrow;
