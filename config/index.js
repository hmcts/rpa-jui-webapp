const config = {
    docker: require('./docker.json'),
    local: require('./local.json'),
    aat: require('./aat.json')
};
const env = process.env.NODE_ENV || 'local';
module.exports = config[env];