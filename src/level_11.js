var game = new Phaser.Game(950, 600, Phaser.AUTO, 'gameSpace', {
    preload: preload,
    create: create,
    update: update
});



function preload() {
    game.load.image('dungeon_map', 'assets/dungeon.png');
    game.load.image('exit_box', 'assets/exit.png');
    game.load.spritesheet('enemies', 'assets/monsters.png', 16, 16, 108);
    game.load.spritesheet('players', 'assets/rpg_heros.png', 47, 49);
    game.load.spritesheet('items', 'assets/torch_key_gems.png', 16, 17);
    game.load.spritesheet("wall_verticle", 'assets/walls_verticle.png', 30, 30);
    game.load.spritesheet("wall_horizonal", 'assets/walls_horizonal.png', 30, 30);
}



function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //setup wall group
    boundry = game.add.group();
    boundry.enableBody = true;

    buildOuterWalls();

    //load up map floor
    map = game.add.sprite(0, 0, 'dungeon_map');
    map.width = 950;
    map.height = 600;

    //setup wall group for walls
    platforms = game.add.group();
    platforms.enableBody = true;
    // createWall(600, 400, 'v');

    //player, enemy, reward groups
    // players = game.add.group();
    // // players.enableBody = true;
    // enemies = game.add.group();
    // enemies.enableBody = true;
    rewards = game.add.group();
    rewards.enableBody = true;

    //load up exit point
    exit_box = game.add.sprite(((game.world.width / 2) - 50), ((game.world.height / 2) - 50), 'exit_box');
    exit_box.name = 0;
    exit_box.width = 100;
    exit_box.height = 100;

    //spawn rewards
    gem1 = game.add.sprite(65, 25, 'items', 10);
    gem1.name = 0;
    gem1.width = 40;
    gem1.height = 40;
    gem1.enableBody = true;


    gem2 = game.add.sprite(800, 25, 'items', 10);
    gem2.name = 0;
    gem2.width = 40;
    gem2.height = 40;
    gem2.enableBody = true;


    gem3 = game.add.sprite(65, 500, 'items', 10);
    gem3.name = 0;
    gem3.width = 40;
    gem3.height = 40;
    gem3.enableBody = true;


    gem4 = game.add.sprite(800, 500, 'items', 10);
    gem4.name = 0;
    gem4.width = 40;
    gem4.height = 40;
    gem4.enableBody = true;


    //spawn a playable charater
    player = game.add.sprite(400, 200, 'players', 0);
    game.physics.arcade.enable(player);
    // player.body.collideWorldBounds = true;
    player.name = "male";
    player.width = 50;
    player.height = 50;
    player.animations.add('left', [12, 13, 14], 10, true);
    player.animations.add('right', [24, 25, 26], 10, true);
    player.animations.add('up', [36, 37, 38], 10, true);
    player.animations.add('down', [0, 1, 2], 10, true);
    player.animations.add('stop', [1], 10, true);

    // spawn an enemy
    enemy1 = game.add.sprite(110, 50, 'enemies', 0);
    enemy1.alive = true;
    enemy1.name = 0;
    enemy1.height = 40;
    enemy1.width = 40;
    game.physics.arcade.enable(enemy1);

    enemy2 = game.add.sprite(750, 50, 'enemies', 0);
    enemy2.alive = true;
    enemy2.name = 0;
    enemy2.height = 40;
    enemy2.width = 40;
    game.physics.arcade.enable(enemy2);

    enemy3 = game.add.sprite(110, 475, 'enemies', 0);
    enemy3.alive = true;
    enemy3.name = 0;
    enemy3.height = 40;
    enemy3.width = 40;
    game.physics.arcade.enable(enemy3);

    enemy4 = game.add.sprite(750, 475, 'enemies', 0);
    enemy4.alive = true;
    enemy4.name = 0;
    enemy4.height = 40;
    enemy4.width = 40;
    game.physics.arcade.enable(enemy4);

    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();
} //create()

function update() {

    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(player, boundry);
    game.physics.arcade.collide(player, gem1);
    game.physics.arcade.collide(player, gem2);
    game.physics.arcade.collide(player, gem3);
    game.physics.arcade.collide(player, gem4);
    game.physics.arcade.collide(enemy1, platforms);
    game.physics.arcade.collide(enemy2, platforms);
    game.physics.arcade.collide(enemy3, platforms);
    game.physics.arcade.collide(enemy4, platforms);
    game.physics.arcade.collide(enemy1, boundry);
    game.physics.arcade.collide(enemy2, boundry);
    game.physics.arcade.collide(enemy3, boundry);
    game.physics.arcade.collide(enemy4, boundry);
    game.physics.arcade.collide(enemy1, player);
    game.physics.arcade.collide(enemy2, player);
    game.physics.arcade.collide(enemy3, player);
    game.physics.arcade.collide(enemy4, player);
    game.physics.arcade.collide(enemy1, exit_box);
    game.physics.arcade.collide(enemy2, exit_box);
    game.physics.arcade.collide(enemy3, exit_box);
    game.physics.arcade.collide(enemy4, exit_box);

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
// }; //level prototype

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
function createEnemies(x, y) {
    var enemyType;
    switch (currentLevel) {
        case 1:
            rewardType = 0;
            break;
        case 2:
            rewardType = 0;
            break;
        case 3:
            rewardType = 0;
            break;
        case 41:
            rewardType = 0;
            break;
        case 42:
            rewardType = 0;
            break;
        case 43:
            rewardType = 0;
            break;
        case 44:
            rewardType = 0;
            break;
        default:
            rewardType = 0;
    }
    var badGuy = enemies.create(x, y, 'enemies', enemyType);
    badGuy.width = 40;
    badGuy.height = 40;
}

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
    var enemyY = enemy.getBounds().y;

    if (getDistance(player, enemy) < distance) {
        enemy.name = 1;
    }
}

function guardOrFollow(enemy) {
    if (enemy.name > 0) {
        game.physics.arcade.moveToObject(enemy, player, 60, 0);
    }
}

function killPlayer(player, enemy) {
    if (checkOverlap(player, enemy)) {
        if (enemy.alive === true) {
            player.kill();
        }
    }
}

function killEnemy(enemy) {
    if (checkOverlap(enemy, exit_box)) {
        if (exit_box.name > 0) {
            enemy.kill();
        }
    }
}



//-----rewards------
function createReward(x, y) {
    var rewardType;
    switch (currentLevel) {
        case 1:
            rewardType = 10;
            break;
        case 2:
            rewardType = 10;
            break;
        case 3:
            rewardType = 10;
            break;
        case 41:
            rewardType = 10;
            break;
        case 42:
            rewardType = 10;
            break;
        case 43:
            rewardType = 10;
            break;
        case 44:
            rewardType = 10;
            break;
        default:
            rewardType = 0;
    }
    var gem = rewards.create(x, y, 'items', rewardType);
    gem.width = 40;
    gem.height = 40;
}

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
