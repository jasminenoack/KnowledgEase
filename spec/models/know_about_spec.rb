require 'rails_helper'

RSpec.describe KnowsAbout, type: :model do
  describe 'KnowsAbout validations' do
    it {should validate_presence_of(:user)}
    it {should validate_presence_of(:topic)}
  end

  describe "KnowsAbout associations" do
    it {should belong_to(:user)}
    it {should belong_to(:topic)}
  end
end
