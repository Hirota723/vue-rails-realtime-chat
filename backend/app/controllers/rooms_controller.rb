class RoomsController < ApplicationController
  def index
    rooms = Room.all
    render json: rooms, status: :ok
  end

  def create
    room = Room.create(room_params)
    render json: room, status: :created
  end

  private

  def room_params
    params.require(:room).permit(:name)
  end
end
