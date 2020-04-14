class CreateGameCards < ActiveRecord::Migration[6.0]
  def change
    create_table :game_cards do |t|
      t.integer :game_id
      t.integer :card_id
      t.boolean :card_visable, default: false
      t.timestamps
    end
  end
end
