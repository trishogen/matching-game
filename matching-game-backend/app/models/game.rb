class Game < ApplicationRecord
  belongs_to :user
  has_many :cards
  has_many :images, through: :cards

  def add_cards_to_game
    images = Image.all

    images.each do |image|
      # need to create 2 cards for each image
      2.times {self.cards.create(game_id: self.id, image_id: image.id)}
    end
  end

end
