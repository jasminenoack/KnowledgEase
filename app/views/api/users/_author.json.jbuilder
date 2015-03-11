json.extract! user, :name, :location, :id

if current_user && current_user == user
  json.current_user true
else
  json.current_user false
end
