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
    feed =
      Follow.feed_user_questions(current) +
      Follow.feed_user_answers(current) +
      Follow.feed_topic_questions(current) +
      Follow.feed_topic_answers(current) +
      Follow.feed_questions(current)

    feed.sort_by{ |question| question.time }.reverse
  end

  def self.feed_user_questions(current)
    Question
      .select(
        "questions.*,
        'User' as relation,
        questions.created_at as time"
      )
      .where(user_id: current.follows.where(followable_type: "User").pluck(:followable_id))
      .includes(:author, :answers)
  end

  def self.feed_user_answers(current)
    Answer
      .select(
        "answers.*,
        'UserAnswer' as relation,
        answers.created_at as time"
      )
      .where(user_id: current.follows.where(followable_type: "User").pluck(:followable_id))
      .includes({question: [:answers, :author]}, :author)
  end


  def self.feed_topic_questions(current)
    if current.followed_topics.length > 0
      Question
        .select(
          "questions.*,
          'Topic' as Relation,
          topics.id as Relation_id,
          topics.title as title,
          questions.created_at as time"
        )
        .joins(:topics)
        .includes(:author)
        .where("topics.id IN (#{current.follows.where(followable_type: "Topic").pluck(:followable_id).join(',')})")
    else
      []
    end
  end

  def self.feed_topic_answers(current)
    if current.followed_topics.length > 0
      Answer
        .select(
          "answers.*,
          'TopicAnswer' as Relation,
          topics.id as Relation_id,
          topics.title as title,
          questions.created_at as time"
        )
        .joins(question: :topics)
        .includes(:author, {question: :author})
        .where("topics.id IN (#{current.follows.where(followable_type: "Topic").pluck(:followable_id).join(',')})")
    else
      []
    end
  end

  def self.feed_questions(current)
    Answer
      .select(
        "answers.*,
        'QuestionAnswer' as Relation,
         answers.created_at as time"
      )
      .joins(:question)
      .where(question_id: current.follows.where(followable_type: "Question").pluck(:followable_id))
      .includes(:author, {question: :author})
  end
end
