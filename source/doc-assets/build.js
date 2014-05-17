//
// This file contains all available settings.
//

var mdoc = require('mdoc');

mdoc.run({

    // === required settings === //

    inputDir : '.',
    outputDir : './',


    // === advanced settings === //

    templatePath : __dirname + '/custom_template',

    indexContent: '<h1>Backbone.Marionette Documentation.</h1><p>Please use the links in the sidebar or below to find what you are looking for.</p>',

    //by default it will look at an `assets_` folder inside the `templatePath`
    assetsPath : __dirname + '/custom_assets',

    mapTocName: function (fileName, tocObject) {
      var name = fileName.replace('marionette.', '').replace('.html', '').replace('view', 'View').replace('manager', 'Manager');
      return name.charAt(0).toUpperCase() + name.substring(1);
    }

});
