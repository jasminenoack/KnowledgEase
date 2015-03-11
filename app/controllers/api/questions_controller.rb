class Api::QuestionsController < ApplicationController
  def create
    @question = current_user.questions.new(question_params)
    if @question.save
      render :show
    else
      render @question.errors.full_messages
    end
  end

  def update
    @question = Question.find(params[:id])
    if @question.update(question_params)
      render :show
    else
      render @question.errors.full_messages
    end
  end

  def show
    @question = Question.find(params[:id])
  end

  def index
    @questions = Question.all.includes(:author)
  end

  private
  def question_params
    params.require(:question).permit(:question, :description)
  end
end
