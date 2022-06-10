import { readFile, writeFile } from "fs/promises"
import { join } from "path"
import { execa } from "execa"

const packageJsonPath = join(process.cwd(), "package.json")

/**
 * Get the package.json file.
 *
 * @returns {Promise<import("type-fest").PackageJson>}
 */
export async function getPackageJson() {
    return JSON.parse((await readFile(packageJsonPath)).toString())
}

/**
 * Write to the package.json file.
 *
 * @param {import("type-fest").PackageJson} content
 * @returns {Promise<void>}
 */
export async function writePackageJson(content) {
    await writeFile(packageJsonPath, JSON.stringify(content, undefined, 4))
}

/**
 * Run a console command, but pipe it's output to the same as the script.
 *
 * @param {string} script
 * @param {string[]} args
 * @param {Writable} stdout
 * @param {boolean} newLine
 * @returns {Promise<any>}
 */
export function runScript(script, args, stdout, newLine = false) {
    return new Promise((resolve, reject) => {
        const exec = execa(script, args)
        if (newLine) {
            stdout.write("\n")
        }
        exec.stdout.pipe(stdout)
        exec.then(resolve).catch(reject)
    })
}
