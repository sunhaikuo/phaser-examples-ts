let fs = require('fs-extra')
let path = require('path')
var getPixels = require("get-pixels")
let width = 1334
let height = 646
let projectName = 'test'
let assets = 'assets'
let projectDesc = '一个测试的初始化例子'


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
    console.log('-->服务启动成功！')
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
            readFileTS(path.join(assetsPath, file))
        }
    })
}

// spritesheet/image/audio/video
function getFileType(fileName) {
    let obj = {}
    let loadType = ''
    let spCnt = 0
    let fileType = fileName.substr(fileName.lastIndexOf('.'))
    if (['.mp3', '.wav'].indexOf(fileType) > -1) {
        loadType = 'audio'
    } else if (fileType.indexOf('.mp4') > -1) {
        loadType = 'video'
    } else if (['.jpg', '.png', 'gif'].indexOf(fileType) > -1) {
        if (fileName.indexOf('-sp-') > -1) {
            loadType = 'spritesheet'
            spCnt = fileName.split('-sp-')[1].split('.')[0]
            obj.cnt = spCnt
        } else {
            loadType = 'image'
        }
    } else {
        throw new Error('No Matched Type:' + fileType)
    }
    obj.type = loadType
    obj.variableName = fileName.substr(0, fileName.lastIndexOf('.'))
    return obj
}

function readerTS() {
    let obj = getPreloadStr()
    let className = upperCaseFirstWord(projectName)
    let result = `
    import { BootInitState } from '../common/BootInitState'
    /* variableStart */
    ${obj.variable}
    /* variableEnd */
    class PreloadInitState extends Phaser.State {
        preload() {
            /* preloadStart */
            ${obj.preload}
            /* preloadEnd */
        }
        create() {
            /* createStart */
           ${obj.create}
           /* createEnd */
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
    let varArr = []
    let addArr = []
    for (let i = 0; i < variableNameArr.length; i++) {
        let variableName = variableNameArr[i]
        let relativePath = relativePathArr[i]
        let camelVal = createCamel(variableName)
        var loadType = 'image'
        if (['.mp3', '.wav'].indexOf(relativePath) > -1) {
            loadType = 'audio'
            varArr.push(`let ${camelVal}:Phaser.Sound`)
        } else if (relativePath.indexOf('.mp4') > -1) {
            loadType = 'video'
            varArr.push(`let ${camelVal}:Phaser.Video`)
        } else if (relativePath.indexOf('.js') > -1) {
            loadType = 'script'
        } else {
            loadType = 'image'
            varArr.push(`let ${camelVal}:Phaser.Sprite`)
        }
        preloadArr.push(`this.load.${loadType}('${variableName}', '${relativePath}')`)
        addArr.push(`${camelVal} = this.add.sprite(0, 0, '${variableName}')`)
    }
    return {
        preload: preloadArr.join('\n'),
        create: addArr.join('\n'),
        variable: varArr.join('\n')
    }
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
            console.log('---->文件更新成功，旧文件已备份！')
        }
    })
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
    let variableStr = obj.variable
    resultArr.splice(indexObj.variableStartIndex + 1, 0, variableStr)
    resultArr.splice(indexObj.preloadStartIndex + 2, 0, preloadStr)
    resultArr.splice(indexObj.createStartIndex + 3, 0, createStr)
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
    resultArr.splice(indexObj.variableStartIndex + 1, distance)
    resultArr.splice(indexObj.preloadStartIndex + 1, distance)
    resultArr.splice(indexObj.createStartIndex + 1, distance)
    fs.writeFileSync(path.join(rootPath, 'index.ts'), resultArr.join('\n'))
}

function getIndex() {
    let resultStr = fs.readFileSync(path.join(rootPath, 'index.ts'), {
        encoding: 'UTF-8'
    })
    let resultArr = resultStr.split('\n')
    let indexObj = {
        preloadStartIndex: -1,
        preloadEndIndex: -1,
        createStartIndex: -1,
        createEndIndex: -1,
        variableStartIndex: -1,
        variableEndIndex: -1
    }
    let errorMsg = ''
    for (let i = 0; i < resultArr.length; i++) {
        let str = resultArr[i]
        if (str.indexOf('preloadStart') > -1) {
            indexObj.preloadStartIndex = i
        } else if (str.indexOf('preloadEnd') > -1) {
            indexObj.preloadEndIndex = i
        } else if (str.indexOf('createStart') > -1) {
            indexObj.createStartIndex = i
        } else if (str.indexOf('createEnd') > -1) {
            indexObj.createEndIndex = i
        } else if (str.indexOf('variableStart') > -1) {
            indexObj.variableStartIndex = i
        } else if (str.indexOf('variableEnd') > -1) {
            indexObj.variableEndIndex = i
        }
    }
    for (let key in indexObj) {
        if (indexObj[key] == -1) {
            errorMsg = '未找到[' + key + ']的索引值'
        }
    }
    if (errorMsg != '') {
        console.log(errorMsg)
        return
    }
    return indexObj
}

function backupIndex() {
    let src = path.join(rootPath, 'index.ts')
    let backPath = path.join(rootPath, '../build', 'tmp', projectName)
    let rnd = +(new Date())
    let dest = path.join(backPath, 'index.' + rnd + '.js')
    fs.copySync(src, dest)
}

function upperCaseFirstWord(word) {
    let className = ''
    if (word) {
        className = word.substr(0, 1).toLocaleUpperCase() + word.substr(1, word.length)
    }
    return className
}

function createCamel(word) {
    let arr = word.split('-')
    if (arr && arr.length > 1) {
        for (let i = 1; i < arr.length; i++) {
            let val = upperCaseFirstWord(arr[i])
            arr[i] = val
        }
    }
    return arr.join('')
}