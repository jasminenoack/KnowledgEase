json.extract! topic, :id, :title

if topic.users_following.include?(current_user)
  json.followed true
else
  json.followed false
end
