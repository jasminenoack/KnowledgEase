json.askers do
  json.array!(question.answer_requesters) do |asker|
    p asker
    json.extract! asker, :name, :id
  end
end
