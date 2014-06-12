Marionette.js WWW source
=============

Installation
-----------

This website is built using Middleman (http://middlemanapp.com), Sass, Compass and a few node modules. All the dependencies are automatically installed with the help of Bundler (http://bundler.io/) and npm.

If you don't have `bundler` installed, first do:

     $ gem install bundler

Then, do the following to install dependencies:

     $ bundle
     $ npm install

Updating the site
-----

Make your changes to the site in the source/ folder.

    rake build
    cd build
    rackup config.ru -p 2000

Preview your changes in browser by pointing to http://localhost:2000


Deploying a new version of the marionettejs site.
-----

There is a little bash script that collects and compresses all the files and adds the new version number on the site.

    $ ./build-marionette 1.0.0-beta6
    rake generate_docs && rake deploy
