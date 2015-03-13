json.extract! question, :id, :question, :description, :user_id
json.answer_count question.answers.length

json.author do
  json.current_user current_user
end
