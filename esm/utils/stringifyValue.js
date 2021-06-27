import { stringifyit, StringifierRangeError } from 'stringifyit';
import { HashitRangeError } from '../errors';
function stringifyValue(value, options) {
    try {
        return stringifyit(value, options);
    }
    catch (error) {
        if (error instanceof StringifierRangeError) {
            throw new HashitRangeError();
        }
        throw error;
    }
}
export default stringifyValue;
