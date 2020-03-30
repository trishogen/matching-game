Rails.application.routes.draw do

  post '/login', to: 'sessions#create'

  resources :games, only: [:create]
end
