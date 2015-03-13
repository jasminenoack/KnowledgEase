if current_user && current_user == @user
  current_user = true
else
  current_user = false
end


json.array!(@want_answers) do |question, users|
  json.partial! "api/questions/question", question: question
  json.askers do
    json.array!(users) do |user|
      json.extract! user, :name, :id
    end
  end
end
