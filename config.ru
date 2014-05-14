require 'rack'
require 'rack/contrib/try_static'
require 'rack/rewrite'

use Rack::Rewrite do
  r301 '/docs/backbone.marionette.html', '/annotated-src/backbone.marionette'
  rewrite %r{/docs/marionette.(\w+).html}, '/docs/current/marionette.$1.html'
  rewrite %r{/docs/sidebar_.html}, '/docs/current/sidebar_.html'
  rewrite %r{/docs/assets_/(.*)}, '/docs/current/assets_/$1'
end

# Serve files from the build directory
use Rack::TryStatic,
  root: 'build',
  urls: %w[/],
  try: ['.html', 'index.html', '/index.html']

run lambda { [404, {"Content-Type" => "text/plain"}, ["File not found!"]] }
