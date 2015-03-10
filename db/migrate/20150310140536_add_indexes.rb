class AddIndexes < ActiveRecord::Migration
  def change
    add_index :sessions, :user_id
    add_index :sessions, :session_token, unique: true
  end
end
