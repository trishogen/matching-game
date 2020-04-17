Rails.application.routes.draw do

  post '/login', to: 'sessions#create'

  resources :games, only: [:create] do
    resources :game_cards, only: [:index]
  end

  resources :cards, only: [:show]

end
