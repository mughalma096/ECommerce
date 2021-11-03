class Api::V1::SessionsController < ActionController::API

  def create
    @resource = find_email_password_resource(session_params[:email], session_params[:password])

    return invalid_login_attempt unless @resource

    @resource.ensure_authentication_token!

    sign_in @resource
    response = Session.new user: @resource
    render json: response, status: :created, serializer: SessionsSerializer
  end

  def destroy

    @user = User.find_by(authentication_token: params[:auth_token])
    if @user.present?
      # expire auth token
      @user.authentication_token = nil
      @user.save
    end

    render json: Session.new(user: @user, auth_token: params[:auth_token]), serializer: SessionsSerializer
  end

  def invalid_login_attempt
    warden.custom_failure!
    raise StandardError.new "Invalid email or password"
  end

  private

  def find_email_password_resource(email, password)
    resource = User.find_by(email: email)
    return resource if resource.present? and resource.valid_password?(password)
    nil
  end

  # Never trust parameters from the scary internet, only allow the white list
  def session_params
    params.require(:session).permit(:email, :password)
  end
end
