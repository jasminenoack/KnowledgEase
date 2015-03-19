class Api::SessionsController < ApplicationController

  def new
  end

  def create
    @user = User.find_user(params[:username], params[:password])
    if @user && @user.activated
      log_in(@user)
      render "api/users/show"
    else
      render json: ["Invalid credentials"], status: 422
    end
  end

  def destroy
    @user = current_user
    log_out
    render "api/users/show"
  end
end
