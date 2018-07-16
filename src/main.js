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
			debug: true
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
	this.load.multiatlas('ibuki', 'sprites/characters/ibuki_3.json', 'sprites/characters');
	this.load.image('ground', 'sprites/platform.png');
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

	
    //  The platforms group contains the ground and the 2 ledges we can jump on
	platforms = this.physics.add.staticGroup();
	platforms.create(600, 868, 'ground').setScale(3).refreshBody();

	//we will use arcade physics to move the sprite because it is easy and it will make the jumping, getting hit in the air, etc physics easier

	ibuki = this.physics.add.sprite(400, 400, 'ibuki');
	// ibuki = this.add.sprite(400, 400, 'ibuki', 'idle_45.png');

	ibuki.setBounce(0);
	ibuki.setCollideWorldBounds(true);
	this.physics.add.collider(ibuki, platforms);

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
	
	this.anims.create({
		key: 'crouching',
		frames: this.anims.generateFrameNames('ibuki', {
			start: 0, end: 7, zeroPad: 2,
			prefix: 'crouching_', suffix: '.png'
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
	
}

var airAnimation = 'idle';


function update ()
{


	if(ibuki.body.touching.down){
		if (lp_left.isDown){
			ibuki.anims.play('walk_b', true);
			ibuki.setVelocityX(-100);
			
			if(lp_right.isDown){
				ibuki.anims.play('crouching', true);
				ibuki.setVelocityX(0);
			}
		}
		else if (lp_right.isDown) {
			ibuki.anims.play('walk_f', true);
			ibuki.setVelocityX(+100);
		}
		else if (lp_jump.isDown && ibuki.body.touching.down){
			ibuki.setVelocityY(-100);
			airAnimation = 'jump';
			ibuki.anims.play('jump', true);
			//lock her into this animation until we fall back down
		}
		else {
			ibuki.anims.play('idle', true);
			ibuki.setVelocityX(0);
		}
		
	}
	else{
		//if not grounded, play animation that corresponds to ibuki's state in the air
		ibuki.anims.play(airAnimation, true);
	}

	
}