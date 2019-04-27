"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StateT_1 = require("./StateT");
var Identity_1 = require("./Identity");
var T = StateT_1.getStateT(Identity_1.identity);
exports.URI = 'State';
/**
 * @since 2.0.0
 */
function run(ma, s) {
    return ma(s);
}
exports.run = run;
/**
 * @since 2.0.0
 */
function evalState(ma, s) {
    return ma(s)[0];
}
exports.evalState = evalState;
/**
 * @since 2.0.0
 */
function execState(ma, s) {
    return ma(s)[1];
}
exports.execState = execState;
/**
 * Get the current state
 *
 * @since 2.0.0
 */
exports.get = function () { return T.get; };
/**
 * Set the state
 *
 * @since 2.0.0
 */
exports.put = T.put;
/**
 * Modify the state by applying a function to the current state
 *
 * @since 2.0.0
 */
exports.modify = T.modify;
/**
 * Get a value which depends on the current state
 *
 * @since 2.0.0
 */
exports.gets = T.gets;
/**
 * @since 2.0.0
 */
exports.state = {
    URI: exports.URI,
    map: T.map,
    of: T.of,
    ap: T.ap,
    chain: T.chain
};
