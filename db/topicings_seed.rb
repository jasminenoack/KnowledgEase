questions = Question.all


Topic.all.each do |topic|
  Topicing.create(topic_id: topic.id, question_id: questions.sample.id)
end


topics = Topic.all
250.times do
  Topicing.create(topic_id: topics.sample.id, question_id: questions.sample.id)
end
