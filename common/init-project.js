let fs = require('fs-extra')
let path = require('path')

let width = 1334
let height = 646
let projectName = 'farm'
let assets = 'assets'
let projectDesc = '一个测试的初始化例子'

let preloadStartStr = 'preloadStart'
let preloadEndStr = 'preloadEnd'
let createStartStr = 'createStart'
let createEndStr = 'createEnd'

let rootPath = path.resolve(path.join('../', projectName))
let assetsPath = path.resolve(path.join('../', projectName, 'assets'))
let variableNameArr = []
let relativePathArr = []

start()

function start() {
    let isExit = fs.existsSync(path.join(rootPath, 'index.ts'))
    if (!isExit) {
        createDir()
        createFileArr()
        readerTS()
        readerHTML()
    }
    update()
}

function createDir() {
    fs.ensureDirSync(path.join('../', projectName, 'assets'))
}

function createFileArr() {
    variableNameArr = []
    relativePathArr = []
    let fileArr = fs.readdirSync(assetsPath)
    fileArr.forEach((file) => {
        let fileStat = fs.statSync(path.join(assetsPath, file))
        if (fileStat.isFile()) {
            if (file.indexOf('.') != 0) {
                let realPath = path.join(assetsPath, file)
                let relativePath = path.relative(path.join(rootPath), realPath)
                relativePathArr.push(relativePath)
                let variableName = file.substr(0, file.indexOf('.'))
                variableNameArr.push(variableName)
            }

        } else if (fileStat.isDirectory()) {
            console.log(path.join(assetsPath, file))
            readFile(path.join(assetsPath, file))
        }
    })
}

function readerTS() {
    let obj = getPreloadStr()
    let className = projectName.substr(0, 1).toLocaleUpperCase() + projectName.substr(1, projectName.length)
    let result = `
    import { BootInitState } from '../common/BootInitState'
    class PreloadInitState extends Phaser.State {
        preload() {
            // preloadStart
            ${obj.preload}
            // preloadEnd
        }
        create() {
            // createStart
           ${obj.create}
           // createEnd
        }
    }
    class ${className} extends Phaser.Game {
        constructor() {
            let boot = new BootInitState(${width}, ${height})
            super(${width}, ${height}, Phaser.CANVAS, 'game')
            this.state.add('boot', boot)
            this.state.add('preload', PreloadInitState)
            this.state.start('boot')
        }
    }
    new ${className}()
    `
    fs.writeFileSync(path.join(rootPath, 'index.ts'), result)
}

function getPreloadStr() {
    let preloadArr = []
    let addArr = []
    for (let i = 0; i < variableNameArr.length; i++) {
        let variableName = variableNameArr[i]
        let relativePath = relativePathArr[i]
        var val = ''
        var load = 'image'
        if (relativePath.indexOf('.mp3') > -1) {
            load = 'audio'
        } else if (relativePath.indexOf('.mp4') > -1) {
            load = 'video'
        } else if (relativePath.indexOf('.js') > -1) {
            load = 'script'
        }
        preloadArr.push(`this.load.${load}('${variableName}', '${relativePath}')`)
        addArr.push(`// this.add.sprite(0, 0, '${variableName}')`)
    }
    return {
        preload: preloadArr.join('\n'),
        create: addArr.join('\n')
    }
}

function getCreateStr() {

}

function readerHTML() {

    let html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>${projectDesc}</title>
    </head>

    <body>
        <div id="game"></div>
        <script src="../common/phaser.min.js"></script>
        <script data-main="../build/${projectName}/index.js" src="../node_modules/requirejs/require.js"></script>
    </body>
    </html>
    `
    fs.writeFileSync(path.join(rootPath, 'index.html'), html)
}

function update() {
    // 先备份文件
    backupIndex()
    fs.watch(assetsPath, (eventType, filename) => {
        if (filename.indexOf('.') > 0) {
            // 重新生成数组数据
            createFileArr()
            // 重新生成TS文件
            renderPreloadCreate()
        }
        // console.log(eventType, filename)
    })

    // console.log(typeof result)
    // console.log(result.split('\n')[10])1
}

function renderPreloadCreate() {
    // 把原始的preload 和 create 清除
    clearOldPreloadCreate()

    let indexObj = getIndex()
    // 计算create的Index值
    let distance = indexObj.preloadEndIndex - indexObj.preloadStartIndex - 1
    indexObj.createStartIndex += distance

    let resultStr = fs.readFileSync(path.join(rootPath, 'index.ts'), {
        encoding: 'UTF-8'
    })
    let resultArr = resultStr.split('\n')
    let obj = getPreloadStr()
    let preloadStr = obj.preload
    let createStr = obj.create
    resultArr.splice(indexObj.preloadStartIndex + 1, 0, preloadStr)
    resultArr.splice(indexObj.createStartIndex + 2, 0, createStr)
    fs.writeFileSync(path.join(rootPath, 'index.ts'), resultArr.join('\n'))
}

function clearOldPreloadCreate() {
    let indexObj = getIndex()
    // 计算create的Index值
    let distance = indexObj.preloadEndIndex - indexObj.preloadStartIndex - 1
    indexObj.createStartIndex -= distance

    let resultStr = fs.readFileSync(path.join(rootPath, 'index.ts'), {
        encoding: 'UTF-8'
    })
    let resultArr = resultStr.split('\n')
    resultArr.splice(indexObj.preloadStartIndex + 1, distance)
    resultArr.splice(indexObj.createStartIndex + 1, distance)
    fs.writeFileSync(path.join(rootPath, 'index.ts'), resultArr.join('\n'))
}

function getIndex() {
    let resultStr = fs.readFileSync(path.join(rootPath, 'index.ts'), {
        encoding: 'UTF-8'
    })
    let resultArr = resultStr.split('\n')
    let preloadStartIndex = 0
    let preloadEndIndex = 0
    let createStartIndex = 0
    let createEndIndex = 0
    for (let i = 0; i < resultArr.length; i++) {
        let str = resultArr[i]
        if (str.indexOf(preloadStartStr) > -1) {
            preloadStartIndex = i
        } else if (str.indexOf(preloadEndStr) > -1) {
            preloadEndIndex = i
        } else if (str.indexOf(createStartStr) > -1) {
            createStartIndex = i
        } else if (str.indexOf(createEndStr) > -1) {
            createEndIndex = i
        }
    }
    return {
        preloadStartIndex,
        preloadEndIndex,
        createStartIndex,
        createEndIndex
    }
}

function backupIndex() {
    let src = path.join(rootPath, 'index.ts')
    let backPath = path.join(rootPath, '../build', 'tmp', projectName)
    let rnd = +(new Date())
    let dest = path.join(backPath, 'index.' + rnd + '.js')
    fs.copySync(src, dest)
}