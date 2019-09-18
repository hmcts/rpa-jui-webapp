export default {
    services: {
        ccd_data_api:
            'https://ccd-data-store-api-saat.service.core-compute-saat.internal',
        ccd_def_api:
            'https://ccd-definition-store-api-saat.service.core-compute-saat.internal',
        idam_web: 'http://idam-web-public-idam-saat.service.core-compute-idam-saat.internal/',
        idam_api: 'http://idam-api-idam-saat.service.core-compute-idam-saat.internal/',
        s2s:
            'http://rpe-service-auth-provider-saat.service.core-compute-saat.internal',
        draft_store_api:
            'http://draft-store-service-saat.service.core-compute-saat.internal',
        dm_store_api:
            'https://dm-store-saat.service.core-compute-saat.internal',
        em_anno_api: 'https://em-anno-saat.service.core-compute-saat.internal',
        em_npa_api: 'https://em-npa-saat.service.core-compute-saat.internal',
        coh_cor_api: 'https://coh-cor-saat.service.core-compute-saat.internal'
    },
    useProxy: false,
    secureCookie: false,
    sessionSecret: 'secretSauce'
};
