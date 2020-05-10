module.exports = function (io, app, express, path, userJoin, getCurrentUser, userLeave, getRoomUsers, formatMessage) {
    // const io = socketio(server);

// Set static folder
    app.use('/chat',express.static(path.join(__dirname, 'public')));


    const moment = require('moment');

    function formatMessage(username, text) {
        return {
            username,
            text,
            time: moment().format('h:mm a')
        };
    }

    const botName = 'ChatCord Bot';

    // Run when client connects
    io.on('connection', socket => {
        socket.on('joinRoom', ({ username, room }) => {
            const user = userJoin(socket.id, username, room);

            socket.join(user.room);

            // Welcome current user
            socket.emit('message', formatMessage(botName, 'Welcome to ChatCord!'));

            // Broadcast when a user connects
            socket.broadcast
                .to(user.room)
                .emit(
                    'message',
                    formatMessage(botName, `${user.username} has joined the chat`)
                );

            // Send users and room info
            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room)
            });
        });

        // Listen for chatMessage
        socket.on('chatMessage', msg => {
            const user = getCurrentUser(socket.id);

            io.to(user.room).emit('message', formatMessage(user.username, msg));
        });

        // Runs when client disconnects
        socket.on('disconnect', () => {
            const user = userLeave(socket.id);

            if (user) {
                io.to(user.room).emit(
                    'message',
                    formatMessage(botName, `${user.username} has left the chat`)
                );

                // Send users and room info
                io.to(user.room).emit('roomUsers', {
                    room: user.room,
                    users: getRoomUsers(user.room)
                });
            }
        });
    });
}