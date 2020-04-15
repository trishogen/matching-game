class GameCardsController < ApplicationController

  def index
    game = Game.find(params[:game_id])
    game_cards = game.game_cards

    render json: GameCardSerializer.new(game_cards).to_serialized_json
  end

end
