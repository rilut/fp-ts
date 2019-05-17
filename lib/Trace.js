"use strict";
/**
 * @file Adapted from https://github.com/garyb/purescript-debug
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @since 2.0.0
 */
function spy(a) {
    console.log(a); // tslint:disable-line:no-console
    return a;
}
exports.spy = spy;
/**
 * @since 2.0.0
 */
function trace(message) {
    return function (a) {
        console.log(message(a)); // tslint:disable-line:no-console
        return a;
    };
}
exports.trace = trace;
