class Api::AccountActivationsController < ApplicationController

  def edit
    user = User.find_by(email: params[:email])
    if user.activation_digest == params[:activation]
      flash.now[:message] = "Your account has been authenticated"
      user.activated = true
      user.activated_at = Time.now
      user.save
      log_in(user)
      redirect_to root_url
    else
      flash.now[:message] = "That key is not correct"
      redirect_to root_url
    end
  end

end
