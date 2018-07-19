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
	
    //  The platforms group contains the ground and the 2 ledges we can jump on
	platforms = this.physics.add.staticGroup();
	platforms.create(600, 868, 'ground').setScale(3).refreshBody();

	//we will use arcade physics to move the sprite because it is easy and it will make the jumping, getting hit in the air, etc physics easier

	ibuki = this.physics.add.sprite(400, 400, 'ibuki');
	// ibuki = this.add.sprite(400, 400, 'ibuki', 'idle_45.png');

	ibuki.setBounce(0);
	ibuki.setCollideWorldBounds(true);

	player.body.setGravityY(300);

	this.physics.add.collider(ibuki, platforms);

	ibuki.setScale(2, 2);

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
	var dashThres = 0.3;

function update ()
{
	grounded = ibuki.y <= groundHeight;
	
	if(ibuki.anims.currentAnim != null){
		prevAnim = ibuki.anims.currentAnim;
	}
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
			
			//regular jump
			if(!lp_right.isDown && !lp_left.isDown){
				ibuki.setVelocityY(-100);
				// airAnimation = 'jump';
				ibuki.anims.play('jump', true);
				ibuki.on('animationcomplete', onCompleteJump, this);
				//lock her into this animation until we fall back down
			}
			//left jump
			if(lp_left.isDown && !lp_right.isDown) {
				ibuki.setVelocityY(-100);
				// airAnimation = 'jump';
				ibuki.anims.play('jump', true);
				// ibuki.setVelocityX(-100);
				ibuki.on('animationcomplete', onCompleteJump, this);
				//lock her into this animation until we fall back down
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