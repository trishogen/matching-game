class Game < ApplicationRecord
  belongs_to :user
  has_many :game_cards
  has_many :cards, through: :game_cards

  def add_cards_to_game
    cards = Card.all

    cards.each do |card|
      self.game_cards.create(game_id: self.id, card_id: card.id)
    end
  end

end
