console.log("title page loaded");

var pixel_dungeon = pixel_dungeon || {};

pixel_dungeon.title = function() {};

var words = null;

pixel_dungeon.title.prototype = {

    preload: function() {
      this.load.image('title_background', 'assets/title_backdrop.jpg');
      this.load.image('dungeon_map', 'assets/dungeon.png');
      this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

    },

    create: function() {
        // var backgroundImage = this.add.sprite(0,0,'title_background');
        // backgroundImage.height = 600;
        // backgroundImage.width = 950;

        map = this.add.sprite(0, 0, 'dungeon_map');
        map.width = 950;
        map.height = 600;

        words = this.add.text(475, 300, "Level 1 \r Complete");

        //  Centers the text
    words.anchor.set(0.5);
    words.align = 'center';

    //  Our font + size
    words.font =  'Revalia';
    words.fontWeight = 'bold';
    words.fontSize = 100;

    //  Here we create a linear gradient on the Text context.
    //  This uses the exact same method of creating a gradient as you do on a normal Canvas context.
    var grd = words.context.createLinearGradient(0, 0, 0, words.height);

    //  Add in 2 color stops
    grd.addColorStop(0, 'black');
    grd.addColorStop(1, '#e60000');


    //  And apply to the Text
    words.fill = grd;

    },

    update: function () {
    }

};
