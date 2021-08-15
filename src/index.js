#!/usr/bin/env node

const { createCommand } = require("./commands/create")
const { importCommand } = require("./commands/import")
const { initCommand } = require("./commands/init")
const { usage } = require("./usage")

const availableCommands = ['init', 'create', 'import']

const app = () => {

    const args = process.argv.slice(2)


    if (!availableCommands.includes(args[0])) {

        usage()
        process.exit(-1)
    }


    if (
        args[0] === 'init'
    ) {
        return initCommand(args.slice(1))
    }


    if (
        args[0] === 'create'
    ) {
        return createCommand(args.slice(1))
    }

    if (
        args[0] === 'import '
    ) {
        return importCommand(args.slice(1))
    }


    console.log("ok")
}

app()