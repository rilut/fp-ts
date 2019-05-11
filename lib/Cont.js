"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ContT_1 = require("./ContT");
var Identity_1 = require("./Identity");
var T = ContT_1.getContM(Identity_1.identity);
/**
 * @since 2.0.0
 */
exports.URI = 'Cont';
/**
 * @since 2.0.0
 */
exports.cont = {
    URI: exports.URI,
    map: T.map,
    of: T.of,
    ap: T.ap,
    chain: T.chain
};
