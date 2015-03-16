class Api::FeedsController < ApplicationController
  def index
    if logged_in?
      @feed = Follow.feed(current_user)

      render json: @feed
    else
      render json: ["not signed in"], status: 422
    end
  end
end
