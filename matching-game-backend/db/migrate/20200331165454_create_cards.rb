class CreateCards < ActiveRecord::Migration[6.0]
  def change
    create_table :cards do |t|
      t.string :name
      t.boolean :is_visable, default: false
      t.timestamps
    end
  end
end
