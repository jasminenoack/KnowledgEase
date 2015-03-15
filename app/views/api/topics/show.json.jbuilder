json.partial! "api/topics/topic", topic: @topic

json.questions do
  json.array!(@questions) do |question|
    json.partial! "api/questions/question", question: question
    json.partial! "api/questions/answer_requestors", question: question
  end
end
