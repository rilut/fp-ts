"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StateT_1 = require("./StateT");
var Identity_1 = require("./Identity");
var T = StateT_1.getStateM(Identity_1.identity);
/**
 * @since 2.0.0
 */
exports.URI = 'State';
/**
 * Run a computation in the `State` monad, discarding the final state
 *
 * @since 2.0.0
 */
exports.evalState = T.evalState;
/**
 * Run a computation in the `State` monad discarding the result
 *
 * @since 2.0.0
 */
exports.execState = T.execState;
/**
 * Get the current state
 *
 * @since 2.0.0
 */
exports.get = T.get;
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
