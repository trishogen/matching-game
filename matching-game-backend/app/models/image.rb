class Image < ApplicationRecord
  has_many :cards
  has_many :games, through: :cards
end
