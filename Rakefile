# --------------------------------------------------------- #
# This rake file is borrowed from EmberJS
# https://github.com/emberjs/website/blob/master/Rakefile
# --------------------------------------------------------- #

require "bundler/setup"
require "fileutils"

def git_initialize(repository)
  unless File.exist?(".git")
    system "git init"
    system "git remote add heroku git@heroku.com:#{repository}.git"
  end
end

def marionette_path
  File.expand_path("../../backbone.marionette", __FILE__)
end

def current_path
  File.expand_path(File.dirname(__FILE__))
end

def build
  system "middleman build"

  Dir.chdir "build" do
    system "cp ../config.ru ."
    system "cp ../Procfile ."
  end
end

def generate_marionette_docs
  # output_path = 'api.yml'
  repo_path = marionette_path
  site_path = current_path
  current_tag = ""
  tags = Array.new
  print "Generating docs data from #{repo_path}... "

  Dir.chdir(repo_path) do
    # get list of tags in marionette repo
    describe = `git tag`.strip
    tags = describe.split("\n")

    tags.each do |tag|

      tag = tag.gsub("\n", "")
      system("git checkout tags/#{tag}")

      filenames = Dir.glob('docs/*.md')

      if filenames.count > 0
        FileUtils.mkdir_p("#{site_path}/source/docs/#{tag}")
      end

      filenames.each do |filename|
        newfilename = File.basename(filename, ".*" )
        FileUtils.cp(filename, "#{site_path}/source/docs/#{tag}/#{newfilename}.md")
      end
    end

    # checkout latest tag
    system("git checkout master")
    describe = `git describe --tags --always`.strip
    current_tag = describe.gsub("\n", "")
    system("git checkout tags/#{current_tag}")
    FileUtils.mkdir_p("#{site_path}/source/docs/current")
    filenames = Dir.glob('docs/*.md')
    filenames.each do |filename|
      newfilename = File.basename(filename, ".*" )
      FileUtils.cp(filename, "#{site_path}/source/docs/current/#{newfilename}.md")
    end

  end

  # generate current docs
  tags.each do |tag|

    if File.directory?("#{site_path}/source/docs/#{tag}")
      Dir.chdir("#{site_path}/source/docs/#{tag}") do

        system("node ../../doc-assets/build.js");
        system("rm *.md");

      end
    end
  end

  Dir.chdir("#{site_path}/source/docs/current") do

    system("node ../../doc-assets/build.js");
    system("rm *.md");

  end

  print "Generating annotated src data from #{repo_path}... "
  FileUtils.mkdir_p("#{site_path}/backbone.marionette/#{current_tag}")
  system("curl https://raw.githubusercontent.com/marionettejs/backbone.marionette/#{current_tag}/lib/backbone.marionette.js > backbone.marionette/#{current_tag}/backbone.marionette.js")
  system("./node_modules/.bin/docco backbone.marionette/#{current_tag}/backbone.marionette.js -o source/annotated-src/#{current_tag}/")
  system("./node_modules/.bin/docco backbone.marionette/#{current_tag}/backbone.marionette.js -o source/annotated-src/")
  system("rm -rdf backbone.marionette");
  puts "Built #{repo_path}"
end

def get_anotated_source
  # output_path = 'api.yml'
  repo_path = marionette_path
  site_path = current_path
  current_tag = ""
  tags = Array.new

  Dir.chdir(repo_path) do
    # get list of tags in marionette repo
    describe = `git tag`.strip
    tags = describe.split("\n")

  end

  print "Generating annotated src data from #{repo_path}... "

  tags.each do |tag|

    tag = tag.gsub("\n", "")
    FileUtils.mkdir_p("#{site_path}/backbone.marionette/#{tag}")
    system("curl https://raw.githubusercontent.com/marionettejs/backbone.marionette/#{tag}/lib/backbone.marionette.js > backbone.marionette/#{tag}/backbone.marionette.js")
    system("./node_modules/.bin/docco backbone.marionette/#{tag}/backbone.marionette.js -o source/annotated-src/#{tag}")
  end

  system("rm -rdf backbone.marionette");

end

task :generate_docs do
  generate_marionette_docs
end

task :backfill_anotated_source do
  get_anotated_source
end

task :build do
  build
end

desc "Build and deploy the website to github pages"
task :deploy do
  require "highline/import"
  message = "Deploy marionettejs.com"

  mkdir_p "build"

  Dir.chdir "build" do
    git_initialize("marionette-www")
  end

  build

  Dir.chdir "build" do
    system "git add -A"
    system "git commit -m '#{message.gsub("'", "\\'")}'"
    system "git push --force heroku master"
  end

end
