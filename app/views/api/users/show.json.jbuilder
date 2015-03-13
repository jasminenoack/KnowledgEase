json.partial! "api/users/user", user: @user

if current_user && current_user == @user
  current_user = true
else
  current_user = false
end

json.questions do
  json.array!(@user.questions) do |question|
    json.partial! "api/questions/attach_question",
      question: question,
      current_user: current_user
    json.partial! "api/questions/answer_requestors", question: question    
  end
end
