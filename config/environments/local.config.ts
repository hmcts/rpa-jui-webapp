export default {
    services: {
        ccd_data_api:
            'https://ccd-data-store-api-aat.service.core-compute-aat.internal',
        ccd_def_api:
            'https://ccd-definition-store-api-aat.service.core-compute-aat.internal',
        idam_web: 'https://idam-web-public.aat.platform.hmcts.net',
        idam_api: 'https://idam-api.aat.platform.hmcts.net',
        s2s:
            'http://rpe-service-auth-provider-aat.service.core-compute-aat.internal',
        draft_store_api:
            'http://draft-store-service-aat.service.core-compute-aat.internal',
        dm_store_api: 'https://dm-store-aat.service.core-compute-aat.internal',
        em_anno_api: 'https://em-anno-aat.service.core-compute-aat.internal',
        em_npa_api: 'https://em-npa-aat.service.core-compute-aat.internal',
        coh_cor_api: 'https://coh-cor-aat.service.core-compute-aat.internal'
    },
    proxy: {
        host: '172.16.0.7',
        port: 8080,
    },
    protocol: 'http',
    secureCookie: false,
    sessionSecret: 'secretSauce',
    logging: 'debug'
};
