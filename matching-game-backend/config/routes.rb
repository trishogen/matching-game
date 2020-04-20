Rails.application.routes.draw do

  post '/login', to: 'sessions#create'

  resources :games, only: [:create] do
    resources :cards, only: [:index]
  end

  resources :images, only: [:show]

end
