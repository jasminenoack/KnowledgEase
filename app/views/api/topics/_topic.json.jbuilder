json.extract! topic, :id, :title, :description

if topic.users_following.include?(current_user)
  json.followed true
else
  json.followed false
end
