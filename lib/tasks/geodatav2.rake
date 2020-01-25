desc 'Run test suite'
task :ci do
  require 'solr_wrapper'

  shared_solr_opts = { managed: true, verbose: true, persist: false, download_dir: 'tmp' }
  shared_solr_opts[:version] = ENV['SOLR_VERSION'] if ENV['SOLR_VERSION']

  SolrWrapper.wrap(shared_solr_opts.merge(port: 8985, instance_dir: 'tmp/geodata-core-test')) do |solr|
    solr.with_collection(name: "geodata-core-test", dir: Rails.root.join("solr", "conf").to_s) do
      system 'RAILS_ENV=test bundle exec rake geoblacklight:index:seed'
      system 'RAILS_ENV=test bundle exec rails test:system test TESTOPTS="-v"' || success = false
    end
  end
end

namespace :geodata do

  desc 'Run Solr and GeoBlacklight for interactive development'
  task :server, [:rails_server_args] do |_t, args|
    require 'solr_wrapper'

    shared_solr_opts = { managed: true, verbose: true, persist: false, download_dir: 'tmp' }
    shared_solr_opts[:version] = ENV['SOLR_VERSION'] if ENV['SOLR_VERSION']

    SolrWrapper.wrap(shared_solr_opts.merge(port: 8983, instance_dir: 'tmp/geodata-core')) do |solr|
      solr.with_collection(name: "geodata-core", dir: Rails.root.join("solr", "conf").to_s) do
        puts "Solr running at http://localhost:8983/solr/#/geodata-core, ^C to exit"
        puts ' '
        begin
          Rake::Task['geoblacklight:solr:seed'].invoke
          system "bundle exec rails s -b 0.0.0.0"
          sleep
        rescue Interrupt
          puts "\nShutting down..."
        end
      end
    end
  end

  desc "Start solr server for testing."
  task :test do
    require 'solr_wrapper'
    
    if Rails.env.test?
      shared_solr_opts = { managed: true, verbose: true, persist: false, download_dir: 'tmp' }
      shared_solr_opts[:version] = ENV['SOLR_VERSION'] if ENV['SOLR_VERSION']

      SolrWrapper.wrap(shared_solr_opts.merge(port: 8985, instance_dir: 'tmp/geodata-core-test')) do |solr|
        solr.with_collection(name: "geodata-core-test", dir: Rails.root.join("solr", "conf").to_s) do
          puts "Solr running at http://localhost:8985/solr/#/geodata-core-test, ^C to exit"
          begin
            Rake::Task['geoblacklight:solr:seed'].invoke
            sleep
          rescue Interrupt
            puts "\nShutting down..."
          end
        end
      end
    else
      system('rake geodata:test RAILS_ENV=test')
    end
  end

  desc "Start solr server for development."
  task :development do
    require 'solr_wrapper'

    shared_solr_opts = { managed: true, verbose: true, persist: false, download_dir: 'tmp' }
    shared_solr_opts[:version] = ENV['SOLR_VERSION'] if ENV['SOLR_VERSION']

    SolrWrapper.wrap(shared_solr_opts.merge(port: 8983, instance_dir: 'tmp/geodata-core')) do |solr|
      solr.with_collection(name: "geodata-core", dir: Rails.root.join("solr", "conf").to_s) do
        puts "Solr running at http://localhost:8983/solr/#/geodata-core, ^C to exit"
        begin
          Rake::Task['geoblacklight:solr:seed'].invoke
          sleep
        rescue Interrupt
          puts "\nShutting down..."
        end
      end
    end
  end

end
