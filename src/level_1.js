// console.log("Level 1 page loaded");

var pixel_dungeon = pixel_dungeon || {};

pixel_dungeon.level_1 = function() {};

var map;
var exit_box;
var enemy1;
var reward;
var player;
var platforms;
var boundry;

var boundry;
pixel_dungeon.level_1.prototype = {

    preload: function() {
        this.load.image('dungeon_map', 'assets/dungeon.png');
        this.load.image('exit_box', 'assets/exit.png');
        this.load.spritesheet('enemies', 'assets/monsters.png', 16, 16, 108);
        this.load.spritesheet('players', 'assets/rpg_heros.png', 47, 49);
        this.load.spritesheet('items', 'assets/torch_key_gems.png', 16, 17);
        this.load.spritesheet("wall_verticle", 'assets/walls_verticle.png', 30, 30);
        this.load.spritesheet("wall_horizonal", 'assets/walls_horizonal.png', 30, 30);
    },

    create: function() {
        this.physics.startSystem(Phaser.Physics.ARCADE);

        //setup wall group
        boundry = this.add.group();
        boundry.enableBody = true;

        buildOuterWalls();

        //load up map floor
        // map = this.add.sprite(0, 0, 'dungeon_map');
        // map.width = 950;
        // map.height = 600;

        //setup wall group
        platforms = this.add.group();
        platforms.enableBody = true;

        createWalls(550, 200, 'v');
        createWalls(600, 200, 'h');
        createWalls(650, 200, 'v');
        createWalls(700, 200, 'g');

        //load up exit point
        exit_box = this.add.sprite(((this.world.width / 2) - 50), ((this.world.height / 2) - 50), 'exit_box');
        exit_box.width = 100;
        exit_box.height = 100;

        //spawn reward
        reward = this.add.sprite(800, 100, 'items', 10);
        reward.width = 40;
        reward.height = 40;

        //spawn a playable charater
        player = this.add.sprite(400, 200, 'players', 0);
        this.physics.arcade.enable(player);
        player.body.collideWorldBounds = true;
        player.width = 50;
        player.height = 50;
        player.animations.add('left', [12, 13, 14], 10, true);
        player.animations.add('right', [24, 25, 26], 10, true);
        player.animations.add('up', [36, 37, 38], 10, true);
        player.animations.add('down', [0, 1, 2], 10, true);
        player.animations.add('stop', [1], 10, true);

        //spawn an enemy
        enemy1 = this.add.sprite(100, 100, 'enemies', 0);
        enemy1.height = 40;
        enemy1.width = 40;

        //  Our controls.
        cursors = this.input.keyboard.createCursorKeys();
    },//create()

    update: function() {

        this.physics.arcade.collide(player, platforms);
        this.physics.arcade.collide(player, boundry);

        //movement
        if (cursors.left.isDown) {
            player.body.velocity.x = -200;
            player.animations.play('left');
        } else if (cursors.right.isDown) {
            player.body.velocity.x = 200;
            player.animations.play('right');
        } else if (cursors.up.isDown) {
            player.body.velocity.y = -200;
            player.animations.play('up');
        } else if (cursors.down.isDown) {
            player.body.velocity.y = 200;
            player.animations.play('down');
        } else {
            player.body.velocity.x = 0;
            player.body.velocity.y = 0;
            player.animations.play('stop');
        }
    } //update()




};


function createWalls(x, y, type) {
  var wall;

  if (type === 'v') {
    wall = platforms.create(x, y, "wall_horizonal", 3);
  } else {
    wall = platforms.create(x, y, "wall_verticle");
  }

  wall.body.immovable = true;
  wall.width = 50;
  wall.height = 50;
  wall.tint = '0xC0C0C0';
}

function createBounds(x, y, type) {
  var wall;

  if (type === 'v') {
    wall = boundry.create(x, y, "wall_horizonal", 3);
  } else {
    wall = boundry.create(x, y, "wall_verticle");
  }

  wall.body.immovable = true;
  wall.width = 50;
  wall.height = 50;
  wall.tint = '0xC0C0C0';
}


function buildOuterWalls() {
  for (var i = 0; i < 500; i+=50) {
    createBounds(5, i, 'h');
    console.log("wall built");
  }
}
