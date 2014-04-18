require 'rack'
require 'rack/contrib/try_static'
require 'rack/rewrite'

use Rack::Rewrite do
  r301 '/docs/backbone.marionette.html', '/annotated-src/backbone.marionette'
end

# Serve files from the build directory
use Rack::TryStatic,
  root: 'build',
  urls: %w[/],
  try: ['.html', 'index.html', '/index.html']

run lambda { [404, {"Content-Type" => "text/plain"}, ["File not found!"]] }