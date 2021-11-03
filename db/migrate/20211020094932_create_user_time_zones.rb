class CreateUserTimeZones < ActiveRecord::Migration[6.1]
  def change
    create_table :user_time_zones do |t|
      t.string :name
      t.string :city
      t.integer :utc_difference
      t.references :user, index: true

      t.timestamps
    end
  end
end
