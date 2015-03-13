require 'rails_helper'

RSpec.describe Answer, type: :model do
  describe 'answer validations' do
    it {should validate_presence_of(:author)}
    it {should validate_presence_of(:question)}
  end


  describe "answer associations" do
    it {should belong_to(:question)}
    it {should belong_to(:author)}
  end
end
