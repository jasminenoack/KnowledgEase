json.extract! question, :id, :question, :description, :user_id

json.author do
  json.current_user current_user
end
