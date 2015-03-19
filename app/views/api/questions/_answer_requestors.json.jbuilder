json.askers do
  json.array!(question.users_following) do |asker|
    p asker
    json.extract! asker, :name, :id
  end
end
