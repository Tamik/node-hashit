"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Hasher_1 = __importDefault(require("./Hasher"));
/**
 * Function for simple hash single value.
 *
 * @example
 * import {hashit} from 'node-hashit';
 *
 * hashit({key: 'value', value: 'key'}) === hashit({value: 'key', key: 'value'}); // true
 * hashit(new Set(['value1', 'value2'])) === hashit(new Set(['value2', 'value1'])); // true
 * hashit(new Map([['key', 'value'], ['value', 'key']])) === hashit(new Map([['value', 'key'], ['key', 'value']])); // true
 * hashit([1, 2, 3]) === hashit([1, 2, 3]); // true
 * hashit([1, 2, 3], {sortArrays: true}) === hashit([1, 3, 2], {sortArrays: true}); // true
 *
 * hashit([1, 2, 3]) === hashit([1, 3, 2]); // false
 * hashit(5) === hashit('5'); // false
 */
function hashit(value, options) {
    const hasher = new Hasher_1.default(options);
    hasher.update(value);
    return hasher.digest();
}
exports.default = hashit;
