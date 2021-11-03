class UserTimeZoneSerializer < ActiveModel::Serializer
  attributes :id, :name, :city
  attribute :current_time_in_time_zone
  attribute :browser_time_and_time_zone_difference

  def current_time_in_time_zone
    converted_time.strftime("%a %b %d %Y %H:%M:%S %p")
  end

  def browser_time_and_time_zone_difference
    current_utc_time = Time.now.utc
    user_time_zone = instance_options["user_time_zone"]
    begin
      utc_offset = current_utc_time.in_time_zone(object.name).utc_offset
    rescue
      utc_offset = object.utc_difference * 3600
    end
    difference_in_seconds = current_utc_time.in_time_zone(user_time_zone).utc_offset - utc_offset
    difference_in_hours = difference_in_seconds/3600
    difference_in_hours.abs
  end

  def converted_time
    current_utc_time = Time.now.utc
    begin
      current_utc_time.in_time_zone(object.name)
    rescue
      current_utc_time + object.utc_difference.hours
    end
  end

end
