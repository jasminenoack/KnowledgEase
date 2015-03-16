class Follow < ActiveRecord::Base
  validates :followable, :follower, presence: true

  belongs_to :followable, polymorphic: true
  belongs_to(
    :follower,
    class_name: "User",
    foreign_key: :follower_id,
    inverse_of: :follows
  )


  def self.feed(current)
    follows = Follow
      .where(follower_id: current.id)
      # .includes(followable:
      #   [:author, :answers,
      #   questions: [:author, :answers]
      #   ]
      # )

    follows


    # feed =
    #   Follow.feed_user_questions(current) +
    #   Follow.feed_topic_questions(current) +
    #   Follow.feed_questions(current)
    # feed = feed.sort_by{ |question| question.time }.reverse
    # feed = feed.uniq{ |question| question.id }
  end

  def self.feed_user_questions(current)
    Question
      .select(
        "questions.*,
        'User' as relation,
        questions.created_at as time"
      )
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
      .select(
        "questions.*,
        'Topic' as relation,
        topics.id as relation_id,
        topics.title as relation_name,
        questions.created_at as time"
      )
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
      .select("questions.*, 'Question' as relation, questions.updated_at as time")
      .joins(:followers)
      .where("follows.follower_id = ?", current.id)
  end
end
