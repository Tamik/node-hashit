"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const utils_1 = require("./utils");
const DEFAULT_ALGORITHM = 'md5';
const DEFAULT_INPUT_ENCODING = 'utf8';
const DEFAULT_OUTPUT_ENCODING = 'hex';
/**
 * Provides an interface to hash any value.
 */
class Hasher {
    constructor(options = {}) {
        this.options = options;
        this.hasher = crypto_1.default.createHash(this.options.algorithm || DEFAULT_ALGORITHM);
    }
    /**
     * Updates hash with stringified value.
     */
    update(value, inputEncoding) {
        if (value instanceof Buffer) {
            this.hasher.update(value);
        }
        else {
            const hashValue = utils_1.stringifyValue(value, this.options);
            this.hasher.update(hashValue, inputEncoding || this.options.inputEncoding || DEFAULT_INPUT_ENCODING);
        }
    }
    /**
     * @see {@link https://nodejs.org/api/crypto.html#crypto_hash_digest_encoding}
     */
    digest(outputEncoding) {
        const encoding = outputEncoding || this.options.outputEncoding;
        return this.hasher.digest(encoding || encoding === null ? encoding : DEFAULT_OUTPUT_ENCODING);
    }
}
exports.default = Hasher;
