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
    @topic = Topic.find(params[:id])
    p @topic
    @questions = @topic.questions.page(params[:page])
  end
end
