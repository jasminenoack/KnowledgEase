class Answer < ActiveRecord::Base
  validates :question, :author, :body, presence: true

  belongs_to(
    :author,
    class_name: "User",
    foreign_key: :user_id,
    inverse_of: :answers
  )

  has_many :comments, as: :commentable

  belongs_to :question, inverse_of: :answers
end
