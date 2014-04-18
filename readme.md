Editing the homepage for Marionette.js
=============


Installation
-----------

This website is built using Middleman (http://middlemanapp.com), Sass and Compass.  All the dependencies are automatically installed with the help of Bundler.

    git clone the repository
    cd cloned repository
    bundle
    npm install -g docco

Update the site
-----

Make your changes to the site in the source/ folder.

    middleman server

Preview your changes in browser by pointing to http://localhost:4567


Populate a new version of Marionette.js builds
-----

There is a little bash script that collects and compresses all the files and adds the new version number on the site.

    ./build-marionette 1.0.0-beta6


Push your changes to Heroku
-----

    Login to heroku CLI Tools
    `git push heroku {branchName}:master`

