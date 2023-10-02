source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '3.2.0'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 7.0', '>= 7.0.5.1'
# Use sqlite3 as the database for Active Record
gem "sqlite3", "1.6.1"
gem "mysql2", "0.5.5"
# Use Puma as the app server
gem 'puma', '~> 6.3'
# Use SCSS for stylesheets
gem 'sass-rails', '~> 5.0'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'
# See https://github.com/rails/execjs#readme for more supported runtimes
# gem 'mini_racer', platforms: :ruby
# Use CoffeeScript for .coffee assets and views
gem 'coffee-rails', '~> 4.2'
# Turbolinks makes navigating your web application faster. Read more: https://github.com/turbolinks/turbolinks
gem 'turbolinks', '~> 5'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.5'
# Use Redis adapter to run Action Cable in production
# gem 'redis', '~> 4.0'
# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Now required for uri checker as of Ruby 3.x
gem 'net-ftp'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', '>= 1.9.3', require: false

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
  gem 'dotenv-rails'
  gem 'solr_wrapper', '~> 4.0'
end

group :development do
  gem 'listen', '~> 3.0'
  # Access an interactive console on exception pages or by calling 'console' anywhere in the code.
  gem 'web-console', '>= 3.3.0'
  #gem 'listen', '>= 3.0.5', '< 3.2'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  #gem 'spring'
  #gem 'spring-watcher-listen', '~> 2.0.0'
  gem 'foreman'
end

group :test do
  # Adds support for Capybara system testing and selenium driver
  gem 'capybara', '>= 2.15'
  gem 'capybara-screenshot'
  gem 'webdrivers'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]

gem 'blacklight', '~> 7.33.1'
#gem 'blacklight_advanced_search', git: 'https://github.com/projectblacklight/blacklight_advanced_search.git', :branch => 'main'

# BL Advanced Search / Pinned to EWL bug-fix
# See: https://github.com/projectblacklight/blacklight_advanced_search/issues/127
gem "blacklight_advanced_search", git: 'https://github.com/ewlarson/blacklight_advanced_search.git', branch: "bl7-fix-gentle-hands"

gem 'blacklight_range_limit', '~> 7.0.0'
gem 'chosen-rails' #  jquery multiselect plugin for advanced search

gem 'geoblacklight', '3.8.0'
gem 'rsolr', '>= 1.0', '< 3'
gem 'bootstrap', '~> 4.0'
gem 'popper_js'
gem 'twitter-typeahead-rails', '0.11.1.pre.corejavascript'
gem 'jquery-rails'
gem 'devise'
gem 'devise-guests', '~> 0.6'

# Admin view
gem 'haml'
gem 'awesome_print'
gem 'inline_svg', '~> 1.7.0'

# Image migration
gem "geoblacklight_sidecar_images", "~> 0.9.1", "< 1.0"
gem 'carrierwave', '~> 1.2'
gem 'mini_magick', '~> 4.9.4'

gem 'capistrano', '~>3.17'
gem 'capistrano-bundler', '~>2.1'
gem 'capistrano-rails', '~>1.6'
gem 'capistrano-passenger', '~>0.2'

gem 'chronic'
gem 'exception_notification', '~> 4.5.0'

# URI Analysis
gem 'actionmailer', '~> 7.0', '>= 7.0.7.2'
gem 'statesman', '~> 10.2', '>= 10.2.3'
gem 'sidekiq', '~> 7.1', '>= 7.1.5'
gem 'whenever', '~> 1.0'
