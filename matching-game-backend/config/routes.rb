Rails.application.routes.draw do
  
  post '/login', to: 'sessions#create'

end
