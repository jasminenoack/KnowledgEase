class SessionsController < ApplicationController

  def new
  end

  def create
    @user = User.find_user(params[:username], params[:password])
    if @user
      log_in(@user)
      redirect_to static_pages_url
    else
      render :new
    end
  end

  def destroy
    log_out
    redirect_to new_session_url
  end
end
