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


//left player and right player inputs:
//left player = lp, right player = rp
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

//physics
var grounded;
var groundHeight;

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
    
    ibuki = this.add.sprite(400, 600, 'ibuki', 'idle_45.png');
    ibuki.setScale(3, 3);
	
	ibuki.setOrigin(0.5,1);

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
	
    this.anims.create({
        key: 'dash_f',
        frames: this.anims.generateFrameNames('ibuki', {
            start: 0, end: 25, zeroPad: 2,
            prefix: 'dash_f_', suffix: '.png'
        }),
        frameRate: 20,
        repeat: -1
    });
	
	this.anims.create({
        key: 'dash_b',
        frames: this.anims.generateFrameNames('ibuki', {
            start: 0, end: 24, zeroPad: 2,
            prefix: 'dash_b_', suffix: '.png'
        }),
        frameRate: 20,
        repeat: -1
    });
	
	this.anims.create({
        key: 'jump',
        frames: this.anims.generateFrameNames('ibuki', {
            start: 0, end: 44, zeroPad: 2,
            prefix: 'jump_', suffix: '.png'
        }),
        frameRate: 20,
        repeat: -1
    });
	
	this.anims.create({
        key: 'crouch',
        frames: this.anims.generateFrameNames('ibuki', {
            start: 0, end: 7, zeroPad: 2,
            prefix: 'crouching_', suffix: '.png'
        }),
        frameRate: 20,
        repeat: -1
    });

	
    lp_left   = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    lp_right  = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    lp_attack = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    lp_jump   = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    lp_taunt  = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
	
	rp_left   = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
    rp_right  = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);
    rp_attack = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
    rp_jump   = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.OPEN_BRACKET);
    rp_taunt  = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.CLOSED_BRACKET);
	
	grounded = false;
	groundHeight = ibuki.y;
}



	var lp_leftPrev = 0;
	var lp_rightPrev = 0;
	var dashThres: 0.3;

function update ()
{
	grounded = ibuki.y <= groundHeight;
	
	if(ibuki.anims.currentAnim != null)
		prevAnim = ibuki.anims.currentAnim;
	
	//dash: press q, q/w, w within .3s
	
	
	var DashEnum = {
	  NONE: 0,
	  LEFT: 1,
	  RIGHT: 3,
	};
	var dashState = DashEnum.NONE;
	
	if(lp_left.onDown){
		
		if(this.time.totalElapsedTime - lp_leftPrev <= dashThres){}
			dashState = DashEnum.LEFT;
		}
		lp_leftPrev = this.time.totalElapsedTime;
	}
	
	if(lp_right.onDown){
		
		if(this.time.totalElapsedTime - lp_rightPrev <= dashThres){
			dashState = DashEnum.RIGHT;
		}
		lp_rightPrev = this.time.totalElapsedTime;
	}
	
	if(grounded){
		
		if (lp_left.isDown)
		{			
			lp_leftPrev = this.time.totalElapsedTime;
			
			if(dashState = DashEnum.LEFT){
				ibuki.x -= 10;
				ibuki.anims.play('dash_b', true);
			}
			else if(!lp_right.isDown){
				ibuki.x -= 4;
				ibuki.anims.play('walk_b', true);
			}
			else{
				ibuki.anims.play('crouch', true);
			}
			
		}
		else if (lp_right.isDown)
		{
			
			ibuki.x += 4;
			ibuki.anims.play('walk_f', true);
		}
		else
		{
			ibuki.anims.play('idle', true);
		}
		
		
		
		
	}
	else{
		//dont allow additional input
		ibuki.anims.play(prevAnim, true);
	}
	
}