
Outlast = (function() {
	var my = {};
	var game;
	var map;
	var cursors;
	var playerSprite;
	var baseLayer;
	var collisionLayer;
	var sprintSpeed = 50;
	var walkSpeed = 100;
	
	function preload() {
		game.load.tilemap('outlastLevel',
						  '/assets/outlastMap2.json',
						  null,
						  Phaser.Tilemap.TILED_JSON);
		game.load.image('tiles',"/assets/tiles.png");//image of the tilesets
		game.load.image('spark',"/assets/spark.png");//image of the spark
		game.load.spritesheet("survivor","/assets/survivorSpriteSheet256x64r.png",64,64,4);
		
	}
	
	function create() {
		game.stage.backgroundColor = '#787878';
		map = game.add.tilemap('outlastLevel');//some id for the map in the cache
		map.addTilesetImage("tiles",'tiles');//id of the tileset, and id of the cache tileset
		baseLayer = map.createLayer("baseLayer");//layer id's in the tilemap
		collisionLayer = map.createLayer("walls");
		baseLayer.resizeWorld();
		collisionLayer.resizeWorld();
		map.setCollision([2,6,7,13,14],true,"walls");
		cursors = game.input.keyboard.createCursorKeys();
		playerSprite = game.add.sprite(40,100,"survivor");
		playerSprite.anchor.setTo(0.5,0.5);
		playerSprite.animations.add('walk');
		playerSprite.body.collideWorldBounds = true;
		playerSprite.body.setRectangle(30,34,16,16);//make collision look a bit more real
		game.camera.follow(playerSprite);
	}
	
	function playerCollideHandler(obj1, obj2){
		//Do nothing
	}
	
	function animatePlayer() {
		playerSprite.play('walk',15,false);
	}
	
	function movePlayer() {
		playerSprite.body.velocity.x = 0;
		playerSprite.body.velocity.y = 0;		
		if (game.input.keyboard.isDown(Phaser.Keyboard.A)) {
			animatePlayer();
			if(game.input.keyboard.isDown(Phaser.Keyboard.SHIFT)){
				playerSprite.body.velocity.x -= (walkSpeed + sprintSpeed);
			} else {
				playerSprite.body.velocity.x -= walkSpeed;
			}
		} else if (game.input.keyboard.isDown(Phaser.Keyboard.D)) {
			animatePlayer();
			if(game.input.keyboard.isDown(Phaser.Keyboard.SHIFT)){
				playerSprite.body.velocity.x += (walkSpeed + sprintSpeed);
			} else {
				playerSprite.body.velocity.x += walkSpeed;
			}	
		}
		if (game.input.keyboard.isDown(Phaser.Keyboard.W)) {
			animatePlayer();
			if(game.input.keyboard.isDown(Phaser.Keyboard.SHIFT)){
				playerSprite.body.velocity.y -= (walkSpeed + sprintSpeed);
			} else {
				playerSprite.body.velocity.y -= walkSpeed;
			}
		} else if (game.input.keyboard.isDown(Phaser.Keyboard.S)) {
			animatePlayer();
			if(game.input.keyboard.isDown(Phaser.Keyboard.SHIFT)){
				playerSprite.body.velocity.y += (walkSpeed + sprintSpeed);
			} else {
				playerSprite.body.velocity.y +=walkSpeed;
			}				
		} 
	}
	
	function playerCollide() {
		var outcome = game.physics.collide(playerSprite,
								   collisionLayer,
								   playerCollideHandler,
								   null,
								   this);
		//if(outcome){
		//	console.log("Collision: " + outcome);
		//}
		return outcome;
	}
	
	function update() {
		playerSprite.rotation = game.physics.angleToPointer(playerSprite);
		if(!playerCollide()){
			movePlayer();
		}
			
	}

	my.load = function () {
		game = new Phaser.Game(1200,600,Phaser.AUTO,"outlast",{preload:preload,
															   create:create,
															   update:update});	
	}
			
	return my;
});