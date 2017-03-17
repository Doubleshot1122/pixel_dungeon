console.log("title page loaded");

var pixel_dungeon = pixel_dungeon || {};

pixel_dungeon.title = function() {};

pixel_dungeon.title.prototype = {

    preload: function() {
      this.load.image('title_background', 'assets/title_backdrop.jpg');


    },

    create: function() {
        this.add.sprite(0,0,'title_background');

    },

    update: function () {
      console.log("switching to level 1");
      pixel_dungeon.game.state.start('level_1');

    }

};
