class Api::CommentsController < ApplicationController
  def create
    @comment = current_user.comments_made.new(comment_params)
    if @comment.save
      render :show
    else
      render json: @comment.errors.full_messages, status: 422
    end
  end

  private
  def comment_params
    params.require(:comment).permit(:commentable_type, :commentable_id, :body)
  end
end
