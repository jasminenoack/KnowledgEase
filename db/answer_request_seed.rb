users = User.all
questions = Question.all

150.times do
  WantAnswer.create({
    asker_id: users.sample.id,
    answerer_id: users.sample.id,
    question_id: questions.sample.id
  })
end

250.times do
  WantAnswer.create({
    asker_id: users.sample.id,
    question_id: questions.sample.id
  })
end
