class CreateStaticpages < ActiveRecord::Migration
  def change
    create_table :staticpages do |t|
      t.string :photo
      t.string :description
      t.integer :user_id
      t.timestamps null: false
    end
    add_index:staticpages, :user_id
  end
end
