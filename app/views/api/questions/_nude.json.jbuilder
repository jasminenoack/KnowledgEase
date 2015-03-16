json.extract! question, :id, :question, :description, :user_id

json.author do
  json.partial! "api/users/author", user: question.author
end
