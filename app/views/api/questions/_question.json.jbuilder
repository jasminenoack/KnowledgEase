json.extract! question, :id, :question, :description

json.author do
  json.partial! "api/users/author", user: question.author
end
