"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stringifyit_1 = require("stringifyit");
const errors_1 = require("../errors");
function stringifyValue(value, options) {
    try {
        return stringifyit_1.stringifyit(value, options);
    }
    catch (error) {
        if (error instanceof stringifyit_1.StringifierRangeError) {
            throw new errors_1.HashitRangeError();
        }
        throw error;
    }
}
exports.default = stringifyValue;
