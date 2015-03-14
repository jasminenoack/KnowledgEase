class Api::TopicsController < ApplicationController

  def create
  end

  def index
    @topics = Topic.all.order("title").page(params[:page])
  end

  def show
    @topic = Topic.find(params[:id])
    p @topic
    @questions = @topic.questions.page(params[:page])
  end
end
