console.log("main.js loaded");

var pixel_dungeon = pixel_dungeon || {};

pixel_dungeon.game = new Phaser.Game(950, 600, Phaser.AUTO, 'gameSpace');
pixel_dungeon.game.state.add('title', pixel_dungeon.title);
pixel_dungeon.game.state.add("level_1", pixel_dungeon.level_1);
pixel_dungeon.game.state.add("level_2", pixel_dungeon.title);
pixel_dungeon.game.state.add("level_3", pixel_dungeon.level_3);
pixel_dungeon.game.state.add("level_4_1", pixel_dungeon.level_4_1);
pixel_dungeon.game.state.add("level_4_2", pixel_dungeon.level_4_2);
pixel_dungeon.game.state.add("level_4_3", pixel_dungeon.level_4_3);
pixel_dungeon.game.state.add("level_4_4", pixel_dungeon.level_4_4);
pixel_dungeon.game.state.add("gamelose", pixel_dungeon.gamelose);
pixel_dungeon.game.state.add("gameover", pixel_dungeon.gameover);

pixel_dungeon.game.state.start('level_1');
// pixel_dungeon.game.state.start('title');




// function preload() {
//     // game.load.image('dungeon', 'images/dungeon.png');
// }
//
// //global scope variables
// // var player;
//
// function create() {
//   game.physics.startSystem(Phaser.Physics.ARCADE);
//   // map = game.add.sprite(0, 0, 'map');
//
//
//   //game controls
//   cursors = game.input.keyboard.createCursorKeys();
// }
//
// function update() {
//
// }
