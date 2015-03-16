class Api::TopicsController < ApplicationController

  def create
    @topic = Topic.new(topic_params)
    if @topic.save
      render json: @topic
    else
      render json: @topic.errors.full_messages, status: 422
    end
  end

  def index
    if params[:query] == "all"
      @topics = Topic.all
    else
      @topics = Topic.all.order("title").page(params[:page])
    end
  end

  def update
  end

  def show
    @topic = Topic.where(id: params[:id]).includes(:users_following).first
    @questions = @topic.questions.includes(:author, :users_following).page(params[:page])
  end

  private
  def topic_params
    params.require(:topic).permit(:title, :description)
  end
end
