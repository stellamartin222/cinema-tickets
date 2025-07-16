import AccountValidationService from '../../../../src/services/validation/AccountValidationService';
import InvalidPurchaseException from '../../../../src/pairtest/lib/InvalidPurchaseException';
import { logger } from '../../../../src/pairtest/lib/logger';

jest.mock('../../../../src/pairtest/lib/logger.js', () => ({
  logger: {
    log: jest.fn(),
  },
}));

describe('validateAccountId', () => {
  const ERROR_NAME = 'validateAccountId';

  let accountValidationService;

  beforeEach(async () => {
    jest.clearAllMocks();
    accountValidationService = new AccountValidationService();
  });

  it('returns 200 for a valid accountId', () => {
    const accountId = 1234;

    expect(accountValidationService.validateAccountId(accountId)).toEqual({ status: 200 });
    expect(logger.log).toHaveBeenCalledWith('info', {
      type: 'validateAccountId',
      title: 'Success',
      detail: 'account ID 1234 is valid',
    });
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
        expect(logger.log).toHaveBeenCalledWith('error', {
          statusCode: 400,
          type: 'validateAccountId',
          title: 'An error occured',
          detail: 'Account ID must be a number.',
        });
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
      expect(logger.log).toHaveBeenCalledWith('error', {
        statusCode: 400,
        type: 'validateAccountId',
        title: 'An error occured',
        detail: 'Account ID must be greater than zero.',
      });
    }
  });
});
