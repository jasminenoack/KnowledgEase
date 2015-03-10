class User < ActiveRecord::Base
  validates :email, :username, presence: true
  validates :password, length: { minimum: 6 }, allow_nil: true
  validate :valid_email, :confirm_password_match, :password_contains_number

  has_many :sessions, inverse_of: :user

  def self.find_by_params(username, password)
    user = User.find_by(username: username)
    if user && user.is_password?(password)
      return user
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
