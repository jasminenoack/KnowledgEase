require 'rails_helper'

RSpec.describe Follow, type: :model do
  describe 'Follow validations' do
    it {should validate_presence_of(:follower)}
    it {should validate_presence_of(:followable)}
  end

  describe "follow associations" do
    it {should belong_to(:followable)}
    it {should belong_to(:follower)}
  end
end
