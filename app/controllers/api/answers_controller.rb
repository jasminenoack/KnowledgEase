class Api::AnswersController < ApplicationController
  def create
    @answer = current_user.answers.new(answer_params)
    if @answer.save
      render json: @answer
    else
      render json: @answer.errors.full_messages, status: 422
    end
  end

  private
  def answer_params
    params.require(:answer).permit(:body, :question_id)
  end
end
