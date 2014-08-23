# --------------------------------------------------------- #
# This rake file is borrowed from EmberJS
# https://github.com/emberjs/website/blob/master/Rakefile
# --------------------------------------------------------- #

require "bundler/setup"
require "fileutils"
require 'semantic'
require "json"

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
  generate_marionette_docs

  get_anotated_source

  system "middleman build"

  Dir.chdir "build" do
    system "cp ../config.ru ."
    system "cp ../Procfile ."
  end
end

def generate_marionette_api
  repo_path = marionette_path
  site_path = current_path
  puts "Generating api from #{repo_path}... "

  api = {}
  api['properties'] = {}
  api['functions'] = {}
  api['classes'] = []

  # build the most recent jsdoc
  Dir.chdir(repo_path) do
    system("grunt api")
    my_hash = JSON.parse('{"hello": "goodbye"}')

    filenames = Dir.glob('jsdoc/*.json')
    filenames.each do |filename|
      doc = File.open(filename, "r").read
      api_hash = JSON.parse(doc)

      if api_hash.has_key?("class")
        api['classes'] << api_hash
      else
        api['properties'].merge! api_hash['properties'] unless api_hash['properties'].empty?
        api['functions'].merge! api_hash['functions'] unless api_hash['functions'].empty?
      end
    end
  end

  Dir.chdir("#{site_path}/source/api-assets") do
    File.write("jsDocFile.json", JSON.pretty_generate(api))
    system("node build.js");
  end

end

def generate_marionette_docs
  # output_path = 'api.yml'
  repo_path = marionette_path
  site_path = current_path
  current_tag = ""
  select_box = "<select id=\"version\" class=\"form-control\">"
  tags = Array.new
  print "Generating docs data from #{repo_path}... "

  Dir.chdir(repo_path) do
    system("git checkout master")
    describe = `git describe --tags --abbrev=0 --always`.strip
    current_tag = describe.gsub("\n", "")

    # get list of tags in marionette repo
    describe = `git tag`.strip
    tags = describe.split("\n")

    tags = tags.sort do |tag, tag2|

      if tag == "v1.7"
        tag = "v1.7.0"
      end

      if tag2 == "v1.7"
        tag2 = "v1.7.0"
      end

      if tag == "v1.4.0beta"
        tag = "v1.4.0-beta"
      end

      if tag2 == "v1.4.0beta"
        tag2 = "v1.4.0-beta"
      end

      if tag == "v0.4.1a"
        tag = "v0.4.1-a"
      end

      if tag2 == "v0.4.1a"
        tag2 = "v0.4.1-a"
      end

      tag = tag.gsub('v', '')
      tag2 = tag2.gsub('v', '')
      version1 = Semantic::Version.new tag
      version2 = Semantic::Version.new tag2

      version1 <=> version2
    end

    tags = tags.reverse

    tags.each do |tag|

      tag = tag.gsub("\n", "")
      system("git checkout tags/#{tag}")

      filenames = Dir.glob('docs/*.md')

      if filenames.count > 0
        FileUtils.mkdir_p("#{site_path}/source/docs/#{tag}")

        if tag == current_tag
          select_box += "<option value=\"#{tag}\">#{tag} (current)</option>"
        else
          select_box += "<option value=\"#{tag}\">#{tag}</option>"
        end
      end

      filenames.each do |filename|
        newfilename = File.basename(filename, ".*" )
        FileUtils.cp(filename, "#{site_path}/source/docs/#{tag}/#{newfilename}.md")
      end
    end

    select_box += "</select>"

    # checkout latest tag
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
        text = File.read('sidebar_.html')
        File.write('sidebar_.html', text.gsub('{select_box}', select_box))

      end
    end
  end

  Dir.chdir("#{site_path}/source/docs/current") do

    system("node ../../doc-assets/build.js");
    system("rm *.md");
    text = File.read('sidebar_.html')
    File.write('sidebar_.html', text.gsub('{select_box}', select_box))

  end

  FileUtils.mkdir_p("#{site_path}/backbone.marionette/#{current_tag}")
  system("curl https://raw.githubusercontent.com/marionettejs/backbone.marionette/#{current_tag}/lib/backbone.marionette.js > backbone.marionette/#{current_tag}/backbone.marionette.js")
  system("./node_modules/.bin/docco backbone.marionette/#{current_tag}/backbone.marionette.js -o source/annotated-src/#{current_tag}")
  system("./node_modules/.bin/docco backbone.marionette/#{current_tag}/backbone.marionette.js -o source/annotated-src")
  system("rm -rdf backbone.marionette")
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


task :api do
  generate_marionette_api
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
    system "cp ../Gemfile ."
    system "cp ../Gemfile.lock ."
    git_initialize("marionette-www")
    system "git remote add heroku git@heroku.com:marionette-www.git"
  end

  build

  Dir.chdir "build" do
    system "git add -A"
    system "git commit -m '#{message.gsub("'", "\\'")}'"
    system "git push --force heroku master"
  end

end
