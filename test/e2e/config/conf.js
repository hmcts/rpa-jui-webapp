const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const minimist = require('minimist');
const argv = minimist(process.argv.slice(2));
const tagProcessor = require('../support/tagProcessor');

chai.use(chaiAsPromised);
const config = {
    baseUrl: process.env.TEST_URL || 'http://localhost:3000',
    params: {
        serverUrls: {
            local: 'https://localhost:3000',
            // dev: 'https://forecaster-ui.dev.tmt.informa-labs.com',
            // prod: 'https://forecaster.ovum.com'
        },
        targetEnv: argv.env || 'local',
        username: process.env.TEST_EMAIL,
        password: process.env.TEST_PASSWORD

    },
    directConnect: true,
    seleniumAddress: process.env.WEB_DRIVER_HOST || 'http://localhost:4444/wd/hub',
    getPageTimeout: 60000,
    allScriptsTimeout: 500000,

    capabilities: {
        browserName: 'chrome'
//         proxy: {
//             proxyType: 'manual',
//             httpProxy: 'proxyout.reform.hmcts.net:8080',
//             sslProxy: 'proxyout.reform.hmcts.net:8080',
//             noProxy: 'localhost:3000'
//         }
    },
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    specs: ['../features/**/*.feature'],

    // resultJsonOutputFile: "reports/json/protractor_report.json",

    onPrepare() {
        browser.manage().window().maximize();
        browser.waitForAngularEnabled(false);
        global.expect = chai.expect;
        global.assert = chai.assert;
        global.should = chai.should;
    },

    cucumberOpts: {
        strict: true,
        format: ['node_modules/cucumber-pretty'],
        require: [
            '../support/world.js',
            '../features/step_definitions/**/*steps.js'
        ]
    }
};

config.cucumberOpts.tags = tagProcessor(config, argv);

exports.config = config;
