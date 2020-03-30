class SessionsController < ApplicationController

  def create
    user = User.find_or_create_by(username: params[:username])
    session[:user_id] = user.id

    render json: UserSerializer.new(user).to_serialized_json
  end

end
