import {stringifyit, StringifierOptions, StringifierRangeError} from 'stringifyit';

import {HashitRangeError} from '../errors';

function stringifyValue(value: unknown, options: StringifierOptions): string {
    try {
        return stringifyit(value, options);
    } catch (error: unknown) {
        if (error instanceof StringifierRangeError) {
            throw new HashitRangeError();
        }

        throw error;
    }
}

export default stringifyValue;
