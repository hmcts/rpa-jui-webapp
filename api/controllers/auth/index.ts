import * as express from 'express'
import { config } from '../../../config'
import * as log4jui from '../../lib/log4jui'
import * as responseRequest from '../../lib/middleware/responseRequest'
import { asyncReturnOrError, exists } from '../../lib/util'
import { getDetails, postOauthToken } from '../../services/idam'
import * as jwt from 'jsonwebtoken';

const cookieToken = config.cookies.token
const cookieUserId = config.cookies.userId
const cookieRoles = 'roles'

const logger = log4jui.getLogger('auth')

export function doLogout(req, res, status = 302) {
    res.clearCookie(cookieToken)
    res.clearCookie(cookieUserId)
    req.session.user = null
    req.session.save(() => {
        res.redirect(status, req.query.redirect || '/')
    })
}
export function logout(req, res) {
    doLogout(req, res)
}

export async function authenticateUser(req: any, res, next) {
    req.session.user = null
    const data = await asyncReturnOrError(
        postOauthToken(req.query.code, req.get('host')),
        'Error getting token for code',
        res,
        logger,
        false
    )

    if (exists(data, 'access_token')) {

        const details = await asyncReturnOrError(getDetails(data.access_token), 'Cannot get user details', res, logger, false)

        if (details) {
            logger.info('Setting session and cookies')
            req.session.user = details
            res.cookie(cookieUserId, details.id)
            res.cookie(cookieToken, data.access_token)

            // need this so angular knows which enviroment config to use ...
            res.cookie('platform', config.environment)

            const cookieTokenStr = jwt.sign({ roles: req.session.user.roles }, 'juisecret') // secret doesn't really matter
            res.cookie(cookieRoles, cookieTokenStr)
        }
    }
    logger.info('Auth finished, redirecting')
    req.session.save(() => {
        res.redirect('/')
    })
}

export function auth(app) {
    const router = express.Router()

    app.use('/oauth2/callback', router)

    router.use(authenticateUser)

    app.use('/logout', logout)
}
