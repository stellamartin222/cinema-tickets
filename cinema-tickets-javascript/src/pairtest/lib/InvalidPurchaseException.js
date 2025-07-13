export default class InvalidPurchaseException extends Error {
    #errorName;
    #errorStatus;
    #errorMessage;

    constructor(name, status, message){
        super()
        this.#errorName = name
        this.#errorStatus = status;
        this.#errorMessage = message;
    }

    globalExceptionHandler(){
        let errorObj = {
            statusCode: this.#errorStatus,
            type: this.#errorName,
            title: 'An error occured',
            detail: this.#errorMessage
        }
        
        return errorObj;
    }
}
