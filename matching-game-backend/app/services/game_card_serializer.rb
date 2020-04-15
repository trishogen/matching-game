class GameCardSerializer

  def initialize(game_card_object)
    @game_card = game_card_object
  end

  def to_serialized_json
    options = {
      except: [:updated_at, :created_at],
    }
    @game_card.to_json(options)
  end

end
