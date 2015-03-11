class ChangeQuestionsIndex < ActiveRecord::Migration
  def change
    remove_index :questions, :user_id
    add_index :questions, :user_id

  end
end
