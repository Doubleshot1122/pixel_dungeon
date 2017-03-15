var level_1 = function(game){
  console.log("Level 1 page loaded");
};

// console.log("level1.js loaded");

// var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameSpace', {
//     preload: preload,
//     create: create,
//     update: update
// });

function preload() {
    // game.load.image('dungeon', 'images/dungeon.png');
}

//global scope variables
// var player;

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);
  // map = game.add.sprite(0, 0, 'map');


  //game controls
  cursors = game.input.keyboard.createCursorKeys();
}

function update() {

}
