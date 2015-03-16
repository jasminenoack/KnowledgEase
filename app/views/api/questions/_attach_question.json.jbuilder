json.extract! question, :id, :question, :description, :user_id
json.answer_count question.answers.length

json.author do
  json.current_user current_user
end

if question.users_following.include?(current_user)
  json.followed true
else
  json.followed false
end
