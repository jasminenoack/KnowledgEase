class Follow < ActiveRecord::Base
  validates :followable, :follower, presence: true
  validates :follower, uniqueness: {scope: :followable}

  belongs_to :followable, polymorphic: true
  belongs_to(
    :follower,
    class_name: "User",
    foreign_key: :follower_id,
    inverse_of: :follows
  )
end
