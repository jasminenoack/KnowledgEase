class Api::FeedsController < ApplicationController
  def index
    if logged_in?
      page = params[:page] || 1
      start_item = (page - 1) * 25
      all_feed = Follow.feed(current_user)
      @feed= all_feed[(start_item)...start_item + 25]
    else
      render json: ["not signed in"], status: 422
    end
  end
end
