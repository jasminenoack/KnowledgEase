class Api::FeedsController < ApplicationController
  def index
    if logged_in?
      page = params[:page] || 1
      start_item = (page.to_i - 1) * 25
      all_feed = Follow.feed(current_user)
      @feed= all_feed[(start_item)...start_item + 25]
    else
      head :ok
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

  def notification
    if current_user
      all_feed = Follow.feed(current_user)
      if current_user.time_checked
        all_feed = Follow.feed(current_user)
        @feed = all_feed
        .select{ |item| item.time > current_user.time_checked  }
        .sort_by{ |item| item.time }
      p @feed.map(&:time)
      p @feed.length
      else
        @feed = all_feed[0..4]
      end
      @feed.reverse!
      render :index
    else
      head :ok
    end
  end

  def update_checked
    user = current_user
    user.time_checked = Time.parse(params[:time_checked]) + 1.second
    user.save!
    render json: user
  end


  private
  def follow_params
    params.permit(:followable_id, :followable_type)
  end

end
