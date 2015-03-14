users = User.all
questions = Question.all
answers = Answer.all



50.times do
  users.sample.comments.create(body: Faker::Company.catch_phrase, author: users.sample)
  users.sample.comments.create(body: Faker::Company.bs, author: users.sample)
  users.sample.comments.create(body: Faker::Hacker.say_something_smart, author: users.sample)
end


100.times do
  questions.sample.comments.create(body: Faker::Company.catch_phrase, author: users.sample)
  questions.sample.comments.create(body: Faker::Company.bs, author: users.sample)
  questions.sample.comments.create(body: Faker::Hacker.say_something_smart, author: users.sample)
end


300.times do
  answers.sample.comments.create(body: Faker::Company.catch_phrase, author: users.sample)
  answers.sample.comments.create(body: Faker::Company.bs, author: users.sample)
  answers.sample.comments.create(body: Faker::Hacker.say_something_smart, author: users.sample)
end
