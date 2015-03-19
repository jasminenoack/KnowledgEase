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
      @topics = Topic.all.includes(:users_following)
    elsif params[:query] == "cloud"
      render json: Topic.word_cloud_array
    else
      @topics = Topic.all.order("title").page(params[:page])
    end
  end

  def update
    @topic = Topic.find(params[:id])
    if @topic.update(topic_params)
      @topic.update_search_documents
      render json: @topic
    else
      render json: @topic.errors.full_messages, status: 422
    end
  end

  def show
    @topic = Topic.where(id: params[:id]).includes(:users_following, :knowledgable_users).first
    @questions = @topic.questions.includes(:author, :users_following).page(params[:page])
  end

  private
  def topic_params
    params.require(:topic).permit(:title, :description)
  end
end
