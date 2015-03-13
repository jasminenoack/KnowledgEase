users = User.all
questions = Question.all

100.times do
  user = users.sample
  Answer.create(user_id: user.id, question_id: questions.sample.id, body: Faker::Company.catch_phrase)
  Answer.create(user_id: user.id, question_id: questions.sample.id, body: Faker::Company.bs)
  Answer.create(user_id: user.id, question_id: questions.sample.id, body: Faker::Lorem.paragraph)
  Answer.create(user_id: user.id, question_id: questions.sample.id, body: Faker::Lorem.paragraph(2))
  Answer.create(user_id: user.id, question_id: questions.sample.id, body: Faker::Hacker.say_something_smart)
end
