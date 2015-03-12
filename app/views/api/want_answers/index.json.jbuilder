if current_user && current_user == @user
  current_user = true
else
  current_user = false
end

# question requests to answer
json.specific do
  json.array!(@want_answers[:specific]) do |user, question|
    json.asker do
      json.partial! "api/users/user", user: user
      json.questions do
        json.partial! "api/questions/question", question: question
      end
    end
  end
end

# questions that are requested
json.all_questions do
  json.array!(@want_answers[:total_requests]) do |question, count|
    json.partial! "api/questions/question", question: question
    json.count count
  end
end
