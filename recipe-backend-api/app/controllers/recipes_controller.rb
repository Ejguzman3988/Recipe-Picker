class RecipesController < ApplicationController
  before_action :set_recipe, only: [:show, :update, :destroy]

  # GET /recipes
  def index
    @user = User.find(params[:user_id])
    @recipes = @user.recipes

    render json: @recipes
  end

  # GET /recipes/1
  def show
    render json: @recipe
  end

  # POST /recipes
  def create
    @user = User.find(params[:user_id])
    @recipe = Recipe.find_or_initialize_by(recipe_params)
    if (@recipe.id.nil?)
      @user.recipes << @recipe
    end

    if @user.save
      render json: @recipe, status: :created
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /recipes/1
  def update
    if @recipe.update(recipe_params)
      render json: @recipe
    else
      render json: @recipe.errors, status: :unprocessable_entity
    end
  end

  # DELETE /recipes/1
  def destroy
    @recipe.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_recipe
      @user = User.find(params[:user_id])
      @recipe = @user.recipes.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def recipe_params
      params.require(:recipe).permit(:title, :summary, :instructions)
    end
end
