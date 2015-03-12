class Api::QuestionsController < ApplicationController
  before_action :require_login, only: :update

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
    if params[:user_id]
      @questions = Question
        .where(user_id: params[:user_id])
        .includes(:author)
        .page(params[:page])
    else
      @questions = Question.all.includes(:author).page(params[:page])
    end
  end

  private
  def question_params
    params.require(:question).permit(:question, :description)
  end

  def require_login
    question = Question.find(params[:id])
    if current_user != question.user_id
      not_found
    end
  end
end
