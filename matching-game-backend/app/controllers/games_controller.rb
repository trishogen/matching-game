class GamesController < ApplicationController

  def create
    user = User.find(params[:user_id])
    game = user.games.new
    game.save
    game.add_cards_to_game()

    render json: GameSerializer.new(game).to_serialized_json
  end

end
