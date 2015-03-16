json.extract! user, :name, :location, :biography, :id, :first_name, :last_name

if user.users_following.include?(current_user)
  json.followed true
else
  json.followed false
end

if current_user && current_user == user
  json.current_user true
else
  json.current_user false
end
