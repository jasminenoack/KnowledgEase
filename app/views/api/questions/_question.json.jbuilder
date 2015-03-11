json.partial! "api/questions/attach_question", question: question

json.author do
  json.partial! "api/users/author", user: question.author
end
