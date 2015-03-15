Rails.application.routes.draw do
  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :show, :update, :index]
    resources :sessions, only: [:create, :destroy]
    resources :questions, only: [:create, :show, :update, :index]
    resources :want_answers, only: [:index, :create]
    resources :answers, only: :create
    resources :comments, only: :create
    resources :topics, only: [:create, :index, :show]
    delete "users/remove_knows_about", to: "users#remove_knows_about"
    post "users/add_knows_about", to: "users#add_knows_about"
    get "want_answers/specific", to: 'want_answers#show_specific'
    get "want_answers/all", to: 'want_answers#show_all'
    delete "questions/remove_topic", to: "questions#remove_topic"
    post "questions/add_topic", to: "questions#add_topic"
  end

  root 'static_pages#index'
end
