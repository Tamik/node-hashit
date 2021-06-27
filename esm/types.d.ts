/// <reference types="node" />
import type { Hash, BinaryToTextEncoding, CharacterEncoding } from 'crypto';
import type { StringifierOptions } from 'stringifyit';
export declare type HasherOptions = StringifierOptions & {
    /**
     * Hash algorithm.
     */
    readonly algorithm?: string;
    /**
     * Input encoding.
     */
    readonly inputEncoding?: CharacterEncoding;
    /**
     * Output encoding. If `null` Buffer will be returned.
     */
    readonly outputEncoding?: BinaryToTextEncoding;
};
export interface IHasher {
    /**
     * Hasher options.
     */
    readonly options: HasherOptions;
    /**
     * Accumulative buffer.
     */
    readonly hasher: Hash;
    /**
     * Updates hash with stringified value.
     */
    update(value: unknown, inputEncoding?: CharacterEncoding): void;
    /**
     * @see {@link https://nodejs.org/api/crypto.html#crypto_hash_digest_encoding}
     */
    digest(outputEncoding?: BinaryToTextEncoding): string;
}
