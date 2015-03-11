class Api::QuestionsController < ApplicationController
  def create

  end

  def update

  end

  def show
    @question = Question.find(params[:id])
    render json: @question
  end

  def index
    @questions = Question.all.includes(:author)
    render json: @questions
  end
end
