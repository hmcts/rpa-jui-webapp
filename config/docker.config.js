module.exports = {
    services: {
        ccd_data_api: "http://localhost:4452",
        idam_web: "http://localhost:3501",
        idam_api: "http://localhost:4501",
        s2s: "http://localhost:4502",
        dm_store_api: "http://localhost:4603",
        em_anno_api: "http://localhost:3621",
        em_redact_api: "http://localhost:3623"
    },
    microservice: "jui_webapp",
    useProxy: true,
    cookieName: '_JUI_AUTH_',
    idam_client: 'jui_webapp'
};
