class SerializableModel
  attr_accessor :attributes

  def initialize(attributes)
    self.attributes = attributes
  end

  def read_attribute_for_serialization(attribute)
    # Try to call method. If it doesn't exist, it'll call method_missing
    # which will return it from our internal attributes.
    send attribute
  end

  def method_missing(method_name, *args)
    attributes[method_name]
  end

  def ==(o)
    o.respond_to?(:attributes) ? attributes == o.attributes : false
  end

  def active_model_serializer
    "#{self.class.name}Serializer".safe_constantize
  end

  def self.model_name
    self.name
  end

  def name
    self.class.name
  end
end
