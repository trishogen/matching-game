class CardsController < ApplicationController

  def index
    game = Game.find(params[:game_id])
    cards = game.cards

    render json: CardSerializer.new(cards).to_serialized_json
  end

end
