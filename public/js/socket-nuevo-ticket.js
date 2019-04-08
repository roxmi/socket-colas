//Comando para establecer la conexión

var socket = io();
var label = $("#lblNuevoTicket");

socket.on('connect', function () {
    console.log('Conectando al servidor');

});
//Escuchar sucesos
socket.on('disconnect', function () {
    console.log('Perdimos conexión con el servidor');

});

//on  'estadoActual'

socket.on('estadoActual', function (resp) {
    label.text(resp.actual);
});

$('button').on('click', function () {
    //son para enviar información
    socket.emit('siguienteTicket', null, function (resp) {
        label.text(resp);
        console.log('Respuesta del servidor: ', resp);
    });

    console.log('click');
});