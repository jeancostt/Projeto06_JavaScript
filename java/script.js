let seuVotoPara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let descricao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d-2');
let lateral = document.querySelector('.d-1-right');
let numeros = document.querySelector('.d-1-3');

let etapaAtual = 0;
let numero = '';
let votoBranco = true;

function comecarEtapa(){
    let etapa = etapas[etapaAtual];

    let numeroHTML = '';
    numero = '';
    votoBranco = false;

    for (let i=0;i<etapa.numeros;i++) {
        if(i === 0) {
            numeroHTML += '<div class="numero pisca"></div>';
        } else {
            numeroHTML += '<div class="numero"></div>';
        }
}
    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHTML;
}
function atualizaInterface() {
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item)=>{
        if(item.numero === numero) {
            return true;
        } else {
            return false;
        }
    });
    if(candidato.length > 0){
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `Nome : ${candidato.nome}<br>Partido ${candidato.partido}`;

        let fotosHtml = '';
        for(let i in candidato.fotos){
            if(candidato.fotos[i].small) {
            fotosHtml += `<div class="d-1-image small"><img src="img/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`;
            } else {
            fotosHtml += `<div class="d-1-image"><img src="img/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`;
        }
    }
        lateral.innerHTML = fotosHtml;
    } else {
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO NULO</div>';
    }

    console.log("Candidato", candidato);
}

function clicou(n) {
    let elNumero = document.querySelector('.numero.pisca');
    if(elNumero !== null){
        elNumero.innerHTML = n;
        numero = `${numero}${n}`;

        elNumero.classList.remove('pisca');
        if(elNumero.nextElementSibling !== null) {
        elNumero.nextElementSibling.classList.add('pisca');
    } else {
        atualizaInterface();
    }
    }
}
function branco(n) {
    if(numero === ''){
        votoBranco = true;
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        numeros.innerHTML = '';
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO</div>';
    } else {
        alert("Para votar em BRANCO, nenhum dos 5 campos deve estar preenchido, tecle CORRIGE antes de selecionar a opção de voto em BRANCO.")
    }
}
function corrige(n) {
    comecarEtapa();
}
function confirma(n) {
    let etapa = etapas[etapaAtual];

    let votoConfirmado = false;

    if(votoBranco === true){
        votoConfirmado = true;
        console.log("Confirmando voto como BRANCO");
    } else if(numero.length === etapa.numeros) {
        votoConfirmado = true;
        console.log("Confirmando voto como "+numero);

    }
    if(votoConfirmado) {
        etapaAtual++;
        if(etapas[etapaAtual] !== undefined) {
            comecarEtapa();
        } else {
            document.querySelector('.tela').innerHTML = '<div class="aviso--gigante pisca">FIM</div>';
        }
    }
}

comecarEtapa();