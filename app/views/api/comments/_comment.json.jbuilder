json.extract! comment, :id, :body

json.author do
  json.partial! "api/users/author", user: comment.author
end
