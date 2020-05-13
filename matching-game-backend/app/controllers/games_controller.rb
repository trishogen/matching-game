class GamesController < ApplicationController

  def index
    games = Game.all

    render json: GameSerializer.new(games).to_serialized_json
  end

  def create
    user = User.find(params[:user_id])
    game = user.games.new
    game.save
    game.add_cards_to_game()

    render json: GameCardSerializer.new(game).to_serialized_json
  end

  def update
    game = Game.find(params[:id])
    game.update(game_params)

    render json: GameSerializer.new(game).to_serialized_json
  end

  private

  def game_params
    params.require(:game).permit(:id, :completion_time)
  end

end
