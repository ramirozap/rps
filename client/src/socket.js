import openSocket from 'socket.io-client'

const socket = openSocket('http://localhost:8000')

export const updateRooms = cb => {
    socket.on('rooms', cb)
}

export const createRoom = (roomName) => {
    socket.emit('createRoom', roomName)
}

export const joinRoom = roomName => {
    socket.emit('joinRoom', roomName)
}

export const error = cb => {
    socket.on('error_message', cb)
}

export default socket