class Api::AccountActivationsController < ApplicationController

  def edit
    user = User.find_by(email: params[:email])
    if user.activation_digest == params[:activation]
      flash[:message] = "Your account has been authenticated"
      user.activated = true
      user.activated_at = Time.now
      log_in(user)
      redirect_to root_url
    else
      flash[:message] = "That key is not correct"
      redirect_to root_url
    end
  end

end
