class CreateTopicTables < ActiveRecord::Migration
  def change
    create_table :topics do |t|
      t.string :title, null: false
      t.text :description
      t.timestamps
    end

    create_table :topicings do |t|
      t.integer :question_id, null: false
      t.integer :topic_id, null: false
      t.timestamps
    end

    create_table :knows_abouts do |t|
      t.integer :user_id, null: false
      t.integer :topic_id, null: false
      t.timestamps
    end
  end
end
