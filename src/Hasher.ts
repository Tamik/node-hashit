import crypto, {Hash, BinaryToTextEncoding, CharacterEncoding} from 'crypto';

import type {HasherOptions, IHasher} from './types';
import {stringifyValue} from './utils';

const DEFAULT_ALGORITHM: string = 'md5';
const DEFAULT_INPUT_ENCODING: CharacterEncoding = 'utf8';
const DEFAULT_OUTPUT_ENCODING: BinaryToTextEncoding = 'hex';

/**
 * Provides an interface to hash any value.
 */
class Hasher implements IHasher {
    /**
     * Hasher options.
     */
    public readonly options: HasherOptions;

    /**
     * Accumulative buffer.
     */
    public readonly hasher: Hash;

    constructor(options: HasherOptions = {}) {
        this.options = options;

        this.hasher = crypto.createHash(this.options.algorithm || DEFAULT_ALGORITHM);
    }

    /**
     * Updates hash with stringified value.
     */
    public update(value: unknown, inputEncoding?: CharacterEncoding): void {
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
    public digest(outputEncoding?: BinaryToTextEncoding): string {
        const encoding = outputEncoding || this.options.outputEncoding;

        return this.hasher.digest(encoding || encoding === null ? encoding : DEFAULT_OUTPUT_ENCODING);
    }
}

export default Hasher;
