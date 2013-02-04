# --------------------------------------------------------- #
# This rake file is borrowed from EmberJS
# https://github.com/emberjs/website/blob/master/Rakefile
# --------------------------------------------------------- #

require "bundler/setup"

def git_initialize(repository)
  unless File.exist?(".git")
    system "git init"
    system "git remote add origin git@github.com:marionettejs/#{repository}.git"
  end
end

def git_update
  system "git fetch origin"
  system "git reset --hard origin/master"
end

def build
  system "middleman build"
end

desc "Build and deploy the website to github pages"
task :deploy => :docco do |t, args|
  require "highline/import"
  message = "Deploy marionettejs.com"

  mkdir_p "build"

  Dir.chdir "build" do
    git_initialize("marionettejs.github.com")
    git_update
  end

  build

  Dir.chdir "build" do
    system "git add -A"
    system "git commit -m '#{message.gsub("'", "\\'")}'"
    system "git push origin master"
  end

end

desc "Build annotated source code"
task :docco do
  `./build-docco`
end
