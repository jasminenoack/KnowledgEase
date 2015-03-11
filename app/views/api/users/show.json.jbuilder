json.partial! "api/users/user", user: @user

json.questions do
  json.array!(@user.questions) do |question|
    json.partial! "api/questions/attach_question", question: question
  end
end
