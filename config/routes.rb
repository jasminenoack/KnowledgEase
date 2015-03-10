Rails.application.routes.draw do
  namespace :api, default: {format: :json} do
    resources :users, only: [:create, :show, :update, :index]
    resources :sessions, only: [:create, :destroy]
  end

  root 'static_pages#index'
end
