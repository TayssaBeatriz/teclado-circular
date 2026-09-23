const valor = document.getElementById("valor");
const menuOrbital = document.getElementById("menuOrbital");
const botoesMenu = [...menuOrbital.querySelectorAll(".satelite")];
const frasesProntasEl = document.getElementById("frasesProntas");

// Palavras-chave da argola de dentro (sempre visível), para começar uma frase.
const palavrasChave = ["eu", "você", "ele", "ela", "nós", "eles", "elas", "isso", "aquilo"];

// Pool de reserva usado quando faltam sugestões específicas para completar a argola de fora.
const frasesRapidas = [
    "olá", "tudo bem", "pode ajudar", "quero ir para casa", "estou com dor",
    "preciso de água", "não entendi", "mais devagar", "até logo", "obrigado"
];

// Saudações usadas pelo botão "recarregar" na argola de dentro, quando a
// frase ainda está vazia (estado inicial) — dão outras formas de começar
// uma conversa, além dos pronomes.
const saudacoes = [
    "Bom dia", "Boa tarde", "Boa noite", "Olá", "Oi", "Tudo bem?",
    "Como vai?", "Até logo", "Tchau", "Prazer em conhecer você",
    "Como você está?", "Muito prazer"
];

// No estado inicial, a argola de dentro só pode mostrar os pronomes
// originais e as saudações acima — nada além disso.
const opcoesArgolaInicial = palavrasChave.concat(saudacoes);

// Sugestões da argola de fora (aparece após a 1ª palavra), tipo corretor automático.
const sugestoesPorPalavra = {
    eu: ["vou", "quero", "não", "acho", "tenho", "preciso", "estou"],
    voce: ["vai", "quer", "pode", "sabe", "tem", "está", "foi"],
    ela: [
        "é", "está", "vai", "tem", "foi", "quer", "pode", "sabe", "fez", "disse",
        "chegou", "gosta", "precisa", "queria", "estava", "era", "ficou", "começou",
        "terminou", "mora", "trabalha", "estuda", "faz", "diz", "acha", "pensa",
        "conhece", "entende", "viu", "falou", "ligou", "mandou", "pegou", "deu",
        "saiu", "voltou", "entrou"
    ],
    nos: [
        "somos", "estamos", "vamos", "temos", "fomos", "queremos", "podemos",
        "sabemos", "fizemos", "dissemos", "chegamos", "gostamos", "precisamos",
        "queríamos", "estávamos", "éramos", "ficamos", "começamos", "terminamos",
        "moramos", "trabalhamos", "estudamos", "fazemos", "dizemos", "achamos",
        "pensamos", "conhecemos", "entendemos", "vimos", "falamos", "ligamos",
        "mandamos", "pegamos", "demos", "saímos", "voltamos", "entramos",
        "iremos", "teremos", "poderemos"
    ],
    eles: [
        "são", "estão", "vão", "têm", "foram", "querem", "podem", "sabem",
        "fizeram", "disseram", "chegaram", "gostam", "precisam", "queriam",
        "estavam", "eram", "ficaram", "começaram", "terminaram", "moram",
        "trabalham", "estudam", "fazem", "dizem", "acham", "pensam", "conhecem",
        "entendem", "viram", "falaram", "ligaram", "mandaram", "pegaram", "deram",
        "saíram", "voltaram", "entraram", "irão", "terão", "poderão"
    ],
    quero: ["água", "comida", "ir ao banheiro", "ajuda", "falar", "ir para casa", "descansar", "saber", "parar", "mais tempo"],
    preciso: ["de ajuda", "de água", "de comida", "ir ao banheiro", "descansar", "falar com alguém", "de remédio", "ir para casa", "de tempo", "entender"],
    não: ["quero", "sei", "entendi", "posso", "estou bem", "gosto", "preciso", "consigo", "tenho certeza", "obrigado"],
    sim: ["por favor", "eu quero", "eu posso", "está bem", "obrigado", "vamos", "agora", "quero isso", "entendi", "claro"],
    isso: [
        "é", "está", "foi", "será", "era", "parece", "pode", "poderia", "deve",
        "deveria", "tem", "tinha", "vai", "vai ser", "seria", "significa",
        "aconteceu", "acontece", "funciona", "funcionou", "faz", "fez", "fica",
        "ficou", "está certo", "está errado", "está acontecendo", "não", "sim",
        "mesmo", "muito", "bem", "melhor", "pior", "importante", "necessário",
        "possível", "verdade", "fácil", "difícil", "bom", "ruim", "incrível",
        "interessante", "estranho"
    ],
    ajuda: ["por favor", "agora", "para mim", "com isso", "eu preciso", "não consigo", "estou com dor", "quero falar", "por aqui", "obrigado"],
    agua: ["por favor", "eu quero", "preciso de", "agora", "um pouco", "mais água", "para beber", "obrigado", "estou com sede", "quero beber"],
    comida: ["por favor", "eu quero", "preciso de", "agora", "um pouco", "mais comida", "para comer", "obrigado", "estou com fome", "quero comer"],
    banheiro: ["por favor", "quero ir", "preciso ir", "agora", "onde fica", "me acompanhe", "com ajuda", "obrigado", "urgente", "vamos"],
    dor: ["estou com", "muita dor", "aqui", "preciso de ajuda", "agora", "por favor", "não estou bem", "chame alguém", "remédio", "obrigado"],

    // Continuações para os verbos mais comuns das listas de "eu" e de
    // "você/ele/ela", para a frase continuar fazendo sentido depois deles.
    vou: ["para casa", "embora", "tentar", "dormir", "comer", "trabalhar", "sair", "ficar bem", "voltar", "fazer isso"],
    acho: ["que sim", "que não", "bom", "estranho", "engraçado", "difícil", "interessante", "melhor assim", "isso certo", "isso errado"],
    tenho: ["certeza", "dúvida", "medo", "fome", "sede", "sono", "pressa", "um problema", "uma pergunta", "saudade"],
    estou: ["bem", "cansado", "com fome", "com sede", "com dor", "feliz", "triste", "preocupado", "com pressa", "com sono"],
    vai: ["ficar bem", "dar certo", "chover", "sair", "embora", "dormir", "comer", "trabalhar", "demorar", "voltar"],
    quer: ["água", "comida", "ajuda", "ir embora", "descansar", "falar", "saber", "parar", "dormir", "sair"],
    pode: ["me ajudar", "esperar", "repetir", "vir aqui", "falar mais devagar", "ser", "ficar", "entrar", "sair", "continuar"],
    sabe: ["onde fica", "como fazer", "o que aconteceu", "de que estou falando", "a resposta", "que horas são", "por quê", "quando", "quem foi", "o que fazer"],
    tem: ["certeza", "razão", "um problema", "tempo", "fome", "sede", "medo", "pressa", "paciência", "cuidado"],
    esta: ["bem", "certo", "errado", "acontecendo", "ótimo", "difícil", "tudo bem", "cansado", "com fome", "com dor"],
    foi: ["embora", "bom", "difícil", "rápido", "um erro", "sem querer", "sozinho", "com ela", "com ele", "ontem"],
    e: ["verdade", "importante", "difícil", "fácil", "isso mesmo", "sério", "engraçado", "possível", "necessário", "estranho"],
    faz: ["tempo", "sentido", "isso", "um favor", "calor", "frio", "bem", "mal", "diferença", "falta"],
    diz: ["que sim", "que não", "a verdade", "para eu esperar", "olá", "obrigado", "desculpa", "por favor", "tchau", "não sei"],
    gosta: ["muito", "disso", "de mim", "de você", "de música", "de comer", "de ler", "de conversar", "de passear", "de ajudar"],
    precisa: ["de ajuda", "de água", "descansar", "ir embora", "de tempo", "de remédio", "de mim", "de calma", "conversar", "entender"],

    // O mesmo, para as formas no plural das listas de "nós" e de "eles/elas".
    vamos: ["embora", "comer", "sair", "para casa", "tentar", "ver", "conversar", "esperar", "começar", "descansar"],
    estamos: ["bem", "com fome", "cansados", "com pressa", "quase lá", "juntos", "esperando", "prontos", "atrasados", "bem aqui"],
    vao: ["embora", "chegar", "ficar bem", "dar certo", "voltar", "sair", "demorar", "entender", "ajudar", "conseguir"],
    querem: ["ajuda", "água", "ir embora", "saber", "descansar", "falar", "comer", "sair", "entender", "parar"],
    podem: ["vir", "esperar", "ajudar", "entrar", "ficar", "continuar", "sair", "repetir", "explicar", "tentar"],
    sabem: ["onde fica", "o que fazer", "a resposta", "que horas são", "por quê", "quando", "quem foi", "como funciona", "o que aconteceu", "de que se trata"]
};

// "ele" usa a mesma conjugação de "ela" (3ª pessoa do singular).
// "elas" e "aquilo" usam as mesmas sugestões de "eles" e "isso".
sugestoesPorPalavra.ele = sugestoesPorPalavra.ela;
sugestoesPorPalavra.elas = sugestoesPorPalavra.eles;
sugestoesPorPalavra.aquilo = sugestoesPorPalavra.isso;

// Sugestão genérica quando a última palavra não tem lista específica.
const sugestoesGenericas = [
    "quero", "preciso", "por favor", "ajuda", "agora", "mais",
    "de novo", "está bem", "não entendi", "obrigado"
];

// Argola 0: palavras-chave, fica por dentro e sempre visível.
// Argola 1: sugestões (autocomplete), fica por fora e só aparece ao redor
// da argola 0 depois que a primeira palavra-chave é escolhida.
const aneis = [
    { elemento: document.getElementById("anelMeio"), quantidade: 9, teclas: [], palavras: palavrasChave, raio: 72, temBuraco: true },
    { elemento: document.getElementById("anelExterno"), quantidade: 10, teclas: [], palavras: [], raio: 80 }
];

let teclaAtiva = null;
let direcaoAtiva = "cima";
let sugestoesVisiveis = false;

// Cursor de navegação controlado pelo próprio código (não depende só do
// foco real do navegador, que pode falhar em certos ambientes de exibição).
let anelAtualIndice = 0;
let posicaoAtualIndice = 0;

function normalizarPalavra(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function palavraAtual() {
    const palavras = valor.textContent.trim().split(/\s+/);
    return normalizarPalavra(palavras.at(-1) || "");
}

function preencherAte(palavras, quantidade, reserva) {
    const resultado = [...palavras];
    reserva.forEach((palavra) => {
        if (resultado.length < quantidade && !resultado.includes(palavra)) resultado.push(palavra);
    });
    return resultado.slice(0, quantidade);
}

function atualizarTextoDasTeclas(anel, palavras) {
    anel.palavras = palavras;
    anel.teclas.forEach((tecla, indice) => {
        const texto = palavras[indice];
        tecla.textContent = texto;
        tecla.dataset.valor = texto;
        tecla.setAttribute("aria-label", `Sugestão: ${texto}`);
    });
}

// ==== Integrações externas (opcionais) ====
// Sugestões de continuação de frase via OpenAI e correção ortográfica/
// gramatical via LanguageTool. Ambas são chamadas diretamente do navegador.
//
// ATENÇÃO sobre a chave da OpenAI: colocá-la aqui deixa a chave visível para
// qualquer pessoa que abrir o código-fonte da página (F12 > rede/fontes).
// Isso é aceitável para testes pessoais, mas se for publicar este teclado
// para outras pessoas usarem, o recomendado é criar um pequeno servidor
// (proxy) que guarde a chave em segredo e repasse as chamadas — nesse caso,
// preencha OPENAI_PROXY_URL em vez de OPENAI_API_KEY (veja abaixo).
const OPENAI_API_KEY = ""; // ex: "sk-..."
const OPENAI_PROXY_URL = ""; // ex: "https://meu-servidor.com/api/sugestoes" (mais seguro)
const OPENAI_MODELO = "gpt-4o-mini";

// Endpoint público do LanguageTool: não exige chave para uso moderado.
const LANGUAGETOOL_URL = "https://api.languagetool.org/v2/check";
const LANGUAGETOOL_IDIOMA = "pt-BR";

// Pede à OpenAI (ou ao proxy configurado) palavras/expressões curtas para
// continuar a frase atual. Retorna null se não há integração configurada
// ou se a chamada falha, para que o código sempre tenha um caminho local
// de reserva (o dicionário de sugestões já existente).
async function sugerirComOpenAI(frase) {
    if (!OPENAI_PROXY_URL && !OPENAI_API_KEY) return null;
    try {
        const corpoBase = {
            model: OPENAI_MODELO,
            temperature: 0.7,
            messages: [
                {
                    role: "system",
                    content: "Você ajuda um teclado de comunicação alternativa (AAC) em português do Brasil. Dada uma frase incompleta, sugira até 10 palavras ou expressões curtas (1 a 3 palavras) para continuar a frase de forma natural. Responda SOMENTE com um array JSON de strings, sem nenhum texto além disso."
                },
                { role: "user", content: frase || "(frase vazia, sugira palavras para começar uma frase)" }
            ]
        };

        const url = OPENAI_PROXY_URL || "https://api.openai.com/v1/chat/completions";
        const cabecalhos = { "Content-Type": "application/json" };
        if (!OPENAI_PROXY_URL) cabecalhos.Authorization = `Bearer ${OPENAI_API_KEY}`;

        const resposta = await fetch(url, { method: "POST", headers: cabecalhos, body: JSON.stringify(corpoBase) });
        if (!resposta.ok) return null;

        const dados = await resposta.json();
        const texto = dados.choices?.[0]?.message?.content?.trim() ?? "";
        const lista = JSON.parse(texto);
        return Array.isArray(lista) ? lista.filter((item) => typeof item === "string" && item.trim()) : null;
    } catch (erro) {
        console.warn("Não foi possível buscar sugestões da OpenAI:", erro);
        return null;
    }
}

// Envia o texto ao LanguageTool e devolve a versão corrigida, aplicando a
// primeira sugestão de cada erro encontrado. Se a chamada falhar, devolve
// o texto original sem alterações.
async function corrigirComLanguageTool(texto) {
    if (!texto) return texto;
    try {
        const corpo = new URLSearchParams({ text: texto, language: LANGUAGETOOL_IDIOMA });
        const resposta = await fetch(LANGUAGETOOL_URL, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: corpo
        });
        if (!resposta.ok) return texto;

        const dados = await resposta.json();
        let corrigido = texto;
        // Aplica as correções de trás para frente, para não bagunçar os índices dos erros seguintes.
        const erros = [...(dados.matches || [])].sort((a, b) => b.offset - a.offset);
        erros.forEach((erro) => {
            const sugestao = erro.replacements?.[0]?.value;
            if (sugestao !== undefined) {
                corrigido = corrigido.slice(0, erro.offset) + sugestao + corrigido.slice(erro.offset + erro.length);
            }
        });
        return corrigido;
    } catch (erro) {
        console.warn("Não foi possível corrigir o texto com o LanguageTool:", erro);
        return texto;
    }
}

// Pede à OpenAI (ou ao proxy configurado) frases completas prontas, a
// partir do conjunto de palavras já escolhido, para mostrar como atalho
// abaixo do campo de texto. Mesmo caminho de configuração/limite de
// segurança de sugerirComOpenAI.
async function sugerirFrasesProntas(frase) {
    if (!OPENAI_PROXY_URL && !OPENAI_API_KEY) return null;
    try {
        const corpo = {
            model: OPENAI_MODELO,
            temperature: 0.7,
            messages: [
                {
                    role: "system",
                    content: "Você ajuda um teclado de comunicação alternativa (AAC) em português do Brasil. Dado um conjunto de palavras ou frase parcial, sugira até 4 frases completas, curtas e naturais que a pessoa provavelmente quer dizer, usando essas palavras como base. Responda SOMENTE com um array JSON de strings, sem nenhum texto além disso."
                },
                { role: "user", content: frase }
            ]
        };

        const url = OPENAI_PROXY_URL || "https://api.openai.com/v1/chat/completions";
        const cabecalhos = { "Content-Type": "application/json" };
        if (!OPENAI_PROXY_URL) cabecalhos.Authorization = `Bearer ${OPENAI_API_KEY}`;

        const resposta = await fetch(url, { method: "POST", headers: cabecalhos, body: JSON.stringify(corpo) });
        if (!resposta.ok) return null;

        const dados = await resposta.json();
        const texto = dados.choices?.[0]?.message?.content?.trim() ?? "";
        const lista = JSON.parse(texto);
        return Array.isArray(lista) ? lista.filter((item) => typeof item === "string" && item.trim()) : null;
    } catch (erro) {
        console.warn("Não foi possível buscar frases prontas da OpenAI:", erro);
        return null;
    }
}

// Renderiza (ou limpa) o painel de frases prontas abaixo do campo de texto.
// Clicar numa delas substitui a frase atual por ela.
function mostrarFrasesProntas(frases) {
    frasesProntasEl.innerHTML = "";
    if (!frases || !frases.length) return;
    frases.forEach((frase) => {
        const botao = document.createElement("button");
        botao.type = "button";
        botao.className = "frase-pronta";
        botao.textContent = frase;
        botao.addEventListener("click", () => {
            valor.textContent = frase;
        });
        frasesProntasEl.appendChild(botao);
    });
}

async function atualizarFrasesProntas() {
    const frase = valor.textContent.trim();
    if (!frase) {
        mostrarFrasesProntas(null);
        return;
    }
    const frases = await sugerirFrasesProntas(frase);
    // Só aplica se a frase não tiver mudado enquanto a resposta chegava.
    if (valor.textContent.trim() === frase) mostrarFrasesProntas(frases);
}

function atualizarAnelPalavrasChave() {
    atualizarTextoDasTeclas(aneis[0], palavrasChave);
}

// Preenche o anel indicado (0 ou 1) com sugestões para continuar a frase.
// Como as duas argolas se revezam nesse papel, essa função recebe qual
// delas atualizar, em vez de mexer sempre na mesma.
function atualizarSugestoesNoAnel(indiceAnel) {
    const anel = aneis[indiceAnel];
    const base = sugestoesPorPalavra[palavraAtual()] || sugestoesGenericas;
    const completas = preencherAte(base, anel.quantidade, frasesRapidas.concat(palavrasChave));
    atualizarTextoDasTeclas(anel, completas);

    // Se a OpenAI estiver configurada, tenta melhorar essas sugestões com base
    // na frase inteira assim que a resposta chegar (não bloqueia a exibição
    // imediata das sugestões locais, que continuam servindo de reserva).
    sugerirComOpenAI(valor.textContent.trim()).then((sugestoesIA) => {
        if (modoAlfabeto) return;
        if (sugestoesIA && sugestoesIA.length) {
            atualizarTextoDasTeclas(anel, preencherAte(sugestoesIA, anel.quantidade, completas));
        }
    });
}

function embaralhar(lista) {
    const copia = [...lista];
    for (let i = copia.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
}

// Botão "recarregar": age sobre a argola que estiver ativa no momento (a que
// está exibindo sugestões agora, seja a de dentro ou a de fora). A argola de
// dentro pode ser recarregada a qualquer momento, inclusive antes de
// qualquer palavra ser escolhida (ela é sempre visível); a de fora só pode
// ser recarregada depois de já ter aparecido pela primeira vez. Tenta
// primeiro pedir novas sugestões à OpenAI (se configurada); se não houver
// integração ou a chamada falhar, sorteia uma nova combinação local.
async function recarregarSugestoes() {
    // No modo alfabético não há o que recarregar (as 26 letras já estão
    // todas na argola); "recarregar" fica sem efeito até sair do modo.
    if (modoAlfabeto) return;

    const indiceAnel = anelAtualIndice;
    if (indiceAnel === 1 && !sugestoesVisiveis) return;
    const anel = aneis[indiceAnel];
    const frase = valor.textContent.trim();

    // Estado inicial (frase ainda vazia): a argola de dentro sorteia uma
    // mistura dos pronomes originais com as saudações, intercalando os dois.
    if (indiceAnel === 0 && !frase) {
        atualizarTextoDasTeclas(anel, embaralhar(opcoesArgolaInicial).slice(0, anel.quantidade));
        return;
    }

    const sugestoesIA = await sugerirComOpenAI(`${frase} (sugira opções diferentes das mais óbvias)`);
    if (sugestoesIA && sugestoesIA.length) {
        atualizarTextoDasTeclas(anel, preencherAte(sugestoesIA, anel.quantidade, frasesRapidas.concat(palavrasChave)));
        return;
    }

    const base = sugestoesPorPalavra[palavraAtual()] || sugestoesGenericas;
    const baseEmbaralhada = embaralhar(base);
    const extras = embaralhar(frasesRapidas.concat(palavrasChave).filter((palavra) => !base.includes(palavra)));
    const novaLista = preencherAte(baseEmbaralhada, anel.quantidade, extras);
    atualizarTextoDasTeclas(anel, novaLista);
}

// Reseta o teclado para a configuração inicial: argola de dentro volta a
// mostrar as palavras-chave e a argola de fora desaparece de novo.
function voltarConfiguracaoInicial() {
    if (modoAlfabeto) {
        criarTeclasDoAnel(aneis[0], 9, false);
        modoAlfabeto = false;
        document.querySelectorAll(".botao-alfabeto").forEach((botao) => botao.classList.remove("ativo"));
    }
    atualizarAnelPalavrasChave();
    esconderAnelSugestoes();
    mostrarFrasesProntas(null);
    novaPalavraAlfabeto = true;
    noBotaoCentral = false;
    anelAtualIndice = 0;
    posicaoAtualIndice = 0;
    focarTecla(0, 0);
}

// Posiciona os botões do menu lateral com a mesma trigonometria usada nas
// teclas (ângulo + raio a partir do centro), formando um arco que encaixa
// exatamente na circunferência da argola visível no momento — mais perto
// da borda da argola de dentro (raio 36%) e mais longe quando a argola de
// fora está aberta (raio 46%, acompanhando o tamanho maior dela).
const ANGULO_BASE_MENU = { direita: 0, baixo: 90, esquerda: 180, cima: -90 };
const ARCO_MENU_GRAUS = 110;

function posicionarMenuOrbital() {
    const anguloBase = ANGULO_BASE_MENU[direcaoAtiva] ?? 0;
    const raio = sugestoesVisiveis ? 46 : 36;
    const total = botoesMenu.length;
    botoesMenu.forEach((botao, indice) => {
        const offset = total > 1 ? (indice - (total - 1) / 2) * (ARCO_MENU_GRAUS / (total - 1)) : 0;
        const anguloRad = (anguloBase + offset) * Math.PI / 180;
        const x = 50 + Math.cos(anguloRad) * raio;
        const y = 50 + Math.sin(anguloRad) * raio;
        botao.style.left = `${x}%`;
        botao.style.top = `${y}%`;
    });
}

function mostrarAnelSugestoes() {
    sugestoesVisiveis = true;
    aneis[1].elemento.classList.add("visivel");
    posicionarMenuOrbital();
}

function esconderAnelSugestoes() {
    sugestoesVisiveis = false;
    aneis[1].elemento.classList.remove("visivel");
    aneis[1].cunha.classList.remove("ativa");
    aneis[1].teclas.forEach((tecla) => (tecla.tabIndex = -1));
    posicionarMenuOrbital();
}

function adicionarPalavra(texto) {
    if (!texto) return;
    valor.textContent = `${valor.textContent.trim()} ${texto}`.trim();
    atualizarFrasesProntas();
}

// ==== Modo alfabético (botão "Aa" no centro da argola de dentro) ====
// Reconstrói a própria argola de dentro (a "argola inicial") com as 26
// letras do alfabeto, no lugar do que ela estivesse mostrando (palavras-
// chave ou sugestões). Só entra nesse modo quando o botão central é clicado.
const alfabeto = "abcdefghijklmnopqrstuvwxyz".split("");
let modoAlfabeto = false;
let novaPalavraAlfabeto = true;

// Restaura o conteúdo "normal" da argola de dentro, de acordo com o ponto
// da frase em que o usuário está: palavras-chave se ainda não começou a
// frase, ou sugestões baseadas na última palavra se já começou.
function restaurarConteudoAnelInicial() {
    if (valor.textContent.trim()) {
        atualizarSugestoesNoAnel(0);
    } else {
        atualizarAnelPalavrasChave();
    }
}

function entrarModoAlfabeto() {
    modoAlfabeto = true;
    novaPalavraAlfabeto = true;
    criarTeclasDoAnel(aneis[0], alfabeto.length, true);
    atualizarTextoDasTeclas(aneis[0], alfabeto);
    anelAtualIndice = 0;
    posicaoAtualIndice = 0;
    focarTecla(0, 0);
}

function sairModoAlfabeto() {
    modoAlfabeto = false;
    criarTeclasDoAnel(aneis[0], 9, false);
    restaurarConteudoAnelInicial();
    anelAtualIndice = 0;
    posicaoAtualIndice = 0;
    focarTecla(0, 0);
}

function alternarModoAlfabeto() {
    if (modoAlfabeto) sairModoAlfabeto(); else entrarModoAlfabeto();
    document.querySelectorAll(".botao-alfabeto").forEach((botao) => botao.classList.toggle("ativo", modoAlfabeto));
}

// Digita uma letra na palavra atual: a primeira letra depois de entrar no
// modo alfabético começa uma palavra nova (com espaço); as seguintes
// grudam direto na anterior, sem espaço, até o usuário sair do modo.
function adicionarLetra(letra) {
    if (novaPalavraAlfabeto) {
        valor.textContent = `${valor.textContent.trim()} ${letra}`.trim();
        novaPalavraAlfabeto = false;
    } else {
        valor.textContent += letra;
    }
}

// Usada tanto pelo clique quanto pela tecla Enter/Espaço. Ao selecionar uma
// palavra em uma argola, é a OUTRA argola que recebe novas sugestões para
// continuar a frase e ganha o foco — as duas vão se revezando conforme a
// frase cresce (dentro -> fora -> dentro -> fora...).
function selecionarPalavra(tecla) {
    if (modoAlfabeto) {
        // No modo alfabético só a própria argola de dentro (agora com as
        // letras) responde; a de fora fica bloqueada até sair do modo.
        if (aneis[0].teclas.includes(tecla)) adicionarLetra(tecla.dataset.valor);
        return;
    }

    const anelOrigem = anelAtualIndice;
    adicionarPalavra(tecla.dataset.valor);

    const anelDestino = anelOrigem === 0 ? 1 : 0;
    if (anelDestino === 1 && !sugestoesVisiveis) mostrarAnelSugestoes();
    atualizarSugestoesNoAnel(anelDestino);

    anelAtualIndice = anelDestino;
    posicaoAtualIndice = 0;
    focarTecla(anelDestino, 0);
}

function direcaoDoAngulo(angulo) {
    const x = Math.cos(angulo * Math.PI / 180);
    const y = Math.sin(angulo * Math.PI / 180);
    if (Math.abs(x) >= Math.abs(y)) return x >= 0 ? "direita" : "esquerda";
    return y >= 0 ? "baixo" : "cima";
}

function setaRetornaAoTeclado(teclaPressionada) {
    return { direita: "ArrowLeft", esquerda: "ArrowRight", cima: "ArrowDown", baixo: "ArrowUp" }[direcaoAtiva] === teclaPressionada;
}

function mostrarCunha(anel, posicao) {
    const abertura = 360 / anel.quantidade;
    const inicio = posicao * abertura - abertura / 2;
    aneis.forEach((outroAnel) => outroAnel.cunha.classList.remove("ativa"));
    anel.cunha.style.background = `conic-gradient(from ${inicio}deg, rgb(140 140 140 / 82%) 0deg ${abertura}deg, transparent ${abertura}deg 360deg)`;
    anel.cunha.classList.add("ativa");
}

function selecionarTecla(tecla, anel, posicao) {
    teclaAtiva = tecla;
    direcaoAtiva = tecla.dataset.direcao;
    anelAtualIndice = aneis.indexOf(anel);
    posicaoAtualIndice = posicao;
    menuOrbital.classList.add("ativo");
    posicionarMenuOrbital();
    mostrarCunha(anel, posicao);
}

function focarTecla(anelDestino, posicaoDestino) {
    if (anelDestino === 1 && !sugestoesVisiveis) return;
    aneis.forEach((anel) => anel.teclas.forEach((tecla) => (tecla.tabIndex = -1)));
    const proximaTecla = aneis[anelDestino].teclas[posicaoDestino];
    proximaTecla.tabIndex = 0;
    proximaTecla.focus();
}

// Navegação por seta do teclado físico: um único listener global, que usa o
// cursor (anelAtualIndice/posicaoAtualIndice) em vez de depender de qual
// elemento o navegador considera "focado" — assim funciona mesmo quando o
// foco automático do navegador não pega em algum ambiente de exibição.
// Cursor extra: quando true, o foco está no botão "Aa" no centro da
// argola de dentro (acessível pela seta para cima a partir dela).
let noBotaoCentral = false;

document.addEventListener("keydown", (evento) => {
    // Se o foco estiver em um botão do menu lateral, quem cuida disso é o moverNoMenu.
    if (botoesMenu.includes(document.activeElement)) return;

    if (noBotaoCentral) {
        if (["Enter", " "].includes(evento.key)) {
            evento.preventDefault();
            noBotaoCentral = false;
            alternarModoAlfabeto();
            return;
        }
        if (evento.key === "ArrowDown" || evento.key === "ArrowUp") {
            evento.preventDefault();
            noBotaoCentral = false;
            focarTecla(anelAtualIndice, posicaoAtualIndice);
        }
        return;
    }

    if (["Enter", " "].includes(evento.key)) {
        evento.preventDefault();
        selecionarPalavra(aneis[anelAtualIndice].teclas[posicaoAtualIndice]);
        return;
    }

    const anelAtual = aneis[anelAtualIndice];
    let proximoAnel = anelAtualIndice;
    let proximaPosicao = posicaoAtualIndice;

    switch (evento.key) {
        case "ArrowLeft":
            proximaPosicao = (posicaoAtualIndice + anelAtual.quantidade - 1) % anelAtual.quantidade;
            break;
        case "ArrowRight":
            proximaPosicao = (posicaoAtualIndice + 1) % anelAtual.quantidade;
            break;
        case "ArrowUp":
            if (anelAtualIndice === 1) {
                proximoAnel = 0;
                proximaPosicao = Math.round((posicaoAtualIndice / anelAtual.quantidade) * aneis[0].quantidade) % aneis[0].quantidade;
            } else if (anelAtualIndice === 0) {
                evento.preventDefault();
                noBotaoCentral = true;
                document.querySelector(".botao-alfabeto").focus();
                return;
            }
            break;
        case "ArrowDown":
            if (anelAtualIndice === 0 && sugestoesVisiveis && !modoAlfabeto) {
                proximoAnel = 1;
                proximaPosicao = Math.round((posicaoAtualIndice / anelAtual.quantidade) * aneis[1].quantidade) % aneis[1].quantidade;
            }
            break;
        default:
            return;
    }

    if (proximoAnel === 1 && !sugestoesVisiveis) return;

    evento.preventDefault();
    if (proximoAnel !== anelAtualIndice || proximaPosicao !== posicaoAtualIndice) {
        anelAtualIndice = proximoAnel;
        posicaoAtualIndice = proximaPosicao;
        focarTecla(proximoAnel, proximaPosicao);
    }
});

function moverNoMenu(evento, indiceAtual) {
    if (setaRetornaAoTeclado(evento.key)) {
        evento.preventDefault();
        teclaAtiva.focus();
        return;
    }
    const anterior = ["ArrowUp", "ArrowLeft"].includes(evento.key);
    const proximo = ["ArrowDown", "ArrowRight"].includes(evento.key);
    if (!anterior && !proximo) return;
    evento.preventDefault();
    const indiceDestino = (indiceAtual + (anterior ? botoesMenu.length - 1 : 1)) % botoesMenu.length;
    botoesMenu[indiceDestino].focus();
}

// Cria (ou recria) as teclas de uma argola com a quantidade indicada,
// substituindo qualquer tecla que já existisse nela. Usada na montagem
// inicial e para reconstruir a argola de dentro no modo alfabético, que
// precisa de mais posições (26) do que as palavras-chave normais (9).
function criarTeclasDoAnel(anel, quantidade, compacta) {
    anel.teclas.forEach((tecla) => tecla.remove());
    anel.teclas = [];
    anel.quantidade = quantidade;

    for (let posicao = 0; posicao < quantidade; posicao += 1) {
        const tecla = document.createElement("button");
        const angulo = (posicao / quantidade) * 360 - 90;
        const x = 50 + Math.cos(angulo * Math.PI / 180) * anel.raio * 0.5;
        const y = 50 + Math.sin(angulo * Math.PI / 180) * anel.raio * 0.5;
        tecla.className = compacta ? "tecla tecla-compacta" : "tecla";
        tecla.type = "button";
        tecla.tabIndex = -1;
        tecla.dataset.direcao = direcaoDoAngulo(angulo);
        tecla.style.left = `${x}%`;
        tecla.style.top = `${y}%`;
        tecla.style.transform = "translate(-50%, -50%)";
        tecla.addEventListener("click", () => selecionarPalavra(tecla));
        tecla.addEventListener("mouseenter", () => selecionarTecla(tecla, anel, posicao));
        tecla.addEventListener("focus", () => selecionarTecla(tecla, anel, posicao));
        anel.teclas.push(tecla);
        anel.elemento.appendChild(tecla);
    }
}

aneis.forEach((anel) => {
    const cunha = document.createElement("div");
    cunha.className = "cunha";
    anel.elemento.appendChild(cunha);
    anel.cunha = cunha;

    if (anel.temBuraco) {
        const botaoAlfabeto = document.createElement("button");
        botaoAlfabeto.type = "button";
        botaoAlfabeto.className = "buraco-central botao-alfabeto";
        botaoAlfabeto.textContent = "Aa";
        botaoAlfabeto.setAttribute("aria-label", "Alternar para teclado alfabético");
        botaoAlfabeto.addEventListener("click", alternarModoAlfabeto);
        anel.elemento.appendChild(botaoAlfabeto);
    }

    criarTeclasDoAnel(anel, anel.quantidade, false);
});

aneis[0].teclas[0].tabIndex = 0;

botoesMenu.forEach((botao, indice) => {
    // tabIndex 0 fixo: os botões do menu lateral ficam sempre alcançáveis
    // pela tecla Tab do teclado físico, sem depender de gestos com as setas.
    botao.tabIndex = 0;
    botao.addEventListener("keydown", (evento) => moverNoMenu(evento, indice));
});

document.getElementById("limpar").addEventListener("click", () => {
    valor.textContent = "";
    voltarConfiguracaoInicial();
});

document.getElementById("excluir").addEventListener("click", () => {
    const palavras = valor.textContent.trim().split(/\s+/).filter(Boolean);
    palavras.pop();
    valor.textContent = palavras.join(" ");
    if (palavras.length === 0) {
        voltarConfiguracaoInicial();
    } else {
        atualizarSugestoesNoAnel(anelAtualIndice);
        atualizarFrasesProntas();
    }
});

document.getElementById("recarregar").addEventListener("click", () => recarregarSugestoes());

document.getElementById("voltarInicio").addEventListener("click", () => voltarConfiguracaoInicial());

// Botão "falar": lê em voz alta a frase montada até agora.
function falarFrase() {
    const texto = valor.textContent.trim();
    if (!texto) return;
    if (!("speechSynthesis" in window)) {
        alert("Este navegador não tem suporte a leitura por voz.");
        return;
    }
    const fala = new SpeechSynthesisUtterance(texto);
    fala.lang = "pt-BR";
    speechSynthesis.cancel();
    speechSynthesis.speak(fala);
}

document.getElementById("falar").addEventListener("click", falarFrase);

// Botão "concluir": corrige a ortografia/gramática da frase com o
// LanguageTool, mostra o texto corrigido e devolve o teclado à
// configuração inicial (argola de dentro com as palavras-chave de novo).
document.getElementById("concluir").addEventListener("click", async () => {
    const textoOriginal = valor.textContent.trim();
    const textoCorrigido = await corrigirComLanguageTool(textoOriginal);
    valor.textContent = textoCorrigido;
    console.log("Frase formada:", textoCorrigido);
    voltarConfiguracaoInicial();
});

atualizarAnelPalavrasChave();

// Garante o destaque visual na primeira tecla da argola (dica de por onde
// começar) assim que a página carrega, e reforça de novo no primeiro
// clique/toque, caso o foco automático não "pegue" de início (isso pode
// acontecer quando a página é exibida dentro de um iframe de
// pré-visualização, que só libera o foco após uma primeira interação —
// restrição do próprio navegador, não do código). A navegação por seta em
// si já funciona mesmo sem isso, pois usa o cursor próprio do código.
function focarInicio() {
    aneis[0].teclas[0].focus();
}

focarInicio();
window.addEventListener("load", focarInicio);
document.addEventListener("pointerdown", focarInicio, { capture: true, once: true });