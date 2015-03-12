class Question < ActiveRecord::Base
  validates :author, :question, presence: true
  validates :question, uniqueness: true

  belongs_to(
    :author,
    class_name: "User",
    foreign_key: :user_id,
    inverse_of: :questions
  )

  has_many(
    :answer_requests,
    class_name: "WantAnswer"
  )

  has_many(
    :answer_requesters,
    through: :answer_requests,
    source: :asker,
    inverse_of: :question_answer_requests
  )

  has_many(
    :users_asked_to_answer,
    through: :answer_requests,
    source: :answerer,
    inverse_of: :questions_requested_to_answer
  )
end
