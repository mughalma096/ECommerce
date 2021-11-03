class Api::V1::UsersController < ActionController::API
  include CanCan::ControllerAdditions
  before_action :find_user, only: [:show, :update, :destroy]
  before_action :authenticate_user!, except: [:index, :create, :show, :destroy]

  def index
    @users = User.all
    render json: @users, each_serializer: UsersSerializer
  end

  def new
    @user = User.new
    render json: @user
  end

  def create
    @user = User.new(users_params)
    if @user.save
      render json: @user, serializer: UsersSerializer, status: :created
    else
      warden.custom_failure!
      raise ActiveRecord::RecordInvalid.new @user
    end
  end

  def show
    render json: @user, serializer: UsersSerializer
  end

  def update
    params[:user] = params[:user].except :password if users_params[:password].blank?
    @user.update(users_params)
    render json: @user, serializer: UsersSerializer
  end

  def destroy
    @user.destroy!
    render json: @user, serializer: UsersSerializer
  end

  private

  def users_params
    params.require(:user).permit(:id, :name, :email, :password)
  end

  def find_user
    @user = User.find_by(id: params[:id])
  end

end
