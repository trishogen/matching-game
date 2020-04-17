class CardSerializer

  def initialize(card_object)
    @card = card_object
  end

  def to_serialized_json
    options = {
      except: [:updated_at, :created_at],
    }
    @card.to_json(options)
  end

end
