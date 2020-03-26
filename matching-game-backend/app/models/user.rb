class User < ApplicationRecord
  has_secure_password

  validates :username, uniqueness: true, presence: true, format: { with:
    /\A[\w\_]+\z/}

  validates :password, confirmation: true
  validates :password, length: { minimum: 8 }


end
