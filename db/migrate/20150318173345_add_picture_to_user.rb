class AddPictureToUser < ActiveRecord::Migration
  def self.up
    add_attachment :users, :picture
  end

  def self.down
    remove_attachment :users, :picture
  end
end
