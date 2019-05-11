"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Log any value to the console for debugging purposes and then return a value. This will log the value's underlying
 * representation for low-level debugging
 *
 * @since 2.0.0
 */
function trace(message, out) {
    console.log(message); // tslint:disable-line:no-console
    return out();
}
exports.trace = trace;
/**
 * Log any value and return it
 *
 * @since 2.0.0
 */
function spy(a) {
    return trace(a, function () { return a; });
}
exports.spy = spy;
function traceA(F) {
    return function (x) { return trace(x, function () { return F.of(undefined); }); };
}
exports.traceA = traceA;
function traceM(F) {
    return function (a) { return trace(a, function () { return F.of(a); }); };
}
exports.traceM = traceM;
