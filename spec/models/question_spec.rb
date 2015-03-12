require 'rails_helper'

RSpec.describe Question, type: :model do
  describe 'question validations' do
    it {should validate_presence_of(:author)}
    it {should validate_presence_of(:question)}
  end


  describe "question associations" do
    it {should belong_to(:author)}
    it {should have_many(:answer_requests)}
    it {should have_many(:answer_requesters)}
    it {should have_many(:users_asked_to_answer)}
  end
end
