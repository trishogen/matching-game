class CreateGames < ActiveRecord::Migration[6.0]
  def change
    create_table :games do |t|
      t.user_id :integer
      t.completion_time :integer
      t.timestamps
    end
  end
end
