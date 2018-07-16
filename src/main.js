// import 'phaser'

windowW = window.innerWidth; //document.width is obsolete
windowH = window.innerHeight;

var config = {
    type: Phaser.AUTO,
    width: windowW,
    height: windowH,
    pixelArt: true,
        physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    this.load.multiatlas('ibuki', 'sprites/ibuki_3.json', 'sprites');
}

var ibuki;

var lp_left;
var lp_right;
var lp_attack;
var lp_jump;
var lp_taunt;

var rp_left;
var rp_right;
var rp_attack;
var rp_jump;
var rp_taunt;


function create ()
{
    //set inputs
    lp_left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    lp_right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    lp_attack = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    lp_jump = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    lp_taunt = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);

    rp_left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
    rp_right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);
    rp_attack = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
    rp_jump = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.OPEN_BRACKET);
    rp_taunt = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.CLOSED_BRACKET);

    //we will use arcade physics to move the sprite because it is easy and it will make the jumping, getting hit in the air, etc physics easier

    ibuki = this.physics.add.sprite(400, 400, 'ibuki');
    // ibuki = this.add.sprite(400, 400, 'ibuki', 'idle_45.png');

    ibuki.setBounce(0);
    ibuki.setCollideWorldBounds(true);
    
    ibuki.setScale(2, 2);

    this.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNames('ibuki', {
            start: 0, end: 53, zeroPad: 2,
            prefix: 'idle_', suffix: '.png'
        }),
        frameRate: 20,
        repeat: -1
    });

    this.anims.create({
        key: 'walk_f',
        frames: this.anims.generateFrameNames('ibuki', {
            start: 0, end: 15, zeroPad: 2,
            prefix: 'walk_f_', suffix: '.png'
        }),
        frameRate: 20,
        repeat: -1
    });

     this.anims.create({
        key: 'walk_b',
        frames: this.anims.generateFrameNames('ibuki', {
            start: 15, end: 0, zeroPad: 2,
            prefix: 'walk_f_', suffix: '.png'
        }),
        frameRate: 20,
        repeat: -1
    });
    
}

function update ()
{

    if (lp_left.isDown){
        ibuki.anims.play('walk_b', true);
    }
    else if (lp_right.isDown) {
        ibuki.anims.play('walk_f', true);
    }
    else {
        ibuki.anims.play('idle', true);
    }
    
}