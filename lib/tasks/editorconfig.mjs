import editorconfig from "../../.editorconfig"
import { writeFile } from "fs/promises"
import { join } from "path"

/**
 * @param {TaskQueue} taskQueue
 * @returns {Promise<void>}
 */
export async function setupEditorConfig(taskQueue) {
    taskQueue.push({
        label: "Write .editorconfig file",
        async action() {
            await writeFile(join(process.cwd(), ".editorconfig"), editorconfig)
        },
    })
}
