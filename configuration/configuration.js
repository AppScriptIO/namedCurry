const path = require('path')
const { script } = require('./script.config.js')

module.exports = {
    directory: {
        root: path.resolve(`${__dirname}/..`),
    },
    script
}
