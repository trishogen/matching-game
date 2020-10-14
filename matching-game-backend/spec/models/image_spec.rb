require 'rails_helper'

RSpec.describe Image, :type => :model do
  let(:trish) {
    User.create(
      :username => "trish"
    )
  }

  let(:first_game) {
    Game.create(
      :user => trish
    )
  }

  let(:image) {
    Image.create(
      :name => "cat_icon"
    )
  }

  let(:card) {
    Card.create(
      :game => first_game,
      :image => image
    )
  }

  it "is valid with a game_id and image_id" do
    expect(card).to be_valid
  end

  it "is not valid without a game or image" do
    expect(Card.new).not_to be_valid
  end

  it "has many cards" do
    card # create card tied to the image
    expect(image.cards.first).to eq(card)
  end

  it "has many games through cards" do
    card # create card through which game is tied to image
    expect(image.games.first).to eq(first_game)
  end

end
