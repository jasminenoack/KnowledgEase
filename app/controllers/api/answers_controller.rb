class Api::AnswersController < ApplicationController
  def create
    @answer = current_user.answers.new(answer_params)
    if @answer.save
      @question = Question.find(params[:question_id])
      @question.users_following << current_user
      render :show
    else
      render json: @answer.errors.full_messages, status: 422
    end
  end

  private
  def answer_params
    params.require(:answer).permit(:body, :question_id)
  end
end
