const config = {
    local: require('./local.config.js'),
    docker: require('./docker.config.js'),
    saat: require('./saat.config.js'),
    sprod: require('./sprod.config.js'),
    demo: require('./demo.config.js'),
    aat: require('./aat.config.js'),
    prod: require('./prod.config.js')
};
const env = typeof(process) !== 'undefined' ? (process.env.JUI_ENV || 'local') : 'local';
console.log('Using ' + env + ' Config');
module.exports = config[env];
