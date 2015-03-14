require 'rails_helper'

RSpec.describe Comment, type: :model do
  describe 'comment validations' do
    it {should validate_presence_of(:author)}
    it {should validate_presence_of(:commentable)}
    it {should validate_presence_of(:body)}
  end


  describe "comment associations" do
    it {should belong_to(:commentable)}
    it {should belong_to(:author)}
  end
end
