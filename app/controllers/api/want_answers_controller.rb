class Api::WantAnswersController < ApplicationController
  def index
    current = current_user
    @want_answers = WantAnswer.requests_hash(current)
  end
end
