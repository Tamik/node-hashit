import type {Hash, HexBase64Latin1Encoding, Utf8AsciiLatin1Encoding} from 'crypto';
import type {StringifierOptions} from 'stringifyit';

export type HasherOptions = StringifierOptions & {
    /**
     * Hash algorithm.
     */
    readonly algorithm?: string;
    /**
     * Input encoding.
     */
    readonly inputEncoding?: Utf8AsciiLatin1Encoding;
    /**
     * Output encoding. If `null` Buffer will be returned.
     */
    readonly outputEncoding?: HexBase64Latin1Encoding;
};

export interface IHasher {
    readonly options: HasherOptions;
    readonly hasher: Hash;

    update(value: unknown, inputEncoding?: Utf8AsciiLatin1Encoding): void;

    digest(outputEncoding?: HexBase64Latin1Encoding): string;
}
