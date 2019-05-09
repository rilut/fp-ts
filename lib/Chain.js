"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function flatMap(F) {
    return function (f) { return function (fa) { return F.chain(fa, f); }; };
}
exports.flatMap = flatMap;
