import AccountValidationService from '../../../../src/services/validation/AccountValidationService';
import InvalidPurchaseException from '../../../../src/pairtest/lib/InvalidPurchaseException';

describe('validateAccountId', () => {
  const ERROR_NAME = 'validateAccountId';

  let accountValidationService;

  beforeEach(async () => {
    accountValidationService = new AccountValidationService();
  });

  it('returns 200 for a valid accountId', () => {
    expect(accountValidationService.validateAccountId(1234)).toEqual({ status: 200 });
  });

  it.each([['a'], [NaN], [{}], [1.1]])(
    'throws error when accountId not a number',
    (invalidAccountId) => {
      expect(() => accountValidationService.validateAccountId(invalidAccountId)).toThrow(
        InvalidPurchaseException
      );

      try {
        accountValidationService.validateAccountId(invalidAccountId);
      } catch (error) {
        expect(error.globalExceptionHandler().type).toBe(ERROR_NAME);
        expect(error.globalExceptionHandler().detail).toBe('Account ID must be a number.');
      }
    }
  );

  it.each([[0], [-10]])('throws an error when accountId less than one', (invalidAccountId) => {
    expect(() => accountValidationService.validateAccountId(invalidAccountId)).toThrow(
      InvalidPurchaseException
    );

    try {
      accountValidationService.validateAccountId(invalidAccountId);
    } catch (error) {
      expect(error.globalExceptionHandler().type).toBe(ERROR_NAME);
      expect(error.globalExceptionHandler().detail).toBe('Account ID must be greater than zero.');
    }
  });
});
