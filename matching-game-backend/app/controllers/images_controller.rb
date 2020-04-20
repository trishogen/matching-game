class ImagesController < ApplicationController

  def show
    image = Image.find(params[:id])

    render json: ImageSerializer.new(image).to_serialized_json
  end

end
