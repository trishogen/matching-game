class ImageSerializer

  def initialize(image_object)
    @image = image_object
  end

  def to_serialized_json
    options = {
      except: [:updated_at, :created_at],
    }
    @image.to_json(options)
  end

end
