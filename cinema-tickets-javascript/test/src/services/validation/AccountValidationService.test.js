import AccountValidationService from "../../../../src/services/validation/AccountValidationService";
import mockInvalidPurchaseException from "../../../../src/pairtest/lib/InvalidPurchaseException";

jest.mock('../../../../src/pairtest/lib/InvalidPurchaseException', () => jest.fn());

describe('validateAccountId', () => {
  const ERROR_NAME = 'validateAccountId';
  const ERROR_STATUS = 400;

  let accountValidationService;
  
  beforeEach(async () => {
      accountValidationService = new AccountValidationService;
  });
  
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('returns 200 for a valid accountId', () => {
    expect(accountValidationService.validateAccountId(1234)).toEqual({status: 200})
  });

  it.each([
    ['a'],
    [NaN],
    [{}],
    [1.1]
  ])(
    'throws error when accountId not a number',
    (invalidAccountId) => {
      accountValidationService.validateAccountId(invalidAccountId)
    
      expect(mockInvalidPurchaseException)
      .toHaveBeenCalledWith(ERROR_NAME, ERROR_STATUS, 'Account ID must be a number.')
    }
  );

  it.each([
    [0],
    [-10]
  ])(
    'throws an error when accountId less than one',
    (invalidAccountId) => {
      accountValidationService.validateAccountId(invalidAccountId)

      expect(mockInvalidPurchaseException)
      .toHaveBeenCalledWith(ERROR_NAME, ERROR_STATUS, 'Account ID must be greater than zero.')
    }
  );
});