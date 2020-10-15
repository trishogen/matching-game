require 'rails_helper'

RSpec.describe Game, :type => :model do
  let(:trish) {
    User.create(
      :username => "trish"
    )
  }

  let(:game) {
    Game.create(
      :user => trish
    )
  }

  let(:cat_image) {
    Image.create(
      :name => "cat_icon"
    )
  }

  let(:dog_image) {
    Image.create(
      :name => "dog_icon"
    )
  }

  let(:card) {
    Card.create(
      :game => game,
      :image => cat_image
    )
  }

  it "is valid with a user_id" do
    expect(game).to be_valid
  end

  it "is not valid without a user" do
    expect(Game.new).not_to be_valid
  end

  it "has many cards" do
    card # create card tied to game
    expect(game.cards.first).to eq(card)
  end

  it "has many images through cards" do
    card # create card, check that image of the card is related to the game
    expect(game.images.first).to eq(cat_image)
  end

  it "has a method 'add_cards_to_game' that uses images to add cards to game" do
    # create images
    cat_image
    dog_image
    game.add_cards_to_game()
    # there should be 2 cards per image, so that each image has a match
    expect(game.cards.count).to eq(4)
  end
end
