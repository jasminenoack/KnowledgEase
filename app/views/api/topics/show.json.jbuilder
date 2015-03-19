json.partial! "api/topics/topic", topic: @topic

json.followers do
  json.array! @topic.users_following do |user|
    json.partial! "api/users/user", user: user
  end
end

json.questions do
  json.array!(@questions) do |question|
    json.partial! "api/questions/question", question: question
    json.partial! "api/questions/answer_requestors", question: question
  end
end
