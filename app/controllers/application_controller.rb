class ApplicationController < ActionController::Base

  before_action :authenticate_user_from_token!

  before_action do
    headers['Access-Control-Allow-Origin'] = "*"
    headers['Access-Control-Allow-Methods'] = 'GET, OPTIONS'
    headers['Access-Control-Request-Method'] = '*'
    headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  end


  def authenticate_user_from_token!
    user_token = params[:auth_token].presence
    user       = user_token && User.find_by(authentication_token: user_token.to_s)
    if user.present?
      # Notice we are passing store false, so the user is not
      # actually stored in the session and a token is needed
      # for every request. If you want the token to work as a
      # sign in token, you can simply remove store: false.
      sign_in user, store: false
    end
  end

  def options
    render nothing: true, status: 200
  end

end
