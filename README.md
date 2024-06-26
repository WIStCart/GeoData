# UW Geodata
Using Blacklight v7.33.1, GBL v3.8, Solr v8.11.2, Ruby 3.2.4, Rails v7.0.6 / Release 3.8.5

### Setup for local development and deployment
```shell
$ bundle install
```

### Capistrano Deployment
Deployment defined in `config/deploy.rb, config/deploy/production.rb` will
deploy the application using the server's `geodeploy` user.

```shell
$ bundle exec cap test|production deploy
```

### Database configuration and secrets
Rails' `config/database.yml, config/secrets.yml, config/master.key` were created
by Ansible and placed on the server in advance.

## Development

#### Run app via these commands in order specified
```bash

# Go to your local project directory
cd <project-root>

# Load the database schema
bundle exec rake db:schema:load

# Run Solr and Rails App server
bundle exec rake geodata:server

# Run Solr and Application Test Suite
RAILS_ENV=test bundle exec rake ci

# Run Sidekiq and Web UI
foreman start
# visit http://localhost:5100/

# Test URI Analysis locally
bundle exec rake geodata:uri_purge
bundle exec rake geodata:uri_process_all

# Sidekiq Web UI will show jobs being processed
```

### MJB Removed/Modified:
-  `solr_wrapper` removed from Rakefile
- `config/environments/development.rb` removed `config.file_watcher`, disabled
  `listen` in the `Gemfile`
