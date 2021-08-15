const chalk = require('chalk')

const usage = () => {

    [
        `Usage : `,
        `    ${chalk.yellow('fast-files init')}                     initialize fast-files on this project`,
        `    ${chalk.yellow('fast-files create')} ${chalk.green(`TEMPLATE_NAME`)}     create a new template`,
        `    ${chalk.yellow('fast-files import')} ${chalk.green(`URI`)}               import a template from github`,
    ].forEach(line => console.log(line))
}

module.exports = { usage }