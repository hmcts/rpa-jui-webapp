import * as express from 'express'
import { config } from '../../../config/index'

const { getDetails, postOauthToken } = require('../../services/idam-api/idam-api')

const cookieToken = config.cookies.token
const cookieUserId = config.cookies.userId

const test = true

export function logout(req, res) {
    res.clearCookie(cookieToken)
    res.clearCookie(cookieUserId)
    res.redirect(req.query.redirect || '/')
}

export function auth(app) {
    const router = express.Router()

    app.use('/oauth2/callback', router)

    router.use((req: any, res, next) => {
        postOauthToken(req.query.code, req.get('host'))
            .then(data => {
                if (data.access_token) {
                    const options = { headers: { Authorization: `Bearer ${data.access_token}` } }
                    getDetails(options).then(details => {
                        req.session.user = details
                        res.cookie(cookieToken, data.access_token)
                        res.cookie(cookieUserId, details.id)
                        res.redirect('/')
                    })
                }
            })
            .catch(e => {
                res.redirect('/')
            })
    })

    app.use('/logout', logout)
}
