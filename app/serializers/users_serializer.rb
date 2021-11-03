class UsersSerializer < ActiveModel::Serializer
  attributes :id, :name, :email
  attribute :admin

  def admin
    object.is_admin?
  end
end
