class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  # protect_from_forgery with: :exception
  helper_method :current_user, :logged_in?, :current_session

  def current_session
    p "session token nnnnnnnnnnnnnnnnnnnnnnaisdfiasdhgkadhskfj;askjgkdsjafljsdkfhdasjkjfk"
    p session[:token]
    p "token: #{@current_session && @current_session.session_token}"
    if session[:token]
      @current_session ||= Session.find_by(session_token: session[:token])
      @current_session
    end
  end

  def current_user
    session = current_session
    if session
      @current_user ||= session.user
    end
    p @current_user && @current_user.name
    @current_user
  end

  def logged_in?
    !!current_user
  end

  def log_in(user)
    return if current_user
    @current_session = user.sessions.new
    @current_user = user
    @current_session.save
    session[:token] = @current_session.session_token
  end

  def log_out
    current_session.destroy
    session[:token] = nil
  end

  def not_found
    raise ActionController::RoutingError.new('Not Found')
  end
end
