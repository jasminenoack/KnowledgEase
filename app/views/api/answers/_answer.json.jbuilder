json.extract! answer, :id, :body
json.author do
  json.partial! "api/users/author", user: answer.author
end
