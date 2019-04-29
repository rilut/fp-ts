"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getReaderM(M) {
    return {
        map: function (ma, f) { return function (e) { return M.map(ma(e), f); }; },
        of: function (a) { return function () { return M.of(a); }; },
        ap: function (mab, ma) { return function (e) { return M.ap(mab(e), ma(e)); }; },
        chain: function (ma, f) { return function (e) { return M.chain(ma(e), function (a) { return f(a)(e); }); }; },
        ask: function () { return M.of; },
        asks: function (f) { return function (e) { return M.map(M.of(e), f); }; },
        local: function (ma, f) { return function (d) { return ma(f(d)); }; },
        fromReader: function (ma) { return function (e) { return M.of(ma(e)); }; },
        fromM: function (ma) { return function () { return ma; }; }
    };
}
exports.getReaderM = getReaderM;
