import * as express from 'express'
import * as config from '../config'
import { auth } from './controllers/auth'
import caseRoutes from './controllers/case'
import caseListRoute from './controllers/case-list'
import decisionRoutes from './controllers/decisions'
import documentsRoutes from './controllers/documents'
import questionsRoutes from './controllers/questions'
import { errorStack } from './lib/errorStack'
import authInterceptor from './lib/middleware/auth'
import responseRequest from './lib/middleware/responseRequest'
import serviceTokenMiddleware from './lib/middleware/serviceToken'
import barApiRoutes from './services/bar'
import ccdStoreApiRoutes from './services/ccd-store-api/ccd-store'
import ccdDefApiRoutes from './services/ccdDef'
import cohCorApiRoutes from './services/cohQA'
import dmStoreApiRoutes from './services/DMStore'
import emAnnoApiRoutes from './services/emAnno'
import emNpaApiRoutes from './services/emNpa'
import idamApiRoutes from './services/idam'
import s2sApiRoutes from './services/serviceAuth'

const router = express.Router()

const eventsRoutes = require('./controllers/events')

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

router.use(responseRequest)
auth(router)

router.use(serviceTokenMiddleware)
router.use(authInterceptor)

router.use(errorStack)

caseListRoute(router)
decisionRoutes(router)
documentsRoutes(router)
caseRoutes(router)
eventsRoutes(router)
questionsRoutes(router)

if (config.configEnv !== 'prod') {

    // Uncomment to enable direct access to Microservices
    barApiRoutes(router)
    ccdDefApiRoutes(router)
    ccdStoreApiRoutes(router)
    cohCorApiRoutes(router)
    dmStoreApiRoutes(router)
    idamApiRoutes(router)
    s2sApiRoutes(router)
}

emAnnoApiRoutes(router)
emNpaApiRoutes(router)

module.exports = router
