const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

let ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.on('siguienteTicket', (data, callback) => {
        let ticket = ticketControl.siguiente();

        console.log(ticket);
        callback(ticket);
    });
    client.emit('estadoActual', {
        actual: ticketControl.getEstadoActual(),
        ultimo4: ticketControl.getUltimos4()
    });

    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'El escriotio es requerido'
            });
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        callback(atenderTicket);
        // actualziar /notificar cambios en los ULTIMOS 4

        client.broadcast.emit('ultimo4', {
            ultimo4: ticketControl.getUltimos4()
        })

    });

});