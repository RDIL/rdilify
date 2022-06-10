import { createRequire } from "module"

// This whole file is a hack to make it so that we can use require in the esbuild bundle
// without breaking stuff

globalThis.require = globalThis.require || createRequire(import.meta.url)
