Rails.application.routes.draw do
  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :show, :update, :index]
    resources :sessions, only: [:create, :destroy]
    resources :questions, only: [:create, :show, :update, :index]
    resources :want_answers, only: [:index, :create]
    resources :answers, only: :create
    get "want_answers/specific", to: 'want_answers#show_specific'
    get "want_answers/all", to: 'want_answers#show_all'
  end

  root 'static_pages#index'
end
