import InvalidPurchaseException from "../../../../src/pairtest/lib/InvalidPurchaseException";

describe('InvalidPurchasException', () => {
    it('returns an error object with given values', () => {
        let invalidPurchaseException = new InvalidPurchaseException('errName', 'errMsg');
        expect(invalidPurchaseException.globalExceptionHandler()).toEqual({
            statusCode: 400,
            type: 'errName',
            title: 'An error occured',
            detail: 'errMsg'
        })
    });
});