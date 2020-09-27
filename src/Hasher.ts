import crypto, {Hash, HexBase64Latin1Encoding, Utf8AsciiLatin1Encoding} from 'crypto';
import type {StringifierOptions} from 'stringifyit';

import {stringifyValue} from './utils';

const DEFAULT_ALGORITHM = 'md5';
const DEFAULT_INPUT_ENCODING = 'utf8';
const DEFAULT_OUTPUT_ENCODING = 'hex';

export type HasherOptions = StringifierOptions & {
    /**
     * Hash algorithm.
     */
    algorithm?: string;
    /**
     * Input encoding.
     */
    inputEncoding?: Utf8AsciiLatin1Encoding;
    /**
     * Output encoding. If `null` Buffer will be returned.
     */
    outputEncoding?: HexBase64Latin1Encoding;
};

/**
 * Provides an interface to hash any value.
 */
class Hasher {
    public options: HasherOptions;
    public hasher: Hash;

    constructor(options: HasherOptions = {}) {
        this.options = options;

        this.hasher = crypto.createHash(this.options.algorithm || DEFAULT_ALGORITHM);
    }

    /**
     * Updates hash with stringified value.
     */
    public update(value: unknown, inputEncoding?: Utf8AsciiLatin1Encoding): void {
        if (value instanceof Buffer) {
            this.hasher.update(value);
        } else {
            const hashValue = stringifyValue(value, this.options);

            this.hasher.update(hashValue, inputEncoding || this.options.inputEncoding || DEFAULT_INPUT_ENCODING);
        }
    }

    /**
     * @see {@link https://nodejs.org/api/crypto.html#crypto_hash_digest_encoding}
     */
    public digest(outputEncoding?: HexBase64Latin1Encoding): Buffer | string {
        const encoding = outputEncoding || this.options.outputEncoding;

        return this.hasher.digest(encoding || encoding === null ? encoding : DEFAULT_OUTPUT_ENCODING);
    }
}

export default Hasher;
