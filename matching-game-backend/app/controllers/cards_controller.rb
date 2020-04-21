class CardsController < ApplicationController

  def index
    game = Game.find(params[:game_id])
    cards = game.cards

    render json: CardSerializer.new(cards).to_serialized_json
  end

  def update
    card = Card.find(params[:id])
    card.update(card_params)

    render json: CardSerializer.new(card).to_serialized_json
  end

  private

  def card_params
    params.require(:card).permit(:id, :visible, :matched)
  end

end
