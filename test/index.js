var game = new Phaser.Game(240, 400, Phaser.AUTO, 'game')

// 初始化设置
var boot = {
    preload: function () {
        game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT
        game.load.image('background', 'assets/bg1-h.jpg')
        game.load.image('copyright', 'assets/bg2-h.jpg')
    },
    create: function () {
        game.state.start('load')
    }
}


// 加载资源
var load = {
    create: function () {
        this.add.sprite(0, 0, 'background')
    }
}

game.state.add('boot', boot)
game.state.add('load', load)
game.state.start('boot')