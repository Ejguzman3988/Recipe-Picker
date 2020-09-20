class Recipe < ApplicationRecord
    has_many :saved_recipes
    has_many :users, through: :saved_recipes
end
