class Api::QuestionsController < ApplicationController
  def create
    if !current_user
      render json: ["You must be logged in!"], status: 422
      return
    end

    @question = current_user.questions.new(question_params)
    if @question.save
      render :show
    else
      render json: @question.errors.full_messages, status: 422
    end
  end

  def update
    @question = Question.find(params[:id])
    if @question.update(question_params)
      render :show
    else
      render json: @question.errors.full_messages, status: 422
    end
  end

  def show
    @question = Question.find(params[:id])
  end

  def index
    @questions = Question.all.includes(:author).page(params[:page])
    # @questions = Question.page(1)
  end

  private
  def question_params
    params.require(:question).permit(:question, :description)
  end
end
