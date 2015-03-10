class Sessions < ActiveRecord::Migration
  def change
    create_table :sessions do |t|
    t.string :session_token, null: false
    t.integer :user_id, null: false
    t.string :location
    t.string :browser
    t.timestamps null: false
  end
  end
end
