class CreateAnswers < ActiveRecord::Migration
  def change
    create_table :answers do |t|
      t.integer :question_id, null: false
      t.integer :user_id, null: false
      t.text :body, null: false
      t.timestamps null: false
    end
    add_index :answers, :question_id
    add_index :answers, :user_id
  end
end
