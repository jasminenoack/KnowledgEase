class CreateWantAnswers < ActiveRecord::Migration
  def change
    create_table :want_answers do |t|
      t.integer :asker_id, null: false
      t.integer :answerer_id
      t.integer :question_id, null: false
      t.timestamps
    end
    add_index :want_answers, :asker_id
    add_index :want_answers, :answerer_id
    add_index :want_answers, :question_id
  end
end
