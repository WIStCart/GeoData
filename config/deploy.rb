

# config valid for current version and patch releases of Capistrano
lock "~> 3.17"

set :application, 'geodata'
set :repo_url, 'git@github.com:WIStCart/geodata.git'

# Default branch is :master
# ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp
unless ARGV.include?('deploy:rollback')
 avail_tags = `git tag --sort=version:refname`
  set :branch, (ENV['GEODATA_RELEASE'] || ask("release tag or branch:\n #{avail_tags}", avail_tags.chomp.split("\n").last))
end

# Default deploy_to directory is /var/www/my_app_name
# set :deploy_to, "/var/www/my_app_name"
set :deploy_to, "/opt/#{fetch(:application)}"

set :passenger_restart_with_touch, true


# Default value for :format is :airbrussh.
# set :format, :airbrussh

# You can configure the Airbrussh format using :format_options.
# These are the defaults.
# set :format_options, command_output: true, log_file: "log/capistrano.log", color: :auto, truncate: :auto

# Default value for :pty is false
# set :pty, true

# Default value for :linked_files is []
# append :linked_files, "config/database.yml"
append :linked_files, "config/database.yml", "config/secrets.yml", "config/master.key"

# Default value for linked_dirs is []
# append :linked_dirs, "log", "tmp/pids", "tmp/cache", "tmp/sockets", "public/system"
append :linked_dirs, "log", "tmp/pids", "tmp/cache", "tmp/sockets", "storage"

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }
set :default_env, { path: "/opt/ruby/bin:$PATH" }

# /tmp does not allow execution on some systems, including UW CCI
set :tmp_dir, '/opt/tmp'

# Default value for local_user is ENV['USER']
# set :local_user, -> { `git config user.name`.chomp }

# Default value for keep_releases is 5
# set :keep_releases, 5

# Uncomment the following to require manually verifying the host key before first deploy.
# set :ssh_options, verify_host_key: :secure

# Restart Sidekiq after deploy
namespace :deploy do
  desc 'Restart sidekiq'
  task :restart_sidekiq do
    on roles(:app) do
      execute 'sudo systemctl restart sidekiq'
    end
  end
end

after 'deploy:publishing', 'deploy:restart_sidekiq'
