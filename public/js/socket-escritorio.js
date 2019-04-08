var socket = io();

var searchParams = new URLSearchParams(window.location.search);

//console.log(searchParams.has('escritorio'));

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}
let label = $('small');
var escritorio = searchParams.get('escritorio');
$("h1").text('Escritorio ' + escritorio);

$('button').on('click', function() {
    socket.emit('atenderTicket', { escritorio: escritorio }, function(res) {
        if (res === "No hay tickets") {
            label.text(res);
            alert(res);
            return;
        }
        label.text('Ticket ' + res.numero);
        console.log(res);
    });
});

//console.log(escritorio);