topics = Topic.all
users = User.all

400.times do
  KnowsAbout.create({
    user_id: users.sample.id,
    topic_id: users.sample.id,
  })
end
