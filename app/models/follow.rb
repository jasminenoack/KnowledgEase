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


  def self.feed(current)
    feed =
    Follow.feed_user_questions(current) +
    Follow.feed_topic_questions(current) +
    Follow.feed_questions(current)
  end

  def self.feed_user_questions(current)
    Question
      .select("questions.*, 'User' as relation")
      .joins(:author)
      .joins(<<-SQL
        INNER JOIN
          follows as user_follows
        ON
          user_follows.followable_id = users.id AND
          user_follows.followable_type = 'User'
        SQL
      )
      .where("user_follows.follower_id = ?", current.id)
  end

  def self.feed_topic_questions(current)
    Question
      .select("questions.*, 'Topic' as relation")
      .joins(:topics)
      .joins(<<-SQL
        INNER JOIN
          follows as topic_follows
        ON
          topic_follows.followable_id = topics.id AND
          topic_follows.followable_type = 'Topic'
        SQL
      )
      .where("topic_follows.follower_id = ?", current.id)
  end

  def self.feed_questions(current)
    Question
      .select("questions.*, 'Question' as relation")
      .joins(:followers)
      .where("follows.follower_id = ?", current.id)
  end
end
