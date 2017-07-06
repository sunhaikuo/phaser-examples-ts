var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Lottery;
(function (Lottery_1) {
    var PreloadState = (function (_super) {
        __extends(PreloadState, _super);
        function PreloadState() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PreloadState.prototype.preload = function () {
            if (window.orientation == 180 || window.orientation == 0) {
                this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
            }
            else if (window.orientation == 90 || window.orientation == -90) {
                this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            }
            else {
                this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
            }
            // 屏幕旋转
            window.onorientationchange = function () {
                // _this.game.state.start('boot')
                window.location.reload();
            };
            this.game.stage.backgroundColor = '#11e6cd';
            // 加载前期资源
            this.game.load.image('loadMan', './assets/load-man.png');
            this.game.load.image('processWrap', './assets/process-wrap.png');
            // 开始画面
            this.game.load.image('startBg', './assets/start-bg.png');
            this.game.load.image('startBtn', './assets/start-btn.png');
            // 进度文字
            var style = {
                font: "18px Arial",
                fill: "#000000",
                wordWrap: true,
                align: "center"
            };
            this.processText = this.game.add.text(this.game.width / 2, this.game.height / 2, '0%', style);
            this.processText.anchor.set(0.5);
            // 加载进度
            this.game.load.onFileComplete.add(function (process, key) {
                // 进度外围
                var processWrap;
                if (key == 'loadMan') {
                    // 人物
                    var loadMan = this.game.add.sprite(this.game.width / 2, 230, 'loadMan');
                    loadMan.anchor.setTo(0.5);
                }
                else if (key == 'processWrap') {
                    // 进度外围
                    processWrap = this.game.add.sprite(this.game.width / 2, this.game.height / 2, 'processWrap');
                    processWrap.anchor.setTo(0.5);
                }
                this.graphics = this.game.add.graphics(0, 0);
                this.graphics.beginFill(0xffbd05, 1);
                var width = 464 * (process / 100);
                this.graphics.drawRoundedRect(this., 285, width, 30, 18);
                this.processText.text = process + '%';
                this.game.world.bringToTop(this.processText);
            }, this);
        };
        PreloadState.prototype.create = function () {
            // 进入加载画面
            // this.game.state.start('preload')
        };
        return PreloadState;
    }(Phaser.State));
    var PlayState = (function (_super) {
        __extends(PlayState, _super);
        function PlayState() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PlayState.prototype.create = function () {
            console.log("--crate");
        };
        return PlayState;
    }(Phaser.State));
    var Lottery = (function (_super) {
        __extends(Lottery, _super);
        function Lottery() {
            var _this = this;
            var docEle = document.documentElement;
            // alert(docEle.clientWidth)
            _this = _super.call(this, docEle.clientWidth * 2, docEle.clientHeight * 2, Phaser.AUTO, 'game') || this;
            _this.state.add('boot', PreloadState);
            _this.state.add('preload', PreloadState);
            _this.state.add('play', PlayState);
            _this.state.start('boot');
            return _this;
        }
        return Lottery;
    }(Phaser.Game));
    new Lottery();
})(Lottery || (Lottery = {}));
