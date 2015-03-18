json.extract! comment, :id, :body, :updated_at

json.author do
  json.partial! "api/users/author", user: comment.author
end
