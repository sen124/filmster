class Review < ActiveRecord::Base
  has_many :reviews
  belongs_to :user
  
  validates  :user, :movie, :comment, presence: true
end
