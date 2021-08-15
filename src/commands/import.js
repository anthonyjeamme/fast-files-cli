const fs = require('fs')
const fse = require('fs-extra')
const axios = require('axios')
const chalk = require('chalk')

const unzipper = require('unzipper')
const mkdirp = require('mkdirp')


const { removeDirectory } = require('../utils')

const importCommand = async (userName, repoName, ..._templates) => {

    if (!userName || !repoName) {

        console.log()
        process.exit(-1)
    }

    const branch = "master"

    const zipUrl = `https://github.com/${userName}/${repoName}/archive/refs/heads/${branch}.zip`


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


    const templates = _templates.length ? _templates : fs.readdirSync(`./.vscode/fast-files/tmp/${repoName}-${branch}`).filter(fileName => fileName !== "README.md")

    for (const template of templates) {

        fse.copySync(
            `./.vscode/fast-files/tmp/${repoName}-${branch}/${template}`,
            `./.vscode/fast-files/templates/${template}`
        )

        console.log(`${chalk.green(template)} template imported`)
    }

    await removeDirectory(`./.vscode/fast-files/tmp/${repoName}-${branch}`)

}

module.exports = { importCommand }

