class Topicing < ActiveRecord::Base
  validates :question, :topic, presence: true

  belongs_to :question, inverse_of: :topicings
  belongs_to :topic, inverse_of: :topicings

end
