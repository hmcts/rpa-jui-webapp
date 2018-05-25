const config = {
    docker: require('./docker.config.js'),
    local: require('./local.config.js'),
    aat: require('./aat.config.js')
};
const env = process.env.NODE_ENV || 'local';
module.exports = config[env];