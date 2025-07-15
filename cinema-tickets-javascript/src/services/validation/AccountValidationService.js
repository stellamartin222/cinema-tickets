import InvalidPurchaseException from "../../pairtest/lib/InvalidPurchaseException";

export default class AccountValidationService {
  validateAccountId(accountId) {
    let errorName = 'validateAccountId';

    if(isNaN(accountId) || !Number.isInteger(accountId)){
      throw new InvalidPurchaseException(errorName, 'Account ID must be a number.')
    } else if (accountId <= 0){
      throw new InvalidPurchaseException(errorName, 'Account ID must be greater than zero.')
    }

    this.#accountService();

    return {status: 200};
  }

  #accountService(){
    
    //In a production system this would be an aditional check to confirm the 
    //account number exists, is valid ect. But this is outside of the scope of this tech test.

    return
  }
}