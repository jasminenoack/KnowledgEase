class AddTimeCheckedToUsers < ActiveRecord::Migration
  def change
    add_column :users, :time_checked, :datetime
  end
end
