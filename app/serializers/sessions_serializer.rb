class SessionsSerializer < ActiveModel::Serializer
  attributes :auth_token
  has_one :user, serializer: UsersSerializer

  def auth_token
    object.auth_token || object.user.authentication_token
  end

end
