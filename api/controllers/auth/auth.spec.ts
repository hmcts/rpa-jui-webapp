import 'mocha'

import * as chai from 'chai'
import { expect } from 'chai'
import * as simonChai from 'sinon-chai'
import { mockReq, mockRes } from 'sinon-express-mock'
chai.use(simonChai)

import { config } from '../../../config'
import { logout } from './index'

describe('Auth', () => {
    describe('logOut', () => {
        it('should delete auth cookie', () => {
            const req = mockReq({})
            const res = mockRes()
            logout(req, res)
            expect(res.clearCookie).to.be.calledWith(config.cookies.token)
        })

        it('should redirect to index page', () => {
            const req = mockReq({})
            const res = mockRes()
            logout(req, res)
            expect(res.redirect).to.be.calledWith('/')
        })
    })
})
