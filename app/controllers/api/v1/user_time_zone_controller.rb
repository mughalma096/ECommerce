class Api::V1::UserTimeZoneController < ActionController::API

  def index
    @user_time_zones = UserTimeZone.where(user_id: params[:user_id])
    render json: @user_time_zones, "user_time_zone" => params[:user_time_zone], each_serializer: UserTimeZoneSerializer
  end

  def create
    @user_time_zone = UserTimeZone.create!(user_time_zone_params)
    render json: @user_time_zone, status: :created, serializer: UserTimeZoneSerializer
  end
  
  def destroy
    @user_time_zone = UserTimeZone.find_by(id: params[:id])
    @user_time_zone.destroy!
    render json: @user_time_zone, serializer: UserTimeZoneSerializer
  end

  private

  def user_time_zone_params
    params.require(:user_time_zone).permit(:id, :name, :city, :utc_difference, :user_id)
  end
end
