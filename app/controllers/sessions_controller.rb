class SessionsController < ApplicationController

  def create
    hash = request.env['omniauth.auth']
    user = User.find_by(provider: hash[:provider], uid: hash[:uid])
    unless user
      user = User.find_by(email: hash[:info][:email])
      user.uid = hash[:uid]
      user.provider = hash[:provider]
    end
    unless user
      password = SecureRandom::urlsafe_base64
      user = User.new
      user.username = hash[:info][:nickname]
      user.email =  hash[:info][:email]
      user.password = password
      user.password_confirmation = password
      user.uid = hash[:uid]
      user.provider = hash[:provider]
    end
    log_in(user)
    user.activated = true
    user.save
    redirect_to root_url
  end

end
