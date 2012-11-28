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

task :build do
  build
end

desc "Deploy the website to github pages"
task :deploy => :build do |t, args|
  require "highline/import"
  message = "Deploy marionettejs.com"

  mkdir_p "build"

  Dir.chdir "build" do
    git_initialize("marionettejs.github.com")
    git_update

    build

    # This screws up the build and isn't necessary
    # rm_r "source/examples"

    File.open("CNAME", 'w') do |f|
      f.write "marionettejs.com"
    end

    system "git add -A"
    system "git commit -m '#{message.gsub("'", "\\'")}'"
    system "git push origin master"
  end
end
