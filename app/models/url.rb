class Url < ApplicationRecord
    # @todo custom (or plugin) validator to validate target_url
    validates :target_url, presence: true

end
