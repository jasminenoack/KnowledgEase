class Comment < ActiveRecord::Base
  validates :author, :body, :commentable, presence: true

  belongs_to :commentable, polymorphic: true
  belongs_to(
    :author,
    class_name: "User",
    foreign_key: :user_id,
    inverse_of: :comments_made
  )
  
end
