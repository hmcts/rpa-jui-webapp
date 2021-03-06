import { getMutiJudCCDCases, updateCase } from '../../services/ccd-store-api/ccd-store'
import { getDetails } from '../../services/idam'

const JUI_AUTO_ASSIGN = 'Auto assigned by JUI'

const jurisdictions = [
    {
        jur: 'SSCS',
        caseType: 'Benefit',
        filter: '&case.appeal.benefitType.code=PIP',
    },
    {
        jur: 'DIVORCE',
        caseType: 'DIVORCE',
        filter: '',
    },
    {
        jur: 'DIVORCE',
        caseType: 'FinancialRemedyMVP2',
        filter: '&state=applicationIssued',
        // filter: ''
    },
    // {
    //     jur: 'CMC',
    //     caseType: 'MoneyClaimCase',
    //     filter: ''
    // },
    // {
    //     jur: 'PROBATE',
    //     caseType: 'GrantOfRepresentation',
    //     filter: ''
    // }
]

export function sortCasesByLastModifiedDate(results) {
    return results.sort((result1, result2) => (new Date(result2.lastModified) as any) - (new Date(result1.lastModified) as any))
}

export function filterAssignedCases(cases) {
    return cases.filter(row => !row.case_data.assignedToJudge)
}

export function combineLists(lists) {
    return [].concat(...lists)
}

// stateType is not needed atm however it could in the future
export function getAssignEventId(jurisdiction, caseType, stateType = null) {
    const defaultAssignToJudgeEventId = 'assignToJudge'
    const assignToJudgeEventIds = {
        sscs: {
            benefit: defaultAssignToJudgeEventId,
        },
        cmc: {
            moneyclaimcase: defaultAssignToJudgeEventId,
        },
        probate: {
            grantofrepresentation: defaultAssignToJudgeEventId,
        },
        divorce: {
            divorce: defaultAssignToJudgeEventId,
            financialremedymvp2: 'FR_referToJudge',
        },
    }
    const jud = assignToJudgeEventIds[jurisdiction.toLowerCase()]
    const template = jud ? jud[caseType.toLowerCase()] : defaultAssignToJudgeEventId
    return template || defaultAssignToJudgeEventId
}

// stateType is not needed atm however it could in the future
export function getUnassignEventId(jurisdiction, caseType, stateType = null) {
    const defaultAssignToJudgeEventId = 'unassignToJudge'
    const assignToJudgeEventIds = {
        sscs: {
            benefit: defaultAssignToJudgeEventId,
        },
        cmc: {
            moneyclaimcase: defaultAssignToJudgeEventId,
        },
        probate: {
            grantofrepresentation: defaultAssignToJudgeEventId,
        },
        divorce: {
            divorce: defaultAssignToJudgeEventId,
            financialremedymvp2: defaultAssignToJudgeEventId,
        },
    }
    const jud = assignToJudgeEventIds[jurisdiction.toLowerCase()]
    const template = jud ? jud[caseType.toLowerCase()] : defaultAssignToJudgeEventId
    return template || defaultAssignToJudgeEventId
}

export function generateAssignToJudgeBody(jurisdiction, caseType, eventId, email) {
    const defaultAssignToJudgeBody = {
        assignedToJudge: email,
    }
    const assignToJudgeEventIds = {
        sscs: {
            benefit: defaultAssignToJudgeBody,
        },
        cmc: {
            moneyclaimcase: defaultAssignToJudgeBody,
        },
        probate: {
            grantofrepresentation: defaultAssignToJudgeBody,
        },
        divorce: {
            divorce: defaultAssignToJudgeBody,
            financialremedymvp2: {
                assignedToJudge: email,
                referToJudgeText: JUI_AUTO_ASSIGN,
                assignedToJudgeReason: 'Draft consent order', // 'Resubmitted draft consent order'
            },
        },
    }
    const jud = assignToJudgeEventIds[jurisdiction.toLowerCase()]
    const template = jud ? jud[caseType.toLowerCase()] : defaultAssignToJudgeBody
    return template || defaultAssignToJudgeBody
}

export function assignToJudge(userId, awaitingJuiRespCases) {
    const newCase = awaitingJuiRespCases[0]
    if (newCase) {
        const jurisdiction = newCase.jurisdiction
        const caseType = newCase.case_type_id
        const caseId = newCase.id
        const eventId = getAssignEventId(jurisdiction, caseType)
        getDetails().then(details => {
            const body = generateAssignToJudgeBody(jurisdiction, caseType, eventId, details.email)
            updateCase(userId, jurisdiction, caseType, caseId, eventId, JUI_AUTO_ASSIGN, JUI_AUTO_ASSIGN, body).catch(error => {
                if (awaitingJuiRespCases.length > 0) {
                    console.error('failed to assign any case')
                    assignToJudge(userId, awaitingJuiRespCases.splice(1, awaitingJuiRespCases.length))
                } else {
                    //    throw error no new cases found
                    console.error(`No cases found`)
                }
            })
        })
    } else {
        //    throw error no new cases found
        console.error(`No cases found`)
    }
}

export function unassignFromJudge(userId, caseData) {
    if (caseData) {
        const jurisdiction = caseData.jurisdiction
        const caseType = caseData.case_type_id
        const caseId = caseData.id
        const eventId = getUnassignEventId(jurisdiction, caseType)
        const body = {}
        updateCase(userId, jurisdiction, caseType, caseId, eventId, JUI_AUTO_ASSIGN, JUI_AUTO_ASSIGN, body).catch(error => {
            console.error(`Couldn't update case`, error)
        })
    } else {
        //    throw error no new cases found
        console.error(`No cases found`)
    }
}

export function unassignAllCaseFromJudge(userId, caseList) {
    return caseList.map(caseData => unassignFromJudge(userId, caseData))
}

export function getNewCase(userId) {
    return getMutiJudCCDCases(userId, jurisdictions, 0)
        .then(combineLists) // TODO: One day will not need this with muti judristion
        .then(filterAssignedCases) // TODO: We should filter on the request not here (FUTURE CHANGE)
        .then(sortCasesByLastModifiedDate) // TODO: hopefully remove in the future
        .then(awaitingJuiRespCases => assignToJudge(userId, awaitingJuiRespCases))
}

module.exports.getNewCase = getNewCase

module.exports.unassignFromJudge = unassignFromJudge

module.exports.unassignAllCaseFromJudge = unassignAllCaseFromJudge
