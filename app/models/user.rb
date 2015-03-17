class User < ActiveRecord::Base
  validates :email, :username, presence: true, uniqueness: true
  validates :password, length: { minimum: 6 }, allow_nil: true
  validate :valid_email, :confirm_password_match, :password_contains_number

  include PgSearch
  multisearchable :against => [:first_name, :last_name, :username, :email]


  has_many :sessions, inverse_of: :user
  has_many :questions, inverse_of: :author
  has_many(
    :wanted_answers,
    class_name: "WantAnswer",
    foreign_key: :asker_id,
    inverse_of: :asker
  )

  has_many(
    :requested_answers,
    class_name: "WantAnswer",
    foreign_key: :answerer_id,
    inverse_of: :answerer
  )

  has_many(
    :question_answer_requests,
    through: :wanted_answers,
    source: :question
  )

  has_many(
    :questions_requested_to_answer,
    through: :requested_answers,
    source: :question
  )

  has_many :answers, inverse_of: :author

  has_many :comments, as: :commentable
  has_many(
    :comments_made,
    class_name: "Comment",
    foreign_key: :user_id,
    inverse_of: :author
  )

  has_many :knows_abouts, inverse_of: :user
  has_many :known_topics, through: :knows_abouts, source: :topic

  has_many :follows, foreign_key: :follower_id, inverse_of: :follower

  has_many :followers, class_name: "Follow", as: :followable
  has_many :users_following, through: :followers, source: :follower

  has_many :followed_topics, through: :follows, source: :followable, source_type: "Topic"
  has_many :followed_users, through: :follows, source: :followable, source_type: "User"
  has_many :followed_questions, through: :follows, source: :followable, source_type: "Question"

  def self.find_user(username, password)
    user = User.find_by(username: username)
    if user && user.is_password?(password)
      return user
    end
  end

  def name
    if self.first_name && self.last_name
      "#{first_name.titleize} #{last_name.titleize}"
    else
      self.username
    end
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def password
    @password
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest)
      .is_password?(password)
  end

  def password_confirmation=(confirmation)
    @password_confirmation = confirmation
  end

  def password_confirmation
    @password_confirmation
  end

  def update_search_documents
    questions.each { |question| question.update(question: question.question) }
    answers.each { |answer| answer.update(body: answer.body) }
  end

  private
  def valid_email
    unless self.email =~ /.+@.+\..+/
      errors[:email] << "That email is not valid"
    end
  end

  def confirm_password_match
    return nil unless password
    unless password == password_confirmation
      errors[:password] << "does not match confirmation"
    end
  end

  def password_contains_number
    return nil if password =~ /\d/ || !password
    errors[:password] << "must contain a number"
  end


end
