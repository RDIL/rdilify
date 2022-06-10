import { runScript } from "../utils.mjs"

/**
 * @param {TaskQueue} taskQueue
 * @returns {Promise<void>}
 */
export async function setupYarnBerry(taskQueue) {
    taskQueue.push({
        label: "Download Yarn",
        async action(stdout) {
            await runScript("yarn", ["set", "version", "berry"], stdout, true)
        },
    })

    taskQueue.push({
        label: "Configure Yarn",
        async action(stdout) {
            const setOption = async (name, value) => {
                await runScript("yarn", ["config", "set", name, value], stdout)
            }

            await setOption("nodeLinker", "node-modules")
            await setOption("initScope", "@rdil")
            await setOption("enableInlineHunks", "true")
            await setOption("enableGlobalCache", "false")
        },
    })

    taskQueue.push({
        label: "Install packages with Yarn",
        async action(stdout) {
            await runScript("yarn", [], stdout, true)
        },
    })
}
