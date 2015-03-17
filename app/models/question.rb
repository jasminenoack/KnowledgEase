class Question < ActiveRecord::Base

  validates :author, :question, presence: true
  validates :question, uniqueness: true

  include PgSearch
  multisearchable :against => [:question, :description, :name, :titles], if: proc{|p| true}

  belongs_to(
    :author,
    class_name: "User",
    foreign_key: :user_id,
    inverse_of: :questions
  )
  delegate :name, :to => :author, :touch => true

  has_many(
    :answer_requests,
    class_name: "WantAnswer"
  )

  has_many(
    :answer_requesters,
    through: :answer_requests,
    source: :asker
  )

  has_many(
    :users_asked_to_answer,
    through: :answer_requests,
    source: :answerer
  )

  has_many :answers, inverse_of: :question

  has_many :comments, as: :commentable
  has_many :topicings, inverse_of: :question
  has_many :topics, through: :topicings

  has_many :followers, class_name: "Follow", as: :followable
  has_many :users_following, through: :followers, source: :follower

  def titles
    topics.map(&:title).join(" ")
  end

  def set_topics=(topics)
    topics.each do |topic_title|
      topic = Topic.find_by(title: topic_title)
      if topic
        self.topics << topic
      else
        self.topics.new(title: topic_title)
      end
    end
    self.save
  end

end
