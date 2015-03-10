class Session < ActiveRecord::Base
  validates :user, :session_token, presence: true

  belongs_to :user, inverse_of: :sessions
  after_initialize :generate_token


  def generate_token
    self.session_token = SecureRandom::urlsafe_base64
  end


end
