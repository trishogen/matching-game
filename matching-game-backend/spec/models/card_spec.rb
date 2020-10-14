require 'rails_helper'

RSpec.describe Card, :type => :model do
  let(:game) {
    Game.create()
  }

  let(:image) {
    Image.create()
  }

  let(:card) {
    Card.create(
      :game => game,
      :image => image
    )
  }

  it "is valid with a game_id and image_id" do
    expect(card).to be_valid
  end

  it "is not valid without a game or image" do
    expect(Card.new).not_to be_valid
  end

  it "belongs to one game" do
    expect(card.game).to eq(game)
  end

  it "belongs to one image" do
    expect(card.image).to eq(image)
  end

end
