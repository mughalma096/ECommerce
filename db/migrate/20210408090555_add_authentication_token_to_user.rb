class AddAuthenticationTokenToUser < ActiveRecord::Migration[6.1]
  def change
    change_table(:users) do |t|
      ## Database authenticatable
      t.string :name,               null: false, default: ""
      ## Token authenticatable
      t.string :authentication_token
    end
    add_index :users, :authentication_token, :unique => true
  end
end
