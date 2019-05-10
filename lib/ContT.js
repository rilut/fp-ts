"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getContM(M) {
    return {
        map: function (ma, f) { return function (c) { return ma(function (a) { return c(f(a)); }); }; },
        of: function (a) { return function (c) { return c(a); }; },
        ap: function (mab, ma) { return function (c) { return mab(function (f) { return ma(function (a) { return c(f(a)); }); }); }; },
        chain: function (ma, f) { return function (c) { return ma(function (a) { return f(a)(c); }); }; },
        fromM: function (ma) { return function (c) { return M.chain(ma, c); }; }
    };
}
exports.getContM = getContM;
