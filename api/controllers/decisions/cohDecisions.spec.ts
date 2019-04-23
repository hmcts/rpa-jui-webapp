/* tslint:disable:no-unused-expression no-var-requires */
import * as chai from 'chai'
import { expect } from 'chai'
import 'mocha'
import * as moment from 'moment'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import { mockReq, mockRes } from 'sinon-express-mock'
import * as log4jui from '../../lib/log4jui'
import * as headerUtilities from '../../lib/utilities/headerUtilities'
import * as cohDecisions from './cohDecisions'

chai.use(sinonChai)
describe('Decisions - cohDecisions', () => {
    let sandbox
    const logger = { info: sinon.spy(), error: sinon.spy() }
    const reqParams = {
        auth: {
            userId: 1,
        },
        params: {
            caseId: 1,
            caseTypeId: 1,
            jurId: 1,
            stateId: 1,
        },
    }
    const req = mockReq(reqParams)
    const res = mockRes()

    beforeEach(() => {
        sandbox = sinon.createSandbox()
        sandbox.stub(log4jui, 'getLogger').returns(logger)
    })

    afterEach(() => {
        sandbox.restore()
    })

    it('getOptions should call getAuthHeaders', () => {
        sandbox.stub(headerUtilities, 'getAuthHeaders')
        cohDecisions.getOptions(req)
        expect(headerUtilities.getAuthHeaders).to.have.been.calledWith(req)
    })
})
