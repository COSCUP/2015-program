"use strict"
if (!parseInt(process.versions.node[0])) {
    throw "Note: This script is incompatible with Node.js 0.*.*"
}

const fs = require('fs')
const Browser = require('zombie')
const child_process = require('child_process')
const paths = process.argv.slice(2)
Browser.localhost('localhost', 3000);

const browser = new Browser({ waitDuration: '10s' })
const path = paths.shift() || '/'
try { fs.mkdirSync("./" + path) } catch (e) {}
const outputFile = "./" + path + "/index.html"
fs.writeFileSync(outputFile, `<body>Error: Building ${path} failed!`)

browser.visit(path, ()=>{
    let image = 'http://coscup.org/2015/assets/og-image.jpg'
    let meta = browser.document.querySelector('meta[property="og:image"]')
    if (meta && meta.getAttribute('content')) { image = 'http://coscup.org' + meta.getAttribute('content').replace('http://coscup.org', '') }
    let output = `<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>${ browser.document.title }</title>
        <meta property="og:title" content="2015 COSCUP">
        <meta name="og:description" content="COSCUP 2015, 8/15-16 中央研究院。台灣 Opens Source 相關社群聯合舉辦的大型開放源碼研討會。讓世界各地的 FLOSS 愛好者、專家藉由開源人年會齊聚一堂，分享經驗、想法與新技術，共同激發群眾投入貢獻開源 / 自由軟體。">
        <meta property="og:url" content="http://coscup.org/2015/">
        <meta property="og:site_name" content="2015 COSCUP">
        <meta content="${ image }" property="og:image">
        <meta content="website" property="og:type">
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
        <meta content="${ image }" name="twitter:image">
        <link rel="stylesheet" href="build/css/font-awesome.min.css">
        <link rel="stylesheet" href="build/styles.css">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    </head>
    <body id='production'>${browser.document.body.innerHTML.replace(
            /<script[^>]*>.*?<\/script>/ig, ''
        )}
        <script src="build/bundle.js"></script>
    </body>
</html>`
    fs.writeFile(outputFile, output, ()=>{
        const seen = {}
        let waitFor = 0
        while (/href="#?(\/[^/."][^."]+)"/.test(output)) {
            output = output.replace(/href="(\/[^/."][^."]+)"/, '')
            const p = RegExp.$1
            if (seen[p]) { continue }
            if (fs.existsSync("./" + p + "/index.html")) { continue }
            seen[p] = true
            waitFor++
            console.log(p)
            const cmd = child_process.spawn("./node_modules/.bin/babel-node", ["scripts/gen-static.js", p])
            cmd.stdout.on('data', (data) => {
                if (data && !/WDS|HMR|DevTools/.test(data)) {
                    console.log(('> ' + data).replace(/\n/g, ''))
                }
            })
            cmd.on('close', () => {
                waitFor--
                if (waitFor <= 0) { process.exit() }
            })
        }
        if (!waitFor) { process.exit() }
    })
})