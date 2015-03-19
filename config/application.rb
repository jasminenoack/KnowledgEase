require File.expand_path('../boot', __FILE__)

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module KnowledgEase
  class Application < Rails::Application
    config.generators do |g|
      g.test_framework :rspec,
      :fixtures => true,
      :view_specs => false,
      :helper_specs => false,
      :routing_specs => false,
      :controller_specs => true,
      :request_specs => true
    end

    config.action_mailer.raise_delivery_errors = true
    config.action_mailer.delivery_method = :test
    host = 'localhost:3000'
    config.action_mailer.default_url_options = { host: host }


    config.paperclip_defaults = {
      :storage => :s3,
      :s3_credentials =>  {
        :bucket => ENV["S3_BUCKET"],
        :access_key_id => ENV["S3_ACCESS_KEY_ID"],
        :secret_access_key => ENV["S3_SECRET_ACCESS_KEY"]
      }
    }


    PgSearch.multisearch_options = {
      :using => { :tsearch => {:prefix => true, :dictionary => "english"} },
      order_within_rank: "updated_at DESC"
      }

    config.active_record.raise_in_transactional_callbacks = true
  end
end
