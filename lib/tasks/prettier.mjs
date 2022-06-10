import { getPackageJson, runScript, writePackageJson } from "../utils.mjs"

/**
 * @param {TaskQueue} taskQueue
 * @returns {Promise<void>}
 */
export async function setupPrettier(taskQueue) {
    taskQueue.push({
        label: "Adding Prettier config",
        async action() {
            const packageJson = await getPackageJson()
            const scripts = packageJson.scripts || {}
            packageJson.prettier = {
                semi: false,
                tabWidth: 4,
                trailingComma: "es5",
            }
            scripts.prettier = `prettier --write \"**/*\".{js,jsx,ts,tsx,mjs,cjs,html,json,css,md}`
            packageJson.scripts = scripts
            await writePackageJson(packageJson)
        },
    })

    taskQueue.push({
        label: "Adding Prettier package",
        async action(stdout) {
            await runScript("yarn", ["add", "prettier"], stdout, true)
        },
    })

    taskQueue.push({
        label: "Running Prettier",
        async action(stdout) {
            await runScript("yarn", ["prettier"], stdout, true)
        },
    })
}
