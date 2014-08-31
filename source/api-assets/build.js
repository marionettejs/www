var Handlebars = require('handlebars');
var fs = require('fs');
var _ = require('underscore');


console.log('Starting jsDocFile build...\n');

var doc = fs.readFileSync("jsDocFile.json").toString();
var json = JSON.parse(doc);



// WRITE index file
//
var indexHbs = fs.readFileSync("index.hbs").toString();
var index = Handlebars.compile(indexHbs)(json);

fs.writeFile('../api/index.html', index, function(err) {
  if (err) {
    console.log('error', err);
  }
})

// WRITE class files
var classHbs = fs.readFileSync("class.hbs").toString();
var classTpl = Handlebars.compile(classHbs)

_.each(json.classes, function(klass) {
  var data = {
    marionette: json,
    klass: klass
  }
  var classHtml = classTpl(data);

  fs.writeFile('../api/'+klass.name+'.html', classHtml, function(err) {
    if (err) {
      console.log('error', err);
    }
  })
})
