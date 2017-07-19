var game = new Phaser.Game(240, 400, Phaser.AUTO, 'game')

window.onorientationchange = function () {
    game.state.start('boot')
}


function getOri() {
    if (window.orientation == 180 || window.orientation == 0) {
        return 'v'
    }
    if (window.orientation == 90 || window.orientation == -90) {
        return 'h'
    }
}

// 初始化设置
var boot = {
    preload: function () {
        game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT
    },
    create: function () {
        game.state.start('load')
    }
}



// 加载资源
var load = {
    preload: function () {
        game.load.image('background', 'assets/bg1-h.jpg')
        game.load.image('copyright', 'assets/bg2-h.jpg')
    },
    create: function () {
        // game.state.start('over')
    }
}


game.state.add('boot', boot)
game.state.add('load', load)
game.state.start('boot')