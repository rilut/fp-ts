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
var Option_1 = require("./Option");
function getOptionT(M) {
    var applicativeComposition = Applicative_1.getApplicativeComposition(M, Option_1.option);
    return __assign({}, applicativeComposition, { chain: function (ma, f) { return M.chain(ma, function (o) { return (Option_1.isNone(o) ? M.of(Option_1.none) : f(o.value)); }); }, fold: function (ma, onNone, onSome) { return M.map(ma, function (o) { return (Option_1.isNone(o) ? onNone : onSome(o.value)); }); } });
}
exports.getOptionT = getOptionT;
