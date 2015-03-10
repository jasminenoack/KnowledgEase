require 'rails_helper'

RSpec.describe User, type: :model do

  describe 'creates user' do
    it 'saves a user' do
      u = User.new(
        username: "google",
        email: 'google@gmail.com',
        password: "password1",
        password_confirmation: "password1"
      )

      expect(u.save).to be true
    end
  end

  describe 'User validations' do
    it {should validate_presence_of(:username)}
    it {should validate_presence_of(:email)}
    it {should validate_length_of(:password)}

    it 'should ensure a unique email and username' do
      User.create!(
        username: "google",
        email: 'google@gmail.com',
        password: "password1",
        password_confirmation: "password1"
      )

      u = User.new(username: "google", email: 'google@gmail.com')
      u.valid?
      errors = u.errors.full_messages.to_a

      expect(errors[0]).to eq("Email has already been taken")
      expect(errors[1]).to eq("Username has already been taken")
    end

    it 'should validate that password and password confirmation match' do
      u = User.new(
        username: "google",
        email: 'google@gmail.com',
        password: "password1"
      )

      u.password_confirmation = "password"
      u.valid?
      errors = u.errors.full_messages.to_a
      expect(errors[0]).to eq("Password does not match confirmation")
    end

    it 'should validate the presence of a number in the password' do
      u = User.new(
        username: "google",
        email: 'google@gmail.com',
        password: "password",
        password_confirmation: "password"
      )

      u.valid?
      errors = u.errors.full_messages.to_a
      expect(errors[0]).to eq("Password must contain a number")
    end
  end

  describe "user associations" do
    it {should have_many(:sessions)}
  end

  describe "User.find_user" do
     before do
       User.create!(
         username: "google",
         email: 'google@gmail.com',
         password: "password1",
         password_confirmation: "password1"
       )
     end

    it 'finds a user based on credentials' do
      user = User.find_user("google", "password1")
      expect(user).to be_truthy
    end

    it 'does not find a user if given incorrect credentials' do
      user = User.find_user("yahoo", "password1")
      expect(user).to be_nil

      user = User.find_user("google", "password")
      expect(user).to be_nil
    end
  end
end
