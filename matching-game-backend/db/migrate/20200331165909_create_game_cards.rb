class CreateGameCards < ActiveRecord::Migration[6.0]
  def change
    create_table :game_cards do |t|
      t.integer :game_id
      t.integer :card_id
      t.timestamps
    end
  end
end
