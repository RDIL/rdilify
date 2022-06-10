import { analyzeMetafile, build } from "esbuild"

let keepNames = process.argv.includes("--keep-names")
let noMinify = process.argv.includes("--no-minify")

const { metafile } = await build({
    platform: "node",
    bundle: true,
    target: "node16",
    outfile: "rdilify.mjs",
    entryPoints: ["lib/index.mjs"],
    metafile: true,
    treeShaking: true,
    minifySyntax: !noMinify,
    minifyIdentifiers: !keepNames,
    format: "esm",
    inject: ["lib/requireLoader.mjs"],
    sourcemap: "inline",
    loader: {
        ".editorconfig": "text",
    },
})

console.log(await analyzeMetafile(metafile))
