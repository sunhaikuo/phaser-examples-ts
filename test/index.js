var game = new Phaser.Game(240, 400, Phaser.AUTO, 'game')

// 初始化设置
var boot = {
    preload: function () {
<<<<<<< HEAD
        game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT
=======
        game.load.image('background', 'assets/bg1-h.jpg')
        game.load.image('copyright', 'assets/bg2-h.jpg')
>>>>>>> c65b8ebeaa05b53bd8d87e564bf802a9c8c96880
    },
    create: function () {
        game.state.start('load')
    }
}


// 加载资源
var load = {
    create: function () {
<<<<<<< HEAD
        // game.state.start('over')
    }
}

=======
        this.add.sprite(0, 0, 'background')
        // game.state.start('over')
    }
}

var start = {
    create: function () {
        this.add.sprite(0, 0, 'copyright')
    }
}

window.game1 = game
>>>>>>> c65b8ebeaa05b53bd8d87e564bf802a9c8c96880

game.state.add('boot', boot)
game.state.add('load', load)
game.state.add('start', start)
game.state.start('boot')