import crypto from 'crypto';
import { stringifyValue } from './utils';
const DEFAULT_ALGORITHM = 'md5';
const DEFAULT_INPUT_ENCODING = 'utf8';
const DEFAULT_OUTPUT_ENCODING = 'hex';
/**
 * Provides an interface to hash any value.
 */
class Hasher {
    constructor(options = {}) {
        this.options = options;
        this.hasher = crypto.createHash(this.options.algorithm || DEFAULT_ALGORITHM);
    }
    /**
     * Updates hash with stringified value.
     */
    update(value, inputEncoding) {
        if (value instanceof Buffer) {
            this.hasher.update(value);
        }
        else {
            const hashValue = stringifyValue(value, this.options);
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
export default Hasher;
