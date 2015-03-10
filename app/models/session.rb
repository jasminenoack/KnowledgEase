class Session < ActiveRecord::Base
  validates :user

  belongs_to :user, inverse_of: :sessions
  after_initialize :generate_token


  def generate_token
    this.session_token = SecureRandom::urlsafe_base64
  end


end
