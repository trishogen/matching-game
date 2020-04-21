class CreateCards < ActiveRecord::Migration[6.0]
  def change
    create_table :cards do |t|
      t.integer :game_id
      t.integer :image_id
      t.boolean :visible, default: false
      t.boolean :matched, default: false
      t.timestamps
    end
  end
end
