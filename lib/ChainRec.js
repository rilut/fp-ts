"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @since 2.0.0
 */
exports.tailRec = function (a, f) {
    var v = f(a);
    while (v._tag === 'Left') {
        v = f(v.left);
    }
    return v.right;
};
