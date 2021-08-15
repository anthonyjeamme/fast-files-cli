const fs = require('fs')
const chalk = require('chalk')
const mkdirp = require('mkdirp')

const initCommand = async () => {

    if (!fs.existsSync('./package.json')) {
        console.log(`${chalk.red("ERROR")} : Please make sure your are in your project root`)
        process.exit(-1)
    }

    mkdirp('.vscode/fast-files/templates')

    console.log(`fast-files ${chalk.green(`initialized`)}`)
    console.log(``)
    console.log(`you can create new templates by adding folders into ${chalk.green(`.vscode/fast-files/templates`)}`)
    console.log(`file you want to be renamed should be names with ${chalk.green('MyComponent')}.`)
}

module.exports = { initCommand }