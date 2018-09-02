module.exports = {
    "mode": "production",
    "entry": __dirname + "/src/index.js",
    "output": {
        "path": __dirname + "/dist",
        "filename": "bundle.js"
    },
    "devtool": "source-map"
}