module.exports = function(io, app, express, path){


    app.use('/videoChat', express.static(__dirname + "/publicVideoChat"))
    let clients = 0
    io.on('connection', function (socket) {
        socket.on("NewClient", function () {
            if (clients < 2) {
                if (clients == 1) {
                    this.emit('CreatePeer')
                }
            }
            else
                this.emit('SessionActive')
            clients++;
        })
        socket.on('Offer', SendOffer)
        socket.on('Answer', SendAnswer)
        socket.on('disconnect', Disconnect)
    })

    function Disconnect() {
        if (clients > 0) {
            if (clients <= 2)
                this.broadcast.emit("Disconnect")
            clients--
        }
    }

    function SendOffer(offer) {
        this.broadcast.emit("BackOffer", offer)
    }

    function SendAnswer(data) {
        this.broadcast.emit("BackAnswer", data)
    }
}
