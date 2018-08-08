const io = require('socket.io')()
const PORT = 8000

const roomlist = () => {
    const rooms = []
    Object.keys(io.sockets.adapter.rooms).forEach( room => {
        if (!io.sockets.adapter.rooms[room].sockets.hasOwnProperty(room)){
            rooms.push({
                name: room,
                users: io.sockets.adapter.rooms[room].length
            })
        }
    })
    return rooms
}

io.on('connection', socket => {
    console.log(`client ${socket.id} connected`)
    io.emit('rooms', roomlist())
    socket.on('createRoom', roomName => {
		if (io.sockets.adapter.rooms[roomName]){
			socket.emit('error_message', `Room ${roomName} already exists, pick another name`)
		}else {
			socket.join(roomName)
			io.emit('rooms', roomlist())
		}
	})
	socket.on('joinRoom', roomName => {
		if (io.sockets.adapter.rooms[roomName].length < 2){
			socket.join(roomName)
			io.emit('rooms', roomlist())
		}else {
			socket.emit('error_message', `Room ${roomName} is full`)
		}
	})
    socket.on('disconnect', () => {
        console.log(`client ${socket.id} disconnected`)
        io.emit('rooms', roomlist())
    })
})

io.listen(PORT)
console.log(`listening on port ${PORT}...`)