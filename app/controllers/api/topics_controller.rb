class Api::TopicsController < ApplicationController

  def create
  end

  def index
    if params[:query] == "all"
      @topics = Topic.all
    else
      @topics = Topic.all.order("title").page(params[:page])
    end
  end

  def show
    @topic = Topic.where(id: params[:id]).includes(:users_following).first
    @questions = @topic.questions.page(params[:page]).includes(:author, :users_following)
  end
end
