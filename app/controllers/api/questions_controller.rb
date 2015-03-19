class Api::QuestionsController < ApplicationController
  before_action :require_login, only: :update

  def create
    if !current_user
      render json: ["You must be logged in!"], status: 422
      return
    end

    @question = current_user.questions.new(question_params)
    if @question.save
      @question.users_following << current_user
      render :show
    else
      render json: @question.errors.full_messages, status: 422
    end
  end

  def update
    @question = Question.find(params[:id])
    if @question.update(question_params)
      render :show
    else
      render json: @question.errors.full_messages, status: 422
    end
  end

  def show
    @question = Question
      .where(id: params[:id])
      .includes(:users_following, :topics, {answers: [:author, {comments: :author}]}, {comments: :author}).first
  end

  def index
    if params[:user_id]
      @questions = Question
        .where(user_id: params[:user_id])
        .includes(:users_following, :author, :answers)
        .order(id: :desc)
        .page(params[:page])
    else
      @questions = Question
        .all.includes(:author, :answers, :users_following)
        .order(id: :desc)
        .page(params[:page])
    end
  end

  def remove_topic
    @topicing = Topicing.where(
      question_id: params[:question_id],
      topic_id: params[:topic_id]).first
    @topicing.destroy
    @question = Question.find(params[:question_id])
    @question.update(question: @question.question)
    render json: @topicing
  end

  def add_topic
    @question = Question.find(params[:question_id])
    @topic = Topic.find_or_create_by(title: params[:title])
    @question.topics << @topic
    render json: @topic
  end

  private
  def question_params
    params.require(:question).permit(:question, :description, set_topics: [])
  end

  def require_login
    question = Question.find(params[:id])
    if current_user.id != question.user_id
      not_found
    end
  end
end
