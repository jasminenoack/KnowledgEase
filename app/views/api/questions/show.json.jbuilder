json.partial! "api/questions/question", question: @question
json.partial! "api/questions/answer_requestors", question: @question

json.answers do
  json.array! @question.answers do |answer|
    json.partial! "api/answers/answer", answer: answer
  end
end
