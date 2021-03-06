require 'rails_helper'

RSpec.describe Topic, type: :model do
  describe 'Topic validations' do
    it {should validate_presence_of(:title)}
  end

  describe "Topic associations" do
    it {should have_many(:questions)}
    it {should have_many(:knowledgable_users)}
    it {should have_many(:followers)}
    it {should have_many(:users_following)}
    
  end
end
