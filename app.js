let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativa = 1;


function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
/*O código abaixo é um recurso não nativo no JS(Funciona aqui, pois já foi linkado na parte html, linha 7)
tem como função narrar as mensagens de texto especificada no código, mais informações buscar: ResponsiveVoice Text To Speach.*/    
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2});
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do Número Secreto');
    exibirTextoNaTela('p', 'Escolha um Número entre 1 e 10');
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;
    let palavraTentativa = tentativa > 1 ? 'tentativas' : 'tentativa';
    let mensagemTentativas = `Você descobriu o número secreto com ${tentativa} ${palavraTentativa}!`;
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou !');
        exibirTextoNaTela('p', mensagemTentativas);
//Pega um elemento especificado no elemento "Id" e remove o atributo dele(com o .removeAttribute).   
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else if(chute > numeroSecreto) {
        exibirTextoNaTela('p', 'Você errou, o número secreto é menor !'); 
    } else {
        exibirTextoNaTela('p', 'Você errou, o número secreto é maior !');
    }
    limparCampo();
    tentativa++;
    
}

function gerarNumeroAleatorio() {
   let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
   let quantidadeDeElementosNaLista =  listaDeNumerosSorteados.length;
   
   if(quantidadeDeElementosNaLista === numeroLimite) {
        listaDeNumerosSorteados = [];
   }

   if(listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
   } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
   }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    exibirMensagemInicial();
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativa = 1;
//.setAttribute escrito dessa forma irá desabilitar o botão de reinicio do jogo, até um novo acerto.    
    document.getElementById('reiniciar').setAttribute('disabled', true);

}