#!/usr/bin/env node

import { Cli, Command, Option } from "clipanion"
import { setupPrettier } from "./tasks/prettier.mjs"
import { setupYarnBerry } from "./tasks/yarn.mjs"
import { setupEditorConfig } from "./tasks/editorconfig.mjs"

/** @typedef {{ label: string, action: (stdout: Writable) => Promise<void> | void }[]} TaskQueue */

process.setSourceMapsEnabled?.call(process, true)

class MainCommand extends Command {
    skipYarn = Option.Boolean("--skip-yarn", false, {
        description: "Skip migration to and configuration of Yarn Berry.",
    })
    skipPrettier = Option.Boolean("--skip-prettier", false, {
        description: "Skip installing and configuring Prettier.",
    })
    skipEditorconfig = Option.Boolean("--skip-editorconfig", false, {
        description: "Skip adding a `.editorconfig` file.",
    })

    static usage = Command.Usage({
        category: `Main`,
        description: `Add rdil's preferred settings/toolchains to a JS project.`,
        details: `
        This command sets up various tools that I enjoy using and am used to.
        Setting them up was becoming a bit of a chore, so I wrote this.

        The following tools/settings can be set up by this script:

          - Yarn Berry
          - Prettier
          - \`.editorconfig\`
        `,
        examples: [
            [`Run with default options`, `$0`],
            [
                `Don't run Prettier or \`.editorconfig\` tasks`,
                `$0 --skip-prettier --skip-editorconfig`,
            ],
        ],
    })

    async execute() {
        const stdout = this.context.stdout

        stdout.write("\nrdilifying...\n")

        /** @type {TaskQueue} */
        const taskQueue = []

        if (!this.skipYarn) {
            await setupYarnBerry(taskQueue)
        }

        if (!this.skipPrettier) {
            await setupPrettier(taskQueue)
        }

        if (!this.skipEditorconfig) {
            await setupEditorConfig(taskQueue)
        }

        for (const task of taskQueue) {
            stdout.write(
                `\n[${taskQueue.indexOf(task) + 1}/${taskQueue.length}] ${
                    task.label
                }`
            )
            await task.action(stdout)
        }

        stdout.write(`\nDone!`)
    }
}

const [, app, ...args] = process.argv

const cli = new Cli({
    binaryLabel: `rdilify`,
    binaryName: `node ${app}`,
    binaryVersion: `1.0.0`,
})

cli.register(MainCommand)
cli.runExit(args)
