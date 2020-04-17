class CardsController < ApplicationController

  def show
    card = Card.find(params[:id])

    render json: CardSerializer.new(card).to_serialized_json
  end

end
