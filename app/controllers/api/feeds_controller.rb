class Api::FeedsController < ApplicationController
  def index
    if logged_in?
      page = params[:page] || 1
      start_item = (page.to_i - 1) * 25
      all_feed = Follow.feed(current_user)
      @feed= all_feed[(start_item)...start_item + 25]
    else
      render json: ["not signed in"], status: 422
    end
  end

  def toggle_follow
    @follow = Follow.where(
      follower_id: current_user.id,
      followable_id: params[:followable_id],
      followable_type: params[:followable_type]
    )

    if @follow.empty?
      @follow = current_user.follows.new(follow_params)
      if @follow.save
        render json: @follow
      else
        render json: @follow.errors.full_messages, status: 422
      end
      
    else
      @follow.destroy_all
      render json: @follow
    end
  end


  private
  def follow_params
    params.permit(:followable_id, :followable_type)
  end

end
