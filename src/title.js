console.log("title page loaded");

var pixel_dungeon = pixel_dungeon || {};

pixel_dungeon.title = function() {};

pixel_dungeon.title.prototype = {

    preload: function() {
      this.load.image('title_background', 'assets/title_backdrop.jpg');


    },

    create: function() {
        this.add.sprite(0,0,'title_background');

        var playButton = this.add.button(160, 320, "play", this.level_1,this);

	      playButton.anchor.setTo(0.5,0.5);

    },

    update: function () {

    }

};

pixel_dungeon.game.state.start('level_1');
