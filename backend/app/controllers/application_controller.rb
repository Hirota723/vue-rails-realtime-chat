class ApplicationController < ActionController::API
  def test
    render json: { message: "This is a test message from Rails" }
  end
end
