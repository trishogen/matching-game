class User < ApplicationRecord
  has_many :games

  validates :username, presence: true
end
