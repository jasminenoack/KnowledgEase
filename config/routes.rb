Rails.application.routes.draw do
  namespace :api, default: {format: :json} do
    resources :users
    resources :sessions, only: [:new, :create, :destroy]
  end

  root 'static_pages#index'
end
