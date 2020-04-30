Rails.application.routes.draw do

  post '/login', to: 'sessions#create'

  resources :games, only: [:create, :update] do
    resources :cards, only: [:index]
  end

  resources :cards, only: [:update]
  resources :images, only: [:show]

end
