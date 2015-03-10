# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

u1 = User.create!(
  email: "jasmine@example.com",
  first_name: "jasmine",
  last_name: "noack",
  username: "jasminenoack",
  password: "password1",
  password_confirmation: "password1",
  location: "New York",
  biography: "I am a Website Developer from New York. I have a background in philosophy and psychology. I enjoy programing and talking about the meaning of life"
)

u2 = User.create!(
  email: "bono@example.com",
  first_name: "Paul",
  last_name: "Hewson",
  username: "bono2",
  password: "password1",
  password_confirmation: "password1",
  location: "Ireland",
  biography: "I am an Irish singer-songwriter, musician, venture capitalist, businessman, and philanthropist. I am an expert in music."
)

u3 = User.create!(
  email: "mrFront@example.com",
  first_name: "Damien",
  last_name: "Hess",
  username: "MCFrontalot",
  password: "password1",
  password_confirmation: "password1",
  location: "New York",
  biography: "I am a New York based rapper. I am concerned with StarWars and First World Problems."
)

u4 = User.create!(
  email: "fred@example.com",
  first_name: "Fred",
  last_name: "Nietzsche",
  username: "uberMensch",
  password: "password1",
  password_confirmation: "password1",
  location: "Prussia",
  biography: "I am a German philosopher. I am interested in living every moment like it will return eteranlly."
)

u5 = User.create!(
  email: "paul@example.com",
  first_name: "Jean",
  last_name: "Sartre",
  username: "human",
  password: "password1",
  password_confirmation: "password1",
  location: "France",
  biography: "I am a writer, whose main goal is to bring humanity together under a true humanism. I also would like to bring understanding to the importance of action over intention."
)

u6 = User.create!(
  email: "sennacy@example.com",
  first_name: "sennacy",
  last_name: "theCat",
  username: "Sennacy",
  password: "password1",
  password_confirmation: "password1",
  location: "Dark Places",
  biography: "Meow Hello Meow"
)


u7 = User.create!(
  email: "lydia@example.com",
  first_name: "lydia",
  last_name: "Stepanek",
  username: "lstep",
  password: "password1",
  password_confirmation: "password1",
  location: "New York",
  biography: "I am a Website Developer in New York."
)
