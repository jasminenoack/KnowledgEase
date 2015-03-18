json.extract! user, :name, :location, :id
json.thumbUrl user.picture.url(:profile)

if current_user && current_user == user
  json.current_user true
else
  json.current_user false
end
