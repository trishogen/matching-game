class CardsController < ApplicationController

  def index
    cards = Card.all
    render json: CardSerializer.new(cards).to_serialized_json
  end

end
