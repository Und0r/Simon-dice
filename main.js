let contadorMaquina = [];
let contadorUsuario = [];
let ronda = 0;

document.querySelector("#botonIniciar").onclick = comenzarJuego;
actualizarEstado('Toca "Iniciar Juego" para comenzar');
actualizarRonda('-');
bloquearInputUsuario();
   
function comenzarJuego(){
    reiniciarEstado();
    manejarRonda();
}


function reiniciarEstado(){
    contadorMaquina = [];
    contadorUsuario = [];
    ronda = 0; 
}

function manejarRonda(){
    actualizarEstado('Turno de la máquina');
    bloquearInputUsuario();

    const $nuevocuadro = cuadroAleatorio();
    contadorMaquina.push($nuevocuadro);

    const RETRASO_TURNO_JUGADOR = (contadorMaquina.length + 1) * 1000;

    contadorMaquina.forEach(function($cuadro, index){
        const RETRASO_MS = (index + 1) * 1000;
        setTimeout(function(){
            resaltar($cuadro);
        }, RETRASO_MS);
    });

    setTimeout(function(){
        actualizarEstado('Turno del jugador');
        desbloquearInputUsuario();
    }, RETRASO_TURNO_JUGADOR);

    contadorUsuario = [];
    ronda++;
    actualizarRonda(ronda);
}



function manejarRespuestaUsuario(e) {
    const $cuadro = e.target;
    resaltar($cuadro);
    contadorUsuario.push($cuadro);

    const $cuadroMaquina = contadorMaquina[contadorUsuario.length -1];
    if ($cuadro.id !== $cuadroMaquina.id) {
        perder();
        return;
    }

    if (contadorUsuario.length === contadorMaquina.length) {
        bloquearInputUsuario();
        setTimeout(manejarRonda, 1000);
    }
};

function cuadroAleatorio(){
    const $cuadros = document.querySelectorAll('.cuadro');
    const indice = Math.floor(Math.random() * $cuadros.length);
    return $cuadros[indice];
}

function actualizarRonda(ronda){
    document.querySelector("#contadorRonda").textContent = ronda;
}

function actualizarEstado(estado, error = false) {
    const $estado = document.querySelector("#estado");
    $estado.textContent = estado;
    if (error){
        $estado.classList.remove('alert-primary');
        $estado.classList.add('alert-danger');
    } else {
        $estado.classList.remove('alert-danger');
        $estado.classList.add('alert-primary');
    }
}

function resaltar($cuadro) {
    $cuadro.style.opacity = 1;
    setTimeout(function(){
        $cuadro.style.opacity=0.5;
    }, 500);
}


function bloquearInputUsuario(){
    document.querySelectorAll('.cuadro').forEach(function($cuadro) {
        $cuadro.onclick = function(){
        };
    });
}

function desbloquearInputUsuario(){
    document.querySelectorAll('.cuadro').forEach(function($cuadro){
        $cuadro.onclick = manejarRespuestaUsuario;
    });
}

function perder() {
    bloquearInputUsuario();
    reiniciarEstado();
    actualizarEstado('Perdiste! Tocá "Empezar" para jugar de nuevo!', true);
}


