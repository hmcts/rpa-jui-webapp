import 'mocha'

import * as chai from 'chai'
import * as coh from './coh'
import * as log4jui from '../lib/log4jui'
import * as sinonChai from 'sinon-chai'
import * as sinon from 'sinon'
import * as moment from 'moment'

import {mockReq, mockRes} from 'sinon-express-mock'
import {expect} from 'chai'
import {http} from '../lib/http'
import {config} from '../../config'
import {getHearingByCase} from './ccd-store'

chai.use(sinonChai)

const logger = log4jui.getLogger('COH')

describe('CCD Store', () => {

    const url = config.services.ccd_data_api

    const caseId = 'case id'
    const userId = 'user id'
    const hearingId = 'hearingId'

    const res = {
        data: 'okay',
    }

    let spy: any

    beforeEach(() => {

        spy = sinon.stub(http, 'get').resolves(res)
    })

    afterEach(() => {

        spy.restore()
    })

    describe('postCCDEvent', () => {

    })
})
