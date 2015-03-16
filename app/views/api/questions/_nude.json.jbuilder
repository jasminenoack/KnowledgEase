json.extract! question, :question, :description, :user_id
json.question_id question.id

json.author do
  json.partial! "api/users/author", user: question.author
end
