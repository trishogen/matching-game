class GamesController < ApplicationController

  def create
    user = User.find(params[:user_id])
    game = user.games.new
    game.save

    render json: GameSerializer.new(game).to_serialized_json
  end

end
