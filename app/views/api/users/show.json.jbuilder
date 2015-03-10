json.partial! "api/users/user", user: @user

if current_user && current_user == @user
  json.current_user true
else
  json.current_user false
end
