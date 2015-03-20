class SessionsController < ApplicationController

  def create
    hash = request.env['omniauth.auth']

p hash[:provider]
p hash[:uid]
    user = User.find_by(provider: hash[:provider], uid: hash[:uid])
    unless user
p "email #{hash[:email]}"
p hash[:info]
      user = User.find_by(email: hash[:email])
    end
    unless user
      password = SecureRandom::urlsafe_base64
      user = User.new
      user.username = hash[:nickname]
      user.email =  hash[:email]
      user.password = password
      user.password_confirmation = password
p "email #{hash[:nickname]}"
    end
    log_in(user)
    user.activated = true
    user.save
    redirect_to root_url
  end

end
