export default {
    services: {
        ccd_data_api:
            'http://ccd-data-store-api-sprod.service.core-compute-sprod.internal',
        ccd_def_api:
            'http://ccd-definition-store-api-sprod.service.core-compute-sprod.internal',
        idam_web: 'https://idam-test.dev.ccidam.reform.hmcts.net',
        idam_api: 'https://betaDevBccidamAppLB.reform.hmcts.net',
        s2s:
            'http://rpe-service-auth-provider-sprod.service.core-compute-sprod.internal',
        draft_store_api:
            'http://draft-store-service-sprod.service.core-compute-sprod.internal',
        dm_store_api:
            'http://dm-store-sprod.service.core-compute-sprod.internal',
        em_anno_api:
            'http://em-anno-sprod.service.core-compute-sprod.internal',
        em_npa_api: 'http://em-npa-sprod.service.core-compute-sprod.internal',
        coh_cor_api: 'http://coh-cor-sprod.service.core-compute-sprod.internal'
    },
    useProxy: false,
    secureCookie: false,
    sessionSecret: 'secretSauce'
};
