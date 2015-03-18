json.partial! "api/users/user", user: @user

json.followed_topics do
  json.array! @user.followed_topics do |topic|
    json.partial! "api/topics/topic", topic: topic
  end
end

json.known_topics do
  json.array! @user.known_topics do |topic|
    json.partial! "api/topics/topic", topic: topic
  end
end

json.followers do
  json.array! @user.users_following do |user|
    json.partial! "api/users/user", user: user
  end
end

json.following do
  json.array! @user.followed_users do |user|
    json.partial! "api/users/user", user: user
  end
end

json.comments do
  json.array! @user.comments.sort{ |x, y| y.updated_at <=> x.updated_at} do |comment|
    json.partial! "api/comments/comment", comment: comment
  end
end

json.questions do
  json.array!(@user.questions.sort{ |x, y| y.updated_at <=> x.updated_at}) do |question|
    json.partial! "api/questions/question", question: question
    json.partial! "api/questions/answer_requestors", question: question
  end
end

json.answers do
  json.array!(@user.answers.sort{ |x, y| y.updated_at <=> x.updated_at}) do |answer|
    json.partial! "api/answers/answer", answer: answer
    json.question do
      json.partial! "api/questions/question", question: answer.question
    end
  end
end

json.answer_requests do
  json.array!(@user.followed_questions.sort{ |x, y| y.updated_at <=> x.updated_at}) do |question|
    json.partial! "api/questions/question", question: question
    json.partial! "api/questions/answer_requestors", question: question
  end
end
