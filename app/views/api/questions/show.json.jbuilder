json.partial! "api/questions/question", question: @question
json.partial! "api/questions/answer_requestors", question: @question

json.answers do
  json.array! @question.answers do |answer|
    json.partial! "api/answers/answers_show", answer: answer
  end
end

json.comments do
  json.array! @question.comments do |comment|
    json.partial! "api/comments/comment", comment: comment
  end
end

json.topics do
  json.array! @question.topics do |topic|
    json.partial! "api/topics/topic", topic: topic
  end
end
