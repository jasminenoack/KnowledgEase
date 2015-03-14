require 'rails_helper'

RSpec.describe Topicing, type: :model do
  describe 'Topicing validations' do
    it {should validate_presence_of(:question)}
    it {should validate_presence_of(:topic)}
  end

  describe "Topicing associations" do
    it {should belong_to(:topic)}
    it {should belong_to(:question)}
  end
end
