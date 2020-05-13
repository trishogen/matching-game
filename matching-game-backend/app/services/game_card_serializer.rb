class GameCardSerializer

  def initialize(game_object)
    @game = game_object
  end

  def to_serialized_json
    options = {
      :include => {
        :cards => {except: [:updated_at, :created_at]}
        },
      except: [:updated_at, :created_at],
    }
    @game.to_json(options)
  end

end
