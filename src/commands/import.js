const fs = require('fs')
const fse = require('fs-extra')
const axios = require('axios')
const chalk = require('chalk')

const unzipper = require('unzipper')
const mkdirp = require('mkdirp')


const { removeDirectory } = require('../utils')

const importCommand = async (userName, repoName, template) => {

    if (!userName || !repoName) {

        console.log()
        process.exit(-1)
    }

    // const userName = 'anthonyjeamme'
    // const repoName = 'fast-files-templates'

    const zipUrl = `https://github.com/${userName}/${repoName}/archive/refs/heads/main.zip`

    const zip = await axios.get(zipUrl, {
        responseType: 'arraybuffer'
    })

    await mkdirp(`./.vscode/fast-files/tmp`)

    const zipFilePath = `./.vscode/fast-files/tmp/${repoName}.zip`

    fs.writeFileSync(zipFilePath, zip.data)

    const stream = await fs.createReadStream(zipFilePath)
        .pipe(unzipper.Extract({ path: `./.vscode/fast-files/tmp/` }))


    await stream.promise()
    fs.rmSync(zipFilePath)


    if (template) {

        if (!fs.existsSync(`./.vscode/fast-files/tmp/${repoName}-main/${template}`)) {


            console.log(`${chalk.red("ERROR")} can't find template ${chalk.yellow(template)} in this repo`)

            process.exit(-1)
        }

        fse.copySync(
            `./.vscode/fast-files/tmp/${repoName}-main/${template}`,
            `./.vscode/fast-files/templates/${template}`
        )

        console.log(`${chalk.green(template)} template imported`)

    } else {

        const templates = fs.readdirSync(`./.vscode/fast-files/tmp/${repoName}-main`)


        for (const template of templates) {

            fse.copySync(
                `./.vscode/fast-files/tmp/${repoName}-main/${template}`,
                `./.vscode/fast-files/templates/${template}`
            )

            console.log(`${chalk.green(template)} template imported`)
        }
    }

    await removeDirectory(`./.vscode/fast-files/tmp/${repoName}-main`)

}

module.exports = { importCommand }

