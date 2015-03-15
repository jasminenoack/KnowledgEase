class Api::UsersController < ApplicationController
  before_action :require_login, only: :update

  def index
    @users = User.all
  end

  def show
    @user = User
      .where(id: params[:id])
      .includes({questions: :answer_requesters}, {comments: :author}, :known_topics)
      .first
    render :show
  end

  def create
    @user = User.new(user_params)
    if @user.save
      log_in(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def update
    @user = User.find(params[:id])
    if @user.update(user_params)
      log_in(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def remove_knows_about
    @knows_about = KnowsAbout.where(
      user_id: params[:user_id],
      topic_id: params[:topic_id]).first
    @knows_about.destroy
    render json: @knows_about
  end

  def add_knows_about
    @knows_about = KnowsAbout.new(
      user_id: params[:user_id],
      topic_id: params[:topic_id])
    if @knows_about.save
      render json: @knows_about
    else
      render json: @knows_about.errors.full_messages, status: 422
    end
  end

  private
  def require_login
    if current_user.id != params[:id].to_i
      not_found
    end
  end

  def user_params
    params.require(:user).permit(
      :email,
      :first_name,
      :last_name,
      :username,
      :location,
      :biography,
      :password,
      :password_confirmation
    )
  end
end
