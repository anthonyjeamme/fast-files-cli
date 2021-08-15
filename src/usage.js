const chalk = require('chalk')

const usage = () => {

    [
        `Usage : `,
        `    ${chalk.yellow('fast-files init')}                                               initialize fast-files on this project`,
        // `    ${chalk.yellow('fast-files create')} ${chalk.green(`TEMPLATE_NAME`)}                               create a new template`,
        `    ${chalk.yellow('fast-files import username reponame')}                           import all templates from a github repo`,
        `    ${chalk.yellow('fast-files import username reponame template1 template2 ...')}   import a specific template from a github repo`,

    ].forEach(line => console.log(line))
}

module.exports = { usage }