"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file The `Apply` class provides the `ap` which is used to apply a function to an argument under a type constructor.
 *
 * `Apply` can be used to lift functions of two or more arguments to work on values wrapped with the type constructor
 * `f`.
 *
 * Instances must satisfy the following law in addition to the `Functor` laws:
 *
 * 1. Associative composition: `F.ap(F.ap(F.map(fbc, bc => ab => a => bc(ab(a))), fab), fa) = F.ap(fbc, F.ap(fab, fa))`
 *
 * Formally, `Apply` represents a strong lax semi-monoidal endofunctor.
 */
var function_1 = require("./function");
var tupleConstructors = {};
function sequenceT(F) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var len = args.length;
        var f = tupleConstructors[len];
        if (!Boolean(f)) {
            f = tupleConstructors[len] = function_1.curried(function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return args;
            }, len - 1, []);
        }
        var r = F.map(args[0], f);
        for (var i = 1; i < len; i++) {
            r = F.ap(r, args[i]);
        }
        return r;
    };
}
exports.sequenceT = sequenceT;
function sequenceS(F) {
    return function (r) {
        var keys = Object.keys(r);
        var fst = keys[0];
        var others = keys.slice(1);
        var fr = F.map(r[fst], function (a) {
            var _a;
            return (_a = {}, _a[fst] = a, _a);
        });
        var _loop_1 = function (key) {
            fr = F.ap(F.map(fr, function (r) { return function (a) {
                r[key] = a;
                return r;
            }; }), r[key]);
        };
        for (var _i = 0, others_1 = others; _i < others_1.length; _i++) {
            var key = others_1[_i];
            _loop_1(key);
        }
        return fr;
    };
}
exports.sequenceS = sequenceS;
