class MessagesController < ApplicationController
  def index
    room = Room.find(params[:room_id])
    messages = room.messages.limit(20)

    render json: messages, status: :ok
  end

  def create
    room = Room.find(params[:room_id])
    message = room.messages.create(message_params)
    render json: message, status: :created
  end

  private

  def message_params
    params.require(:message).permit(:content, :sender_name)
  end
end
