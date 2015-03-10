class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  helper_method :current_user, :logged_in

  def current_session
    if session[:token]
      @session ||= Session.find_by(session_token: session[:token])
    end
  end

  def current_user
    session = current_session
    if session
      @user ||= session.user
    end
  end

  def logged_in
    !!current_user
  end
end
