class Api::TopicsController < ApplicationController

  def create
  end

  def index
    @topics = Topic.all.order("title").page(params[:page])
  end

  def show
  end
end
