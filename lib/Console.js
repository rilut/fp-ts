"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @since 2.0.0
 */
exports.log = function (s) {
    return function () { return console.log(s); }; // tslint:disable-line:no-console
};
/**
 * @since 2.0.0
 */
exports.warn = function (s) {
    return function () { return console.warn(s); }; // tslint:disable-line:no-console
};
/**
 * @since 2.0.0
 */
exports.error = function (s) {
    return function () { return console.error(s); }; // tslint:disable-line:no-console
};
/**
 * @since 2.0.0
 */
exports.info = function (s) {
    return function () { return console.info(s); }; // tslint:disable-line:no-console
};
