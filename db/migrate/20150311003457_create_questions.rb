class CreateQuestions < ActiveRecord::Migration
  def change
    create_table :questions do |t|
      t.integer :user_id, null: false
      t.string :question, null: false
      t.text :description
      t.timestamps null: false
    end
    add_index :questions, :user_id, unique: true
    add_index :questions, :question, unique: true

  end
end
