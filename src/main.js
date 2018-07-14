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

function create ()
{
    // ibuki = this.physics.add.sprite(100, 450, 'ibuki');
    // ibuki.setBounce(0.2);
    // ibuki.setCollideWorldBounds(true);
	
	// var frameNames = this.anims.generateFrameNames('ibuki', {
    //                      start: 1, end: 8, zeroPad: 2,
    //                      prefix: 'idle', suffix: '.png'
    //                  });
	
	// this.anims.create({ key: 'idle', frames: frameNames, frameRate: 10, repeat: -1 });
    // ibuki.anims.play('idle');
    
    ibuki = this.add.sprite(400, 400, 'ibuki', 'idle_45.png');
    ibuki.setScale(2, 2);

    this.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNames('ibuki', {
            start: 0, end: 53, zeroPad: 2,
            prefix: 'idle_', suffix: '.png'
        }),
        frameRate: 10,
        repeat: -1
    });

    ibuki.anims.play('idle');
    
}

function update ()
{
//    console.log(ibuki);
//    ibuki.anims.play('left',true);   
}