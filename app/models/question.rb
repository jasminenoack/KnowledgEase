class Question < ActiveRecord::Base
  validates :author, :question, presence: true
  validates :question, uniqueness: true

  belongs_to(
    :author,
    class_name: "User",
    foreign_key: :user_id,
    inverse_of: :questions
  )
end
