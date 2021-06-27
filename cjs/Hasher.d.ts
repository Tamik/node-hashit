/// <reference types="node" />
import { Hash, BinaryToTextEncoding, CharacterEncoding } from 'crypto';
import type { HasherOptions, IHasher } from './types';
/**
 * Provides an interface to hash any value.
 */
declare class Hasher implements IHasher {
    /**
     * Hasher options.
     */
    readonly options: HasherOptions;
    /**
     * Accumulative buffer.
     */
    readonly hasher: Hash;
    constructor(options?: HasherOptions);
    /**
     * Updates hash with stringified value.
     */
    update(value: unknown, inputEncoding?: CharacterEncoding): void;
    /**
     * @see {@link https://nodejs.org/api/crypto.html#crypto_hash_digest_encoding}
     */
    digest(outputEncoding?: BinaryToTextEncoding): string;
}
export default Hasher;
