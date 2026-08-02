Rails.application.routes.draw do
  get "/api/test", to: "application#test"

  resources :rooms, only: [ :index, :create ]
end
