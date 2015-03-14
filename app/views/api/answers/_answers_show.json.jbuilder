json.extract! answer, :id, :body
json.author do
  json.partial! "api/users/author", user: answer.author
end

json.comments do
  json.array! answer.comments do |comment|
    json.partial! "api/comments/comment", comment: comment
  end
end
