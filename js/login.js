const letras = [
    "A", "B", "C", "D", "E", "F",
    "G", "H", "I", "J", "K", "L",
    "M", "N", "O", "P", "Q", "R",
    "S", "T", "U", "V", "W", "X",
    "Y", "Z"
];

const numeros = [
    "0", "1", "2", "3", "4",
    "5", "6", "7", "8", "9"
];

// Elementos dos anéis
const anelExterno = document.getElementById("anelExterno");
const anelMeio = document.getElementById("anelMeio");
const anelInterno = document.getElementById("anelInterno");

// Cada anel agora tem seu próprio conjunto de teclas e seu próprio raio
// (raio como fração de 0 a 1 do próprio tamanho do anel, não em pixels fixos)
const aneis = [
    { elemento: anelExterno, itens: letras.slice(0, 13), raioFactor: 0.80 }, // 13 letras: A-M
    { elemento: anelMeio,    itens: letras.slice(13, 26), raioFactor: 0.72 }, // 13 letras: N-Z
    { elemento: anelInterno, itens: numeros,               raioFactor: 0.55 }, // 10 números
];

// Botões laterais (satélites), na ordem em que aparecem no HTML/tela
const satelites = [
    document.getElementById("limpar"),
    document.getElementById("excluir"),
    document.getElementById("falar"),
    document.getElementById("concluir"),
];

// ==============================
// NAVEGAÇÃO (anéis + satélites)
// ==============================
//
// Tratamos a navegação como uma lista de "grupos": os 3 anéis do teclado
// e, por último, os satélites. Isso permite que ↑/↓ também "saiam" do
// teclado para os botões laterais e voltem, usando a mesma lógica.

const quantidadePorAnel = aneis.map((anel) => anel.itens.length);
const quantidadePorGrupo = [...quantidadePorAnel, satelites.length];

// Índice inicial de cada grupo dentro da lista "achatada" de todos os elementos focáveis
const inicioDoGrupo = quantidadePorGrupo.reduce((acc, qtd, i) => {
    acc.push(i === 0 ? 0 : acc[i - 1] + quantidadePorGrupo[i - 1]);
    return acc;
}, []);

const totalDeGrupos = quantidadePorGrupo.length; // 3 anéis + 1 grupo de satélites
const grupoExterno = 0;
const grupoSatelites = totalDeGrupos - 1;
const totalDeAneis = totalDeGrupos - 1; // só os 3 anéis, sem contar os satélites

function moverFoco(evento, indiceGlobalAtual) {
    const elementosFocaveis = [...document.querySelectorAll(".tecla, .satelite")];

    // Descobre em qual grupo (anel ou satélites) e em qual posição dentro
    // dele o elemento atual está
    let grupoAtual = 0;
    for (let i = totalDeGrupos - 1; i >= 0; i--) {
        if (indiceGlobalAtual >= inicioDoGrupo[i]) {
            grupoAtual = i;
            break;
        }
    }
    const posicaoAtual = indiceGlobalAtual - inicioDoGrupo[grupoAtual];
    const qtdNoGrupoAtual = quantidadePorGrupo[grupoAtual];
    const estaNosSatelites = grupoAtual === grupoSatelites;

    // Move a posição proporcionalmente para outro grupo de tamanho diferente
    // (ex.: de um anel de 13 teclas para os 4 satélites)
    function posicaoEquivalenteEm(grupoDestino) {
        const qtdDestino = quantidadePorGrupo[grupoDestino];
        return Math.round((posicaoAtual / qtdNoGrupoAtual) * qtdDestino) % qtdDestino;
    }

    let proximoIndice;

    switch (evento.key) {
        case "ArrowLeft":
            if (estaNosSatelites) {
                // Sai do menu lateral e volta pro teclado, na argola externa
                proximoIndice = inicioDoGrupo[grupoExterno] + posicaoEquivalenteEm(grupoExterno);
            } else {
                proximoIndice = inicioDoGrupo[grupoAtual] +
                    (posicaoAtual + qtdNoGrupoAtual - 1) % qtdNoGrupoAtual;
            }
            break;

        case "ArrowRight":
            if (estaNosSatelites) {
                // Já está no limite direito: não há pra onde ir
                return;
            }
            proximoIndice = inicioDoGrupo[grupoAtual] +
                (posicaoAtual + 1) % qtdNoGrupoAtual;
            break;

        case "ArrowDown":
            if (estaNosSatelites) {
                // Dentro do menu lateral, desce para o próximo botão
                proximoIndice = inicioDoGrupo[grupoAtual] +
                    (posicaoAtual + 1) % qtdNoGrupoAtual;
            } else if (grupoAtual === grupoExterno) {
                // Da argola externa, desce direto para o menu lateral
                proximoIndice = inicioDoGrupo[grupoSatelites] + posicaoEquivalenteEm(grupoSatelites);
            } else {
                // Ciclo normal entre os anéis: meio -> interna -> externa
                const proximoAnel = (grupoAtual + 1) % totalDeAneis;
                proximoIndice = inicioDoGrupo[proximoAnel] + posicaoEquivalenteEm(proximoAnel);
            }
            break;

        case "ArrowUp":
            if (estaNosSatelites) {
                // Dentro do menu lateral, sobe para o botão anterior
                proximoIndice = inicioDoGrupo[grupoAtual] +
                    (posicaoAtual + qtdNoGrupoAtual - 1) % qtdNoGrupoAtual;
            } else {
                // Ciclo normal entre os anéis: externa -> meio -> interna -> externa
                const proximoAnel = (grupoAtual + 1) % totalDeAneis;
                proximoIndice = inicioDoGrupo[proximoAnel] + posicaoEquivalenteEm(proximoAnel);
            }
            break;

        default:
            return;
    }

    evento.preventDefault();
    elementosFocaveis.forEach((el) => (el.tabIndex = -1));
    elementosFocaveis[proximoIndice].tabIndex = 0;
    elementosFocaveis[proximoIndice].focus();
}

// ==============================
// EFEITO DE CUNHA (fatia ativa)
// ==============================

// Cria a "cunha" (fatia) que vai indicar visualmente a tecla ativa dentro de cada anel
aneis.forEach((anel) => {
    const wedge = document.createElement("div");
    wedge.className = "cunha";
    anel.elemento.insertBefore(wedge, anel.elemento.firstChild);
    anel.wedge = wedge;
});

// Monta o gradiente cônico que desenha a fatia colorida entre "inicio" e "fim" (em graus)
function construirGradienteCunha(inicioDeg, fimDeg, cor) {
    const inicio = ((inicioDeg % 360) + 360) % 360;
    const fim = ((fimDeg % 360) + 360) % 360;

    if (inicio < fim) {
        return `conic-gradient(from 0deg,
            transparent 0deg, transparent ${inicio}deg,
            ${cor} ${inicio}deg, ${cor} ${fim}deg,
            transparent ${fim}deg, transparent 360deg)`;
    }

    // A fatia cruza o limite de 0°/360° (ex.: de 350° até 10°)
    return `conic-gradient(from 0deg,
        ${cor} 0deg, ${cor} ${fim}deg,
        transparent ${fim}deg, transparent ${inicio}deg,
        ${cor} ${inicio}deg, ${cor} 360deg)`;
}

// Atualiza a fatia colorida para apontar para a tecla ativa e apaga a fatia dos outros anéis
function atualizarCunha(anelIndex, posicao, quantidade) {
    const largura = 360 / quantidade;
    const centro = (posicao / quantidade) * 360;
    const inicio = centro - largura / 2;
    const fim = centro + largura / 2;

    aneis.forEach((anel, i) => {
        if (i === anelIndex) {
            anel.wedge.style.background = construirGradienteCunha(inicio, fim, "rgba(76, 175, 80, .6)");
            anel.wedge.style.opacity = "1";
        } else {
            anel.wedge.style.opacity = "0";
        }
    });
}

// Apaga a fatia de todos os anéis (usado quando o foco sai para os satélites)
function esconderCunhas() {
    aneis.forEach((anel) => {
        anel.wedge.style.opacity = "0";
    });
}

// ==============================
// LADO DO MENU LATERAL
// ==============================
//
// O menu lateral (satélites) muda de lado conforme o ângulo da tecla ativa,
// pra ficar sempre mais perto/fácil de alcançar a partir de onde o usuário está.

const satelitesContainer = document.querySelector(".satelites");

// Divide o círculo em 4 quadrantes de 90°, usando o mesmo sistema de ângulo
// já usado pra posicionar as teclas (0° = direita, 90° = baixo, 180° = esquerda, 270°/-90° = topo)
function determinarLado(anguloGraus) {
    const a = ((anguloGraus % 360) + 360) % 360;

    if (a >= 315 || a < 45) return "direita";
    if (a >= 45 && a < 135) return "baixo";
    if (a >= 135 && a < 225) return "esquerda";
    return "topo"; // 225° - 315°
}

function atualizarLadoSatelites(anguloGraus) {
    satelitesContainer.dataset.lado = determinarLado(anguloGraus);
}

// ==============================
// MONTAGEM DAS TECLAS
// ==============================

// Campo de valor
const valor = document.getElementById("valor");

let indiceGlobal = 0;
let primeiraTecla = null;

aneis.forEach((anel, anelIndex) => {
    const quantidade = anel.itens.length;

    anel.itens.forEach((tecla, posicao) => {
        const elemento = document.createElement("button");

        elemento.classList.add("tecla");
        elemento.tabIndex = indiceGlobal === 0 ? 0 : -1;
        elemento.setAttribute("aria-label", `Tecla ${tecla}`);
        elemento.textContent = tecla;
        elemento.dataset.valor = tecla;

        // Ângulo desta tecla dentro do próprio anel
        const angulo = (posicao / quantidade) * 360 - 90;

        // Posição em % relativa ao PRÓPRIO anel (não ao teclado todo),
        // já que cada .anel tem seu próprio tamanho definido em CSS.
        const raioFactor = anel.raioFactor;
        const x = 50 + Math.cos(angulo * Math.PI / 180) * raioFactor * 50;
        const y = 50 + Math.sin(angulo * Math.PI / 180) * raioFactor * 50;

        elemento.style.left = `${x}%`;
        elemento.style.top = `${y}%`;

        elemento.addEventListener("click", () => {
            valor.textContent += tecla;
        });

        // Sempre que a tecla ganha foco (seta, clique ou Tab), acende a fatia dela
        // e reposiciona o menu lateral pro lado mais perto dessa tecla
        elemento.addEventListener("focus", () => {
            atualizarCunha(anelIndex, posicao, quantidade);
            atualizarLadoSatelites(angulo);
        });

        const indiceDestaTecla = indiceGlobal;
        elemento.addEventListener("keydown", (evento) => {
            moverFoco(evento, indiceDestaTecla);
        });

        anel.elemento.appendChild(elemento);

        // Guarda referência à primeira tecla para ativá-la assim que o teclado for montado
        if (indiceGlobal === 0) {
            primeiraTecla = elemento;
        }

        indiceGlobal++;
    });
});

// Registra os satélites na sequência de navegação (logo depois das teclas do teclado)
satelites.forEach((elemento, posicao) => {
    elemento.tabIndex = -1;

    const indiceDesteSatelite = indiceGlobal;

    elemento.addEventListener("keydown", (evento) => {
        moverFoco(evento, indiceDesteSatelite);
    });

    // Ao entrar num satélite, apaga a fatia do teclado (não faz sentido nos satélites)
    elemento.addEventListener("focus", () => {
        esconderCunhas();
    });

    indiceGlobal++;
});

// Ativa a primeira tecla assim que a página carrega, para o usuário
// já perceber visualmente que dá pra navegar pelo teclado com as setas.
// (o listener de "focus" acima já acende a fatia correspondente)
primeiraTecla.focus();

// Limpar tudo
document.getElementById("limpar").addEventListener("click", () => {
    valor.textContent = "";
});

// Excluir último caractere
document.getElementById("excluir").addEventListener("click", () => {
    valor.textContent = valor.textContent.slice(0, -1);
});

// Falar (reconhecimento de voz ainda não implementado)
document.getElementById("falar").addEventListener("click", () => {
    alert("Funcionalidade de voz ainda não implementada.");
});

// ==============================
// PALAVRAS CADASTRADAS
// ==============================
//
// Ao concluir, a palavra digitada vira um card abaixo do campo. Clicar no
// card revela um botão de excluir; clicar de novo (ou em outro card) fecha.

const CHAVE_ARMAZENAMENTO = "palavrasCadastradas";
const palavrasLista = document.getElementById("palavrasLista");

function carregarPalavras() {
    try {
        const salvo = JSON.parse(localStorage.getItem(CHAVE_ARMAZENAMENTO));
        return Array.isArray(salvo) ? salvo : [];
    } catch {
        return [];
    }
}

function salvarPalavras() {
    localStorage.setItem(CHAVE_ARMAZENAMENTO, JSON.stringify(palavras));
}

let palavras = carregarPalavras();

function renderizarPalavras() {
    palavrasLista.innerHTML = "";

    palavras.forEach((palavra, indice) => {
        const card = document.createElement("div");
        card.className = "palavra-card";
        card.tabIndex = 0;
        card.setAttribute("role", "button");
        card.setAttribute("aria-label", `Palavra ${palavra}. Pressione Enter para opção de excluir.`);

        const texto = document.createElement("span");
        texto.className = "palavra-texto";
        texto.textContent = palavra;

        const botaoExcluir = document.createElement("button");
        botaoExcluir.className = "palavra-excluir";
        botaoExcluir.textContent = "excluir";
        botaoExcluir.setAttribute("aria-label", `Excluir palavra ${palavra}`);

        botaoExcluir.addEventListener("click", (evento) => {
            evento.stopPropagation();
            palavras.splice(indice, 1);
            salvarPalavras();
            renderizarPalavras();
        });

        function alternarAberto() {
            const jaAberto = card.classList.contains("aberto");
            document.querySelectorAll(".palavra-card.aberto")
                .forEach((el) => el.classList.remove("aberto"));
            if (!jaAberto) card.classList.add("aberto");
        }

        card.addEventListener("click", alternarAberto);
        card.addEventListener("keydown", (evento) => {
            if (evento.key === "Enter" || evento.key === " ") {
                evento.preventDefault();
                alternarAberto();
            }
        });

        card.appendChild(texto);
        card.appendChild(botaoExcluir);
        palavrasLista.appendChild(card);
    });
}

renderizarPalavras();

// Confirmar / concluir
document.getElementById("concluir").addEventListener("click", () => {
    if (valor.textContent === "") {
        alert("Digite alguma coisa.");
        return;
    }

    palavras.push(valor.textContent);
    salvarPalavras();
    renderizarPalavras();
    valor.textContent = "";
});