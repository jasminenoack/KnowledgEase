class Api::WantAnswersController < ApplicationController
  def index
    @want_answers = WantAnswer.all.includes(:asker, :answerer, :question)

    render json: @want_answers
  end
end
