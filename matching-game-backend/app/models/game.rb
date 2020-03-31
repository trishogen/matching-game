class Game < ApplicationRecord
  belongs_to :user
  has_many :game_cards
  has_many :cards, through: :game_cards
end
