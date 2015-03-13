class WantAnswer < ActiveRecord::Base
  validates :asker, :question, presence: true
  validate :asker_cannot_ask_the_same_user

  belongs_to(
    :asker,
    class_name: "User",
    foreign_key: :asker_id,
    inverse_of: :wanted_answers
  )

  belongs_to(
    :answerer,
    class_name: "User",
    foreign_key: :answerer_id,
    inverse_of: :requested_answers
  )

  belongs_to :question, inverse_of: :answer_requests

  def self.requests_hash(current)
    want_answers = WantAnswer.all.includes(:asker, :answerer, :question)
    requests = {
      specific: Hash.new { |hash, key| hash[key] = []},
      total_requests: Hash.new { |hash, key| hash[key] = []}
    }

    want_answers.count

    want_answers.each_with_index do |want_answer, index|
      if current && want_answer.answerer_id == current.id
        requests[:specific][want_answer.question] << want_answer.asker
      end

      if !requests[:total_requests][want_answer.question].include?(want_answer.asker)
        requests[:total_requests][want_answer.question] << want_answer.asker
      end
    end

    return requests
  end

  def self.specific_requests(current_user)
    current_user = User.first
    if current_user
      want_answers = WantAnswer
        .all
        .includes(:asker, :answerer, [question: :author])
        .where(answerer_id: current_user.id)

      specific = Hash.new { |hash, key| hash[key] = []}

      want_answers.each_with_index do |want_answer, index|
        specific[want_answer.question] << want_answer.asker
      end
      specific
    else
      WantAnswer.none
    end
  end

  private
  def asker_cannot_ask_the_same_user
    requests = WantAnswer.where(asker_id: asker_id, question_id: question_id)

    if (!answerer_id && requests.where("answerer_id IS NULL").count > 0) ||
      (requests.where(answerer_id: answerer_id).count > 0)
      errors[:base] << "You cannot reask the same person"
    end

  end

end
