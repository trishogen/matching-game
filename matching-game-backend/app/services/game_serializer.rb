class GameSerializer

  def initialize(game_object)
    @game = game_object
  end

  def to_serialized_json
    options = {
      except: [:updated_at, :created_at],
    }
    @game.to_json(options)
  end

end
