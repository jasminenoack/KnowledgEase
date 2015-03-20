class SessionsController < ApplicationController

  def create
    end
    hash = request.env['omniauth.auth']
    user = User.find_by(provider: hash[:provider], uid: hash[:uid])
    unless user
      user = User.find_by(email: hash[:email])
    end
    unless user
      password = SecureRandom::urlsafe_base64
      user = User.new
      user.username = hash[:nickname]
      user.email =  hash[:email]
      user.password = password
      user.password_confirmation = password
  p "user #{user}"
    end
    user.activated = true
    user.save
    log_in(user)
    redirect_to root_url
  end

end
