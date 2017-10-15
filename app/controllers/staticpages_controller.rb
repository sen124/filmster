class StaticpagesController < ApplicationController
  def index
    flash[:success] = "your page has been successfully updated!"
  
  end
  

end
