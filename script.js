// 10 pares = 20 peças no total
const simbolos = ['🦋', '🌸', '🍓', '💎', '🚀', '🎨', '🐶', '🌈', '🎵', '👑'];
let cartas = [...simbolos, ...simbolos];

let cartasViradas = [];
let bloqueado = false;
let jogadorAtual = 1;
let pontosJ1 = 0;
let pontosJ2 = 0;
let paresEncontrados = 0;

const tabuleiro = document.getElementById('tabuleiro');
const turnoTexto = document.getElementById('turno-texto');
const elPontosJ1 = document.getElementById('pontos-j1');
const elPontosJ2 = document.getElementById('pontos-j2');
const boxJ1 = document.getElementById('box-j1');
const boxJ2 = document.getElementById('box-j2');
const btnReiniciar = document.getElementById('btn-reiniciar');
const mensagemFinal = document.getElementById('mensagem-final');

function embaralhar(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function iniciarJogo() {
    tabuleiro.innerHTML = '';
    mensagemFinal.classList.add('oculto');
    mensagemFinal.textContent = '';
    cartasViradas = [];
    bloqueado = false;
    jogadorAtual = 1;
    pontosJ1 = 0;
    pontosJ2 = 0;
    paresEncontrados = 0;
    atualizarPlacar();

    const cartasEmbaralhadas = embaralhar([...cartas]);

    cartasEmbaralhadas.forEach((simbolo) => {
        const carta = document.createElement('div');
        carta.classList.add('carta');
        carta.dataset.simbolo = simbolo;
        carta.textContent = '?';
        carta.addEventListener('click', virarCarta);
        tabuleiro.appendChild(carta);
    });
}

function virarCarta() {
    if (bloqueado) return;
    if (this.classList.contains('virada') || this.classList.contains('encontrada')) return;

    this.classList.add('virada');
    this.textContent = this.dataset.simbolo;
    cartasViradas.push(this);

    if (cartasViradas.length === 2) {
        verificarPar();
    }
}

function verificarPar() {
    bloqueado = true;
    const [carta1, carta2] = cartasViradas;

    if (carta1.dataset.simbolo === carta2.dataset.simbolo) {
        carta1.classList.add('encontrada');
        carta2.classList.add('encontrada');
        paresEncontrados++;

        if (jogadorAtual === 1) {
            pontosJ1++;
        } else {
            pontosJ2++;
        }

        atualizarPlacar();
        cartasViradas = [];
        bloqueado = false;

        if (paresEncontrados === simbolos.length) {
            finalizarJogo();
        }
    } else {
        setTimeout(() => {
            carta1.classList.remove('virada');
            carta2.classList.remove('virada');
            carta1.textContent = '?';
            carta2.textContent = '?';
            cartasViradas = [];
            trocarJogador();
            bloqueado = false;
        }, 900);
    }
}

function trocarJogador() {
    jogadorAtual = jogadorAtual === 1 ? 2 : 1;
    atualizarPlacar();
}

function atualizarPlacar() {
    elPontosJ1.textContent = pontosJ1;
    elPontosJ2.textContent = pontosJ2;
    turnoTexto.innerHTML = `Vez do: <strong>Jogador ${jogadorAtual}</strong>`;

    if (jogadorAtual === 1) {
        boxJ1.classList.add('ativo');
        boxJ2.classList.remove('ativo');
    } else {
        boxJ2.classList.add('ativo');
        boxJ1.classList.remove('ativo');
    }
}

function finalizarJogo() {
    mensagemFinal.classList.remove('oculto');
    if (pontosJ1 > pontosJ2) {
        mensagemFinal.textContent = `🏆 Fim de jogo! Jogador 1 venceu por ${pontosJ1} a ${pontosJ2}!`;
    } else if (pontosJ2 > pontosJ1) {
        mensagemFinal.textContent = `🏆 Fim de jogo! Jogador 2 venceu por ${pontosJ2} a ${pontosJ1}!`;
    } else {
        mensagemFinal.textContent = `🤝 Fim de jogo! Deu empate (${pontosJ1} a ${pontosJ2})!`;
    }
}

btnReiniciar.addEventListener('click', iniciarJogo);

iniciarJogo();
