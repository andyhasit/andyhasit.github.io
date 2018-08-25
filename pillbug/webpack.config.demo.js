module.exports = {
    "mode": "development",
    "entry": __dirname+'/demo/src/index.js',
    "output": {
        "path": __dirname+'/demo/dist',
        "filename": "bundle.js"
    },
    "devtool": "source-map"
}