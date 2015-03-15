questions = Question.all
topics = Topic.all
users = User.all

400.times do
  questions.sample.followers.create(follower_id: users.sample.id)
end


100.times do
  users.sample.followers.create(follower_id: users.sample.id)
end

400.times do
  topics.sample.followers.create(follower_id: users.sample.id)
end
