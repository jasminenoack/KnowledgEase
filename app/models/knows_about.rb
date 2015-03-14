class KnowsAbout < ActiveRecord::Base
  validates :user, :topic, presence: true

  belongs_to :user, inverse_of: :knows_abouts
  belongs_to :topic, inverse_of: :knows_abouts
end
