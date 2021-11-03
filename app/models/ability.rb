# frozen_string_literal: true

class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= User.new
    can :manage, User, id: user.id
    can :manage, UserTimeZone, user_id: user.id
    if user.is_admin?
      can :manage, User
      can :manage, UserTimeZone
    end
  end
end
