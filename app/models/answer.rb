class Answer < ActiveRecord::Base
  validates :question, :author, :body, presence: true

  include PgSearch
  multisearchable :against => [:body, :name], if: proc{|p| true}

  belongs_to(
    :author,
    class_name: "User",
    foreign_key: :user_id,
    inverse_of: :answers
  )
  delegate :name, :to => :author, :touch => true

  has_many :comments, as: :commentable

  belongs_to :question, inverse_of: :answers

end
