Rails.application.routes.draw do
  resources :users
  resources :sessions, only: [:new, :create, :destroy]
  resources :static_pages, only: :index
end
