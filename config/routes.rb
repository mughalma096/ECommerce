Rails.application.routes.draw do
  root 'home#index'
  devise_for :users, controllers: { sessions: 'api/v1/sessions' }
  namespace :api do
    namespace :v1 do
      resources :users
      resources :user_time_zone
    end
  end

  match '*path', to: 'application#options', via: :options
  match '*path', to: 'home#index', via: [:get]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
