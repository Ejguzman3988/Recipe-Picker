class User < ApplicationRecord
    has_many :saved_recipes
    has_many :recipes, through: :saved_recipes

    validates :username, presence: true, uniqueness: true 
    has_secure_password
end
