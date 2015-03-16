class Api::FeedsController < ApplicationController
  def index
    @feed = Follow.feed(current_user)

    render json: @feed
  end
end
