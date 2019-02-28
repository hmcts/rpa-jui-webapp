const jp = require('jsonpath')
const moment = require('moment')
import documentProcessor from './document-processor'
import {caseStatusProcessor} from './case-status-processor'
import * as log4jui from '../../lib/log4jui'
const logger = log4jui.getLogger('value-processor')
/**
 *
 * Case Status Processor
 *
 * Value In:
 * {
 *  stateName: 'referredToJudge',
 *  stateDateTime: null,
 *  actionGoTo: 'casefile',
 *  ID: '2f00d9e0-dbf4-4acd-a2ac-2e4440c9e584'
 * }
 * Value Out:
 * {
 *  name: 'Draft consent order',
 *  actionGoTo: 'casefile',
 *  ID: '2f00d9e0-dbf4-4acd-a2ac-2e4440c9e584'
 * }
 *
 * @param processor
 * @param caseData
 * @param value
 * @param splitLookup
 */
export const useProcessor = (processor, caseData, value, splitLookup) => {
    console.log('useProcessor')
    console.log(value)

    // All the following use processor to define what it is.

    const DOCUMENT_PROCESSOR = 'document_processor'
    const NEW_LINE_PROCESSOR = 'newline_processor'
    const IF_EMPTY_PROCESSOR = 'if_empty_processor'
    const CASE_STATUS_PROCESSOR = 'case_status_processor'
    const DATE_PROCESSOR = 'date_processor'

    if (value && processor && processor === DOCUMENT_PROCESSOR) {

        value = documentProcessor(value, caseData)
    }

    if (value && processor && processor === NEW_LINE_PROCESSOR) {
        if (typeof value === 'string') {
            value = value ? `${value}\n` : ''
        } else if (Array.isArray(value)) {
            value = (value as any).filter(v => v).join('\n')
        }
    }

    if (splitLookup.length > 1 && processor === IF_EMPTY_PROCESSOR) {
        value = value || (splitLookup[2] ? splitLookup[2] : '')
    }

    if (value && processor && processor === CASE_STATUS_PROCESSOR) {

        logger.info(`Using ${CASE_STATUS_PROCESSOR}`)
        return caseStatusProcessor(value, caseData)
    }

    if (value && processor && processor === DATE_PROCESSOR) {

        logger.info(`Using ${DATE_PROCESSOR}`)
        return moment(value).format('D MMMM YYYY')
    }

    return value
}

/**
 * getValueAndLookup
 *
 * First item of array is the value. Subsequent items are the look ups.
 *
 * @param valueAndLookup Each line represents an example -
 * $.state|case_status_processor
 * $.created_date
 */
export const getValueAndLookup = valueAndLookup => {

    return valueAndLookup.split('|')
}

export const dataLookup = (lookup, caseData) => {

    console.log('dataLookup')
    console.log(lookup)

    if (typeof lookup === 'string') {

        console.log('caseData')
        console.log(lookup)

        // At some point, lookup is: $.state|case_status_processor

        // console.log(caseData)

        const valueAndLookup = getValueAndLookup(lookup) //lookup.split('|')

        console.log('valueAndLookup')
        console.log(valueAndLookup)

        let value = valueAndLookup[0]
        const firstLookup = valueAndLookup[1]

        // Calculates what processor to use.
        // if there are multiply lookups, they seem to be placed on the end ie
        // $.state|case_status_processor
        // the case_status_processor
        const processor = valueAndLookup.length > 1 ? firstLookup : null

        console.log('processor')
        console.log(processor)

        // Run jsonpath if it begins with an A take the full result else just take the 1st value.
        if (value.startsWith('A')) {
            value = value.substring(1)
            value = jp.query(caseData, value)
        } else if (value.startsWith('$')) {
            value = jp.query(caseData, value)[0]
        }

        // Processors
        value = useProcessor(processor, caseData, value, valueAndLookup)

        return value
    } else if (typeof lookup === 'number') {
        return lookup
    } else if (Array.isArray(lookup)) {
        return lookup.map(part => dataLookup(part, caseData)).join('')
    }
    throw new Error('lookup is neither a string or an array.')
}

// module.exports = dataLookup
