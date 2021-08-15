const rimraf = require('rimraf');

const removeDirectory = (path) => new Promise((resolve) => {
    rimraf(path, resolve)
})

module.exports = {
    removeDirectory
}