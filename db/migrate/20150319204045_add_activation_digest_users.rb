class AddActivationDigestUsers < ActiveRecord::Migration
  def change
    add_column :users, :activation_digest, :string
    add_column :users, :activated, :boolean
    add_column :users, :activated_at, :datetime

    User.all.each{|user| user.update(activated: true, activated_at: Time.now)}
  end
end
