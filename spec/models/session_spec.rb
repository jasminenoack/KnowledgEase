require 'rails_helper'

RSpec.describe Session, type: :model do
  describe 'User validations' do
    it {should validate_presence_of(:user)}
    it {should validate_presence_of(:session_token)}
  end

  describe "user associations" do
    it {should belong_to(:user)}
  end
end
