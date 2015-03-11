class Api::QuestionsController < ApplicationController
  def create

  end

  def update

  end

  def show
    @question = Question.find(params[:id])
  end

  def index
    @questions = Question.all.includes(:author)
  end
end
