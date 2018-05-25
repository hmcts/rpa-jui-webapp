module.exports = {
    services: {
        ccd_data_api: "https://ccd-data-store-api-aat.service.core-compute-aat.internal",
        s2s: "http://rpe-service-auth-provider-aat.service.core-compute-aat.internal",
        dm: "",
        idam: ""
    },
    microservice: process.env.JUI_MICROSERVICE || "em_gw",
    secret: process.env.JUI_SECRET || "AAAAAAAAAAAAAAAA",
    useProxy: true
};