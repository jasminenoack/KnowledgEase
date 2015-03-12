class WantAnswer < ActiveRecord::Base
  validates :asker, :question, presence: true
  validates :asker, :answerer, uniqueness: {scope: :question} 

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

end
