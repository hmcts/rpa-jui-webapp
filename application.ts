import { judgeLookUp } from './api/lib/util'

const healthcheck = require('@hmcts/nodejs-healthcheck');
/*const { InfoContributor, infoRequestHandler } = require('@hmcts/info-provider');*/

import * as express from 'express';
import { config } from './config';
import { appInsights } from './api/lib/appInsights';
import { securityHeaders } from './api/lib/middleware/securityHeaders';
import * as log4jui from './api/lib/log4jui';
import * as globalTunnel from 'global-tunnel-ng';

const apiRoute = require('./api');
config.environment = process.env.JUI_ENV || 'local';

const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const session = require('express-session');
const redis = require('redis');
const redisStore = require('connect-redis')(session);


const tlsOptions = {
    password: process.env.REDIS_PASSWORD,
    tls: true
};

const redisClient = redis.createClient(
    process.env.REDIS_PORT,
    process.env.REDIS_HOST,
    tlsOptions,
);


redisClient.on('error', err => {
    console.log('Redis client error: ', err);
});

app.use(securityHeaders);

app.set('trust proxy', 1);

app.use(
    session({
        cookie: {
            httpOnly: true,
            maxAge: 1800000,
            secure: config.secureCookie !== false
        },
        name: 'jui-webapp',
        resave: true,
        saveUninitialized: true,
        secret: config.sessionSecret,
        store: new redisStore({
            client: redisClient,
            ttl: 86400
        })
    })
);

app.use(appInsights);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use((req, res, next) => {
    // Set cookie for angular to know which config to use
    const platform = process.env.JUI_ENV || 'local';
    res.cookie('platform', platform);
    next();
});

if (config.proxy) {
    globalTunnel.initialize({
        host: config.proxy.host,
        port: config.proxy.port
    });
}

function healthcheckConfig(msUrl) {
    return healthcheck.web(`${msUrl}/health`, {
        timeout: 6000,
        deadline: 6000
    });
}

let healthchecks = {
    checks: {
        ccd_data_api: healthcheckConfig(config.services.ccd_data_api),
        ccd_def_api: healthcheckConfig(config.services.ccd_def_api),
        idam_api: healthcheckConfig(config.services.idam_api),
        s2s: healthcheckConfig(config.services.s2s),
        draft_store_api: healthcheckConfig(config.services.draft_store_api),
        dm_store_api: healthcheckConfig(config.services.dm_store_api),
        em_anno_api: healthcheckConfig(config.services.em_anno_api),
        em_npa_api: healthcheckConfig(config.services.em_npa_api),
        coh_cor_api: healthcheckConfig(config.services.coh_cor_api)
    }
};

healthcheck.addTo(app, healthchecks);

app.get('/oauth2/callback', apiRoute);
app.get('/logout', apiRoute);
app.use('/api', apiRoute);

const logger = log4jui.getLogger('Application');

try {
    judgeLookUp('a@a.com', true);
} catch (e) {
    logger.error('exiting due to malformed crypt file');
    // process.exit(1);
}

logger.info(
    `Started up on ${config.environment || 'local'} using ${config.protocol}`
);

module.exports = app;
