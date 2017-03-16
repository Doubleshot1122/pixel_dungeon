console.log("Level 1 page loaded");

var pixel_dungeon = pixel_dungeon || {};

pixel_dungeon.level_1 = function() {};

var currentLevel = 1;
var platforms;
var map;
var boundry;
var enemy1;
var enemy2;
var enemy3;
var enemy4;
var player;
var gem1;
var gem2;
var gem3;
var gem4;
var collectedRewards = 0;
var numberOfRewards = 4;
var enemiesRemaining = 4;
var exit_box;

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
        map = this.add.sprite(0, 0, 'dungeon_map');
        map.width = 950;
        map.height = 600;

        //setup wall group for walls
        platforms = this.add.group();
        platforms.enableBody = true;
        // createWall(600, 400, 'v');

        //load up exit point
        exit_box = this.add.sprite(((this.world.width / 2) - 50), ((this.world.height / 2) - 50), 'exit_box');
        exit_box.name = 0;
        exit_box.width = 100;
        exit_box.height = 100;

        //spawn gems
        gem1 = this.add.sprite(65, 25, 'items', 10);
        gem1.name = 0;
        gem1.width = 40;
        gem1.height = 40;
        gem1.enableBody = true;

        gem2 = this.add.sprite(800, 25, 'items', 10);
        gem2.name = 0;
        gem2.width = 40;
        gem2.height = 40;
        gem2.enableBody = true;

        gem3 = this.add.sprite(65, 500, 'items', 10);
        gem3.name = 0;
        gem3.width = 40;
        gem3.height = 40;
        gem3.enableBody = true;

        gem4 = this.add.sprite(800, 500, 'items', 10);
        gem4.name = 0;
        gem4.width = 40;
        gem4.height = 40;
        gem4.enableBody = true;

        //spawn a playable charater
        player = this.add.sprite(400, 200, 'players', 0);
        this.physics.arcade.enable(player);
        player.name = "male";
        player.width = 50;
        player.height = 50;
        player.animations.add('left', [12, 13, 14], 10, true);
        player.animations.add('right', [24, 25, 26], 10, true);
        player.animations.add('up', [36, 37, 38], 10, true);
        player.animations.add('down', [0, 1, 2], 10, true);
        player.animations.add('stop', [1], 10, true);

        // spawn an enemy
        enemy1 = this.add.sprite(110, 50, 'enemies', 0);
        enemy1.alive=true;
        enemy1.name = 0;
        enemy1.height = 40;
        enemy1.width = 40;
        this.physics.arcade.enable(enemy1);

        enemy2 = this.add.sprite(750, 50, 'enemies', 0);
        enemy2.alive=true;
        enemy2.name = 0;
        enemy2.height = 40;
        enemy2.width = 40;
        this.physics.arcade.enable(enemy2);

        enemy3 = this.add.sprite(110, 475, 'enemies', 0);
        enemy3.alive=true;
        enemy3.name = 0;
        enemy3.height = 40;
        enemy3.width = 40;
        this.physics.arcade.enable(enemy3);

        enemy4 = this.add.sprite(750, 475, 'enemies', 0);
        enemy4.alive=true;
        enemy4.name = 0;
        enemy4.height = 40;
        enemy4.width = 40;
        this.physics.arcade.enable(enemy4);

        //  Our controls.
        cursors = this.input.keyboard.createCursorKeys();
    }, //create()

    update: function() {

        this.physics.arcade.collide(player, platforms);
        this.physics.arcade.collide(player, boundry);
        this.physics.arcade.collide(player, gem1);
        this.physics.arcade.collide(player, gem2);
        this.physics.arcade.collide(player, gem3);
        this.physics.arcade.collide(player, gem4);
        this.physics.arcade.collide(enemy1, platforms);
        this.physics.arcade.collide(enemy2, platforms);
        this.physics.arcade.collide(enemy3, platforms);
        this.physics.arcade.collide(enemy4, platforms);
        this.physics.arcade.collide(enemy1, boundry);
        this.physics.arcade.collide(enemy2, boundry);
        this.physics.arcade.collide(enemy3, boundry);
        this.physics.arcade.collide(enemy4, boundry);
        this.physics.arcade.collide(enemy1, player);
        this.physics.arcade.collide(enemy2, player);
        this.physics.arcade.collide(enemy3, player);
        this.physics.arcade.collide(enemy4, player);
        this.physics.arcade.collide(enemy1, exit_box);
        this.physics.arcade.collide(enemy2, exit_box);
        this.physics.arcade.collide(enemy3, exit_box);
        this.physics.arcade.collide(enemy4, exit_box);

        //movement (player)
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

        awarenessRange(player, enemy1, 150);
        awarenessRange(player, enemy2, 150);
        awarenessRange(player, enemy3, 150);
        awarenessRange(player, enemy4, 150);
        guardOrFollow(enemy1);
        guardOrFollow(enemy2);
        guardOrFollow(enemy3);
        guardOrFollow(enemy4);
        killPlayer(player, enemy1);
        killPlayer(player, enemy2);
        killPlayer(player, enemy3);
        killPlayer(player, enemy4);
        collectRewards(player, gem1);
        collectRewards(player, gem2);
        collectRewards(player, gem3);
        collectRewards(player, gem4);
        killEnemy(enemy1);
        killEnemy(enemy2);
        killEnemy(enemy3);
        killEnemy(enemy4);
        exitActive();
    } //update()
}; //level prototype

//-----walls and boundries------
function createWall(x, y, type) {
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

function createBounds(x, y, width, height) {
    var wall = boundry.create(x, y, "wall_verticle");

    wall.body.immovable = true;
    wall.width = width;
    wall.height = height;
}

function buildOuterWalls() {
    createBounds(0, 0, 55, 600); //left side
    createBounds(895, 0, 55, 600); //right side
    createBounds(0, 0, 950, 15); //top
    createBounds(0, 560, 950, 40); //bottom
}


//-----enemies------
function checkOverlap(spriteA, spriteB) {

    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);

}

function getDistance(spriteA, spriteB) {
  var boundsAx = spriteA.getBounds().x;
  var boundsAy = spriteA.getBounds().y;
  var boundsBx = spriteB.getBounds().x;
  var boundsBy = spriteB.getBounds().y;

  return Phaser.Math.distance(boundsAx, boundsAy, boundsBx, boundsBy);
}

function awarenessRange(player, enemy, distance) {
  var enemyX = enemy.getBounds().x;
  var enemyY= enemy.getBounds().y;

  if (getDistance(player, enemy) < distance) {
      enemy.name = 1;
    }
}

function guardOrFollow(enemy) {
  if (enemy.name > 0) {
    pixel_dungeon.game.physics.arcade.moveToObject(enemy, player, 60, 0);
  }
}

function killPlayer(player, enemy){
  if (checkOverlap(player, enemy)) {
    if (enemy.alive === true) {
      player.kill();
    }
  }
}

function killEnemy(enemy){
  if (checkOverlap(enemy, exit_box)) {
    if (exit_box.name > 0) {
      enemy.kill();
    }
  }
}



//-----rewards------
function collectRewards(player, reward) {
    if (checkOverlap(player, reward)) {
        reward.kill();
        reward.name = 1;
    }
}

function exitActive() {
    var test = gem1.name + gem2.name + gem3.name + gem4.name;
    if (test === 4) {
        exit_box.name = 1;
        exit_box.tint = Math.random() * 0xffffff;
    }
}
