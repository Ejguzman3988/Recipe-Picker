# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


(1..5).to_a.each do |num|
    Recipe.create(title: "Recipe Title: #{num}", summary: "This is a long summary about recipe number #{num}", instructions: "These are instructions: 1. Put together ingredients,, 2. Cook. Recipe: #{num}!")
end
