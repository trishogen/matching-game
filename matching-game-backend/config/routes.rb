Rails.application.routes.draw do
  get '/test', to: 'application#test'

  post '/login', to: 'sessions#create'

end
