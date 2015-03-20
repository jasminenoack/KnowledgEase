class Api::SessionsController < ApplicationController

  def create
    hash = request.env['omniauth.auth']
    user = User.find_by(provider: hash[:provider], uid: hash[:uid])
    unless user
      user = User.find_by(email: hash[:email])
    end
    unless user
      password = SecureRandom::urlsafe_base64
      user = User.new({
        username: hash[:nickname],
        email: hash[:email]),
        password: password,
        password_confirmation: password
      })
    end
    log_in(user)
    user.activated = true
    user.save
    redirect_to root_url
  end

end
