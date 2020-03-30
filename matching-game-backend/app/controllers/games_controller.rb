class GamesController < ApplicationController

  def create
    game = current_user.games.new
    game.save

    render json: GameSerializer.new(game).to_serialized_json
  end

end
