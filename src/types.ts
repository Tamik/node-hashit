import type {Hash, HexBase64Latin1Encoding, Utf8AsciiLatin1Encoding} from 'crypto';
import type {StringifierOptions} from 'stringifyit';

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

export interface IHasher {
    options: HasherOptions;
    hasher: Hash;

    update(value: unknown, inputEncoding?: Utf8AsciiLatin1Encoding): void;

    digest(outputEncoding?: HexBase64Latin1Encoding): string;
}
