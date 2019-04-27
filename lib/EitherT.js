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
var Applicative_1 = require("./Applicative");
var Either_1 = require("./Either");
function getEitherT(M) {
    var applicativeComposition = Applicative_1.getApplicativeComposition(M, Either_1.either);
    return __assign({}, applicativeComposition, { chain: function (fa, f) { return M.chain(fa, function (e) { return (Either_1.isLeft(e) ? M.of(Either_1.left(e.left)) : f(e.right)); }); }, fold: function (fa, onLeft, onRight) { return M.map(fa, function (e) { return (Either_1.isLeft(e) ? onLeft(e.left) : onRight(e.right)); }); } });
}
exports.getEitherT = getEitherT;
