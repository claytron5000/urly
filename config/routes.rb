Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root 'urls#new'
  get 't/:shortened_url', to: 'urls#goto'
  resources :urls, only: [:create]
  # @todo instead of redirecting gets, we can put the @url in a cookie, re-render the root and conditionally load the @url
  get '/urls', to: redirect('/')

end
