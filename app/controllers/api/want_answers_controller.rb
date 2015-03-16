class Api::WantAnswersController < ApplicationController

  def show_specific
    current = current_user
    @want_answers = WantAnswer.specific_requests(current)
    render :index
  end

  def show_all
    current = current_user
    @want_answers = WantAnswer.all_requests(params[:page])
    render :index
  end

  def create
    @want_answer = current_user.wanted_answers.new(want_answer_params)

    current_user.follows.find_or_create_by(
      followable_id: params[:question_id],
      followable_type: "Question",
    )

    if @want_answer.save
      render json: ["success"]
    else
      render json: @want_answer.errors.full_messages, status: 422
    end
  end

  private
  def want_answer_params
    params.require(:want_answer).permit(:answerer_id, :question_id)
  end
end
