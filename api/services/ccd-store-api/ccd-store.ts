import * as express from 'express'
import { map } from 'p-iteration'
import { config } from '../../../config'
import { http } from '../../lib/http'
import * as log4jui from '../../lib/log4jui'
import { CCDEventResponse } from '../../lib/models'
import { asyncReturnOrError, getHealth, getInfo } from '../../lib/util'

const logger = log4jui.getLogger('ccd-store')

const url = config.services.ccd_data_api

export async function getCCDEventToken(userId: string,
    jurisdiction: string,
    caseType: string,
    caseId: string,
    eventId: string): Promise<any> {
    const response = await http.get(
        `${url}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/${caseType}/cases/${caseId}/event-triggers/${eventId}/token`
    )

    return response.data
}

export async function getEventTokenAndCase(userId: string,
    jurisdiction: string,
    caseType: string,
    caseId: string,
    eventId: string): Promise<CCDEventResponse> {
    const response = await http.get(
        `${url}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/${caseType}/cases/${caseId}/event-triggers/${eventId}/token`
    )

    return { token: response.data.token, caseDetails: response.data.case_details }
}

export async function getCCDEventTokenWithoutCase(userId: string,
    jurisdiction: string,
    caseType: string,
    eventId: string): Promise<any> {
    const response = await http.get(
        `${url}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/${caseType}/event-triggers/${eventId}/token`
    )

    return response.data
}

export async function postCaseWithEventToken(userId: string, jurisdiction: string, caseTypeId: string, caseId: string, body: any): Promise<any> {

    const response = await http.post(
        `${url}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/${caseTypeId}/cases/${caseId}/events`,
        body
    )

    return response.data
}

export async function postCCDEvent(userId: string, jurisdiction: string, caseType: string, caseId: string, body: any): Promise<any> {
    const response = await http.get(
        `${url}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/${caseType}/cases/${caseId}/events`
    )

    return response.data
}

export async function getCCDCase(userId: string, jurisdiction: string, caseType: string, caseId: string): Promise<any> {
    const response = await http.get(
        `${url}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/${caseType}/cases/${caseId}`
    )

    return response.data
}

export async function getCCDEvents(userId: string, jurisdiction: string, caseType: string, caseId: string): Promise<any> {
    const response = await http.get(
        `${url}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/${caseType}/cases/${caseId}/events`
    )

    return response.data
}

//TODO : So what happens if there is an error in here.
// So let's the error all the way up to the User a proper error
export async function getCCDCases(userId: string, jurisdiction: string, caseType: string, filter: string): Promise<any> {
    const response = await http.get(
        `${url}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/${caseType}/casesdds?sortDirection=DESC${filter}`
    )
    return response.data
}

export async function postCCDCase(userId: string, jurisdiction: string, caseType: string, body: any): Promise<any> {
    const response = await http.post(`${url}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/${caseType}/cases`, body)
}

export async function getMutiJudCCDCases(userId: string, jurisdictions: any[]): Promise<any[]> {
    const cases = await map(jurisdictions, async (jurisdiction: any) => {

        // So if there is an error in the below, we get in Erro getting cases for ...

        try {
            await getCCDCases(userId, jurisdiction.jur, jurisdiction.caseType, jurisdiction.filter)

        } catch (error) {
            console.log('error in ccd store 2')
            console.log(error)

            // Message on request
            console.log(error.message)
            console.log(error.request.path)

            // Message from Api
            console.log(error.response.data.message)
            console.log(error.response.status)

            // console.log(error.data.path)
            // console.log(error.request)


            // For debuggin on the UI we should see:
            // An error message
            // A 404
            // the path we're trying to request

            // const error = {
            //     path: '',
            //     timestamp: '',
            //     errorMessage: '',
            //     statusCodeFromApi: '',
            //     message: '',
            //     statusCode: '',
            // }

            // on the UI we should see 404, with the path
            // a common error code to place up.
            // So if this gets a 404 we should surface this,
        }

        // return await asyncReturnOrError(
        //     getCCDCases(userId, jurisdiction.jur, jurisdiction.caseType, jurisdiction.filter),
        //     `Error getting cases for ${jurisdiction.jur}`,
        //     null,
        //     logger,
        //     false
        // )
    })

    return cases
}

export async function createCase(userId: string,
    jurisdiction: string,
    caseType: string,
    eventId: string,
    description: string,
    summary: string,
    data: any): Promise<any> {
    return getCCDEventTokenWithoutCase(userId, jurisdiction, caseType, eventId)
        .then(eventToken => {
            return {
                data,
                event: {
                    description,
                    id: eventId,
                    summary,
                },
                event_token: eventToken.token,
                ignore_warning: true,
            }
        })
        .then(obj => {
            return obj
        }) // use to debug case creation or update
        .then(body => postCCDCase(userId, jurisdiction, caseType, body))
}

export async function updateCase(userId: string,
    jurisdiction: string,
    caseType: string,
    caseId: string,
    eventId: string,
    description: string,
    summary: string,
    data: any): Promise<any> {
    return getCCDEventToken(userId, jurisdiction, caseType, caseId, eventId)
        .then(eventToken => {
            return {
                data,
                event: {
                    description,
                    id: eventId,
                    summary,
                },
                event_token: eventToken.token,
                ignore_warning: true,
            }
        })
        .then(obj => {
            return obj
        }) // use to debug case creation or update
        .then(body => postCCDEvent(userId, jurisdiction, caseType, caseId, body))
}



export default app => {
    const router = express.Router({ mergeParams: true })
    app.use('/ccd-store', router)

    router.get('/health', (req, res, next) => {
        res.status(200)
        res.send(getHealth(url))
    })

    router.get('/info', (req, res, next) => {
        res.status(200)
        res.send(getInfo(url))
    })
}
