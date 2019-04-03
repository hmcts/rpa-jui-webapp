const ERROR_CODE_RETRIEVING_CCD_CASES = 'FS_303'
const ERROR_MESSAGE_RETRIEVING_CCD_CASES = 'Error.'

class CcdError extends Error {
    constructor(message) {
        super(message)

        /**
         * The parent constructor sets the name property to 'Error' therefore let's
         * set it to FulfillmentError
         */
        this.name = 'CcdError'
    }
}

/**
 */
class GetCcdCasesError extends CcdError {

    constructor(path) {

        const message = ERROR_MESSAGE_RETRIEVING_CCD_CASES

        super(message)

        this.name = 'GetCCDCasesError'
        this.errorCode = ERROR_MESSAGE_RETRIEVING_CCD_CASES
        this.humanMessage = message
        this.path = path
    }
}

module.exports = {
    CcdError,
    GetCcdCasesError,
};
