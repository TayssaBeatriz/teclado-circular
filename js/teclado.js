const valor = document.getElementById("valor");
const menuOrbital = document.getElementById("menuOrbital");

if (!valor || !menuOrbital) {
    console.error(
        'Teclado: não foram encontrados os elementos #valor e/ou #menuOrbital.'
    );
    throw new Error("Estrutura HTML do teclado não encontrada.");
}

const botoesMenu = [...menuOrbital.querySelectorAll(".satelite")];


// ======================================================
// PALAVRAS-CHAVE DA ARGOLA INTERNA
// ======================================================

const palavrasChave = [
    "eu",
    "você",
    "ele",
    "ela",
    "nós",
    "eles",
    "elas",
    "isso",
    "aquilo"
];


// ======================================================
// FRASES DE RESERVA
// ======================================================

const frasesRapidas = [
    "olá",
    "tudo bem",
    "pode ajudar",
    "quero ir para casa",
    "estou com dor",
    "preciso de água",
    "não entendi",
    "mais devagar",
    "até logo",
    "obrigado"
];


// ======================================================
// SAUDAÇÕES
// ======================================================

const saudacoes = [
    "Bom dia",
    "Boa tarde",
    "Boa noite",
    "Olá",
    "Oi",
    "Tudo bem?",
    "Como vai?",
    "Até logo",
    "Tchau",
    "Prazer em conhecer você",
    "Como você está?",
    "Muito prazer"
];


// ======================================================
// OPÇÕES DA ARGOLA INICIAL
// ======================================================

const opcoesArgolaInicial = palavrasChave.concat(saudacoes);


// ======================================================
// SUGESTÕES POR PALAVRA
// ======================================================

const sugestoesPorPalavra = {

    eu: [
        "vou",
        "quero",
        "não",
        "acho",
        "tenho",
        "preciso",
        "estou"
    ],

    voce: [
        "vai",
        "quer",
        "pode",
        "sabe",
        "tem",
        "está",
        "foi"
    ],

    ela: [
        "é",
        "está",
        "vai",
        "tem",
        "foi",
        "quer",
        "pode",
        "sabe",
        "fez",
        "disse",
        "chegou",
        "gosta",
        "precisa",
        "queria",
        "estava",
        "era",
        "ficou",
        "começou",
        "terminou",
        "mora",
        "trabalha",
        "estuda",
        "faz",
        "diz",
        "acha",
        "pensa",
        "conhece",
        "entende",
        "viu",
        "falou",
        "ligou",
        "mandou",
        "pegou",
        "deu",
        "saiu",
        "voltou",
        "entrou"
    ],

    nos: [
        "somos",
        "estamos",
        "vamos",
        "temos",
        "fomos",
        "queremos",
        "podemos",
        "sabemos",
        "fizemos",
        "dissemos",
        "chegamos",
        "gostamos",
        "precisamos",
        "queríamos",
        "estávamos",
        "éramos",
        "ficamos",
        "começamos",
        "terminamos",
        "moramos",
        "trabalhamos",
        "estudamos",
        "fazemos",
        "dizemos",
        "achamos",
        "pensamos",
        "conhecemos",
        "entendemos",
        "vimos",
        "falamos",
        "ligamos",
        "mandamos",
        "pegamos",
        "demos",
        "saímos",
        "voltamos",
        "entramos",
        "iremos",
        "teremos",
        "poderemos"
    ],

    eles: [
        "são",
        "estão",
        "vão",
        "têm",
        "foram",
        "querem",
        "podem",
        "sabem",
        "fizeram",
        "disseram",
        "chegaram",
        "gostam",
        "precisam",
        "queriam",
        "estavam",
        "eram",
        "ficaram",
        "começaram",
        "terminaram",
        "moram",
        "trabalham",
        "estudam",
        "fazem",
        "dizem",
        "acham",
        "pensam",
        "conhecem",
        "entendem",
        "viram",
        "falaram",
        "ligaram",
        "mandaram",
        "pegaram",
        "deram",
        "saíram",
        "voltaram",
        "entraram",
        "irão",
        "terão",
        "poderão"
    ],

    quero: [
        "água",
        "comida",
        "ir ao banheiro",
        "ajuda",
        "falar",
        "ir para casa",
        "descansar",
        "saber",
        "parar",
        "mais tempo"
    ],

    preciso: [
        "de ajuda",
        "de água",
        "de comida",
        "ir ao banheiro",
        "descansar",
        "falar com alguém",
        "de remédio",
        "ir para casa",
        "de tempo",
        "entender"
    ],

    não: [
        "quero",
        "sei",
        "entendi",
        "posso",
        "estou bem",
        "gosto",
        "preciso",
        "consigo",
        "tenho certeza",
        "obrigado"
    ],

    sim: [
        "por favor",
        "eu quero",
        "eu posso",
        "está bem",
        "obrigado",
        "vamos",
        "agora",
        "quero isso",
        "entendi",
        "claro"
    ],

    isso: [
        "é",
        "está",
        "foi",
        "será",
        "era",
        "parece",
        "pode",
        "poderia",
        "deve",
        "deveria",
        "tem",
        "tinha",
        "vai",
        "vai ser",
        "seria",
        "significa",
        "aconteceu",
        "acontece",
        "funciona",
        "funcionou",
        "faz",
        "fez",
        "fica",
        "ficou",
        "está certo",
        "está errado",
        "está acontecendo",
        "não",
        "sim",
        "mesmo",
        "muito",
        "bem",
        "melhor",
        "pior",
        "importante",
        "necessário",
        "possível",
        "verdade",
        "fácil",
        "difícil",
        "bom",
        "ruim",
        "incrível",
        "interessante",
        "estranho"
    ],

    ajuda: [
        "por favor",
        "agora",
        "para mim",
        "com isso",
        "eu preciso",
        "não consigo",
        "estou com dor",
        "quero falar",
        "por aqui",
        "obrigado"
    ],

    agua: [
        "por favor",
        "eu quero",
        "preciso de",
        "agora",
        "um pouco",
        "mais água",
        "para beber",
        "obrigado",
        "estou com sede",
        "quero beber"
    ],

    comida: [
        "por favor",
        "eu quero",
        "preciso de",
        "agora",
        "um pouco",
        "mais comida",
        "para comer",
        "obrigado",
        "estou com fome",
        "quero comer"
    ],

    banheiro: [
        "por favor",
        "quero ir",
        "preciso ir",
        "agora",
        "onde fica",
        "me acompanhe",
        "com ajuda",
        "obrigado",
        "urgente",
        "vamos"
    ],

    dor: [
        "estou com",
        "muita dor",
        "aqui",
        "preciso de ajuda",
        "agora",
        "por favor",
        "não estou bem",
        "chame alguém",
        "remédio",
        "obrigado"
    ],

    vou: [
        "para casa",
        "embora",
        "tentar",
        "dormir",
        "comer",
        "trabalhar",
        "sair",
        "ficar bem",
        "voltar",
        "fazer isso"
    ],

    acho: [
        "que sim",
        "que não",
        "bom",
        "estranho",
        "engraçado",
        "difícil",
        "interessante",
        "melhor assim",
        "isso certo",
        "isso errado"
    ],

    tenho: [
        "certeza",
        "dúvida",
        "medo",
        "fome",
        "sede",
        "sono",
        "pressa",
        "um problema",
        "uma pergunta",
        "saudade"
    ],

    estou: [
        "bem",
        "cansado",
        "com fome",
        "com sede",
        "com dor",
        "feliz",
        "triste",
        "preocupado",
        "com pressa",
        "com sono"
    ],

    vai: [
        "ficar bem",
        "dar certo",
        "chover",
        "sair",
        "embora",
        "dormir",
        "comer",
        "trabalhar",
        "demorar",
        "voltar"
    ],

    quer: [
        "água",
        "comida",
        "ajuda",
        "ir embora",
        "descansar",
        "falar",
        "saber",
        "parar",
        "dormir",
        "sair"
    ],

    pode: [
        "me ajudar",
        "esperar",
        "repetir",
        "vir aqui",
        "falar mais devagar",
        "ser",
        "ficar",
        "entrar",
        "sair",
        "continuar"
    ],

    sabe: [
        "onde fica",
        "como fazer",
        "o que aconteceu",
        "de que estou falando",
        "a resposta",
        "que horas são",
        "por quê",
        "quando",
        "quem foi",
        "o que fazer"
    ],

    tem: [
        "certeza",
        "razão",
        "um problema",
        "tempo",
        "fome",
        "sede",
        "medo",
        "pressa",
        "paciência",
        "cuidado"
    ],

    esta: [
        "bem",
        "certo",
        "errado",
        "acontecendo",
        "ótimo",
        "difícil",
        "tudo bem",
        "cansado",
        "com fome",
        "com dor"
    ],

    foi: [
        "embora",
        "bom",
        "difícil",
        "rápido",
        "um erro",
        "sem querer",
        "sozinho",
        "com ela",
        "com ele",
        "ontem"
    ],

    e: [
        "verdade",
        "importante",
        "difícil",
        "fácil",
        "isso mesmo",
        "sério",
        "engraçado",
        "possível",
        "necessário",
        "estranho"
    ],

    faz: [
        "tempo",
        "sentido",
        "isso",
        "um favor",
        "calor",
        "frio",
        "bem",
        "mal",
        "diferença",
        "falta"
    ],

    diz: [
        "que sim",
        "que não",
        "a verdade",
        "para eu esperar",
        "olá",
        "obrigado",
        "desculpa",
        "por favor",
        "tchau",
        "não sei"
    ],

    gosta: [
        "muito",
        "disso",
        "de mim",
        "de você",
        "de música",
        "de comer",
        "de ler",
        "de conversar",
        "de passear",
        "de ajudar"
    ],

    precisa: [
        "de ajuda",
        "de água",
        "descansar",
        "ir embora",
        "de tempo",
        "de remédio",
        "de mim",
        "de calma",
        "conversar",
        "entender"
    ],

    vamos: [
        "embora",
        "comer",
        "sair",
        "para casa",
        "tentar",
        "ver",
        "conversar",
        "esperar",
        "começar",
        "descansar"
    ],

    estamos: [
        "bem",
        "com fome",
        "cansados",
        "com pressa",
        "quase lá",
        "juntos",
        "esperando",
        "prontos",
        "atrasados",
        "bem aqui"
    ],

    vao: [
        "embora",
        "chegar",
        "ficar bem",
        "dar certo",
        "voltar",
        "sair",
        "demorar",
        "entender",
        "ajudar",
        "conseguir"
    ],

    querem: [
        "ajuda",
        "água",
        "ir embora",
        "saber",
        "descansar",
        "falar",
        "comer",
        "sair",
        "entender",
        "parar"
    ],

    podem: [
        "vir",
        "esperar",
        "ajudar",
        "entrar",
        "ficar",
        "continuar",
        "sair",
        "repetir",
        "explicar",
        "tentar"
    ],

    sabem: [
        "onde fica",
        "o que fazer",
        "a resposta",
        "que horas são",
        "por quê",
        "quando",
        "quem foi",
        "como funciona",
        "o que aconteceu",
        "de que se trata"
    ]
};


// ======================================================
// PALAVRAS COM MESMO PADRÃO DE SUGESTÃO
// ======================================================

sugestoesPorPalavra.ele = sugestoesPorPalavra.ela;
sugestoesPorPalavra.elas = sugestoesPorPalavra.eles;
sugestoesPorPalavra.aquilo = sugestoesPorPalavra.isso;


// ======================================================
// SUGESTÕES GENÉRICAS
// ======================================================

const sugestoesGenericas = [
    "quero",
    "preciso",
    "por favor",
    "ajuda",
    "agora",
    "mais",
    "de novo",
    "está bem",
    "não entendi",
    "obrigado"
];
// ======================================================
// CONFIGURAÇÃO DOS ANÉIS
// ======================================================

const aneis = [
    {
        elemento: document.getElementById("anelMeio"),
        quantidade: 9,
        teclas: [],
        palavras: palavrasChave,
        raio: 72,
        temBuraco: true
    },

    {
        elemento: document.getElementById("anelExterno"),
        quantidade: 10,
        teclas: [],
        palavras: [],
        raio: 80,
        temBuraco: false
    }
];


// ======================================================
// ESTADOS DO TECLADO
// ======================================================

let teclaAtiva = null;
let direcaoAtiva = "cima";
let sugestoesVisiveis = false;

// Índice do anel atualmente selecionado
let anelAtualIndice = 0;

// Posição da tecla atualmente selecionada
let posicaoAtualIndice = 0;

// Zona atualmente controlada pelo joystick
// Pode ser:
// "teclado"
// "menu"
let zonaAtual = "teclado";

// Identificador da última solicitação de sugestões.
// Evita que uma resposta antiga da API substitua
// sugestões mais novas.
let idSolicitacaoSugestao = 0;


// ======================================================
// NORMALIZAÇÃO DE PALAVRAS
// ======================================================

function normalizarPalavra(texto) {
    return String(texto || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
}


// ======================================================
// DESCOBRIR A ÚLTIMA PALAVRA DA FRASE
// ======================================================

function palavraAtual() {
    const palavras = valor.textContent
        .trim()
        .split(/\s+/)
        .filter(Boolean);

    return normalizarPalavra(
        palavras.at(-1) || ""
    );
}


// ======================================================
// PREENCHER LISTA ATÉ A QUANTIDADE NECESSÁRIA
// ======================================================

function preencherAte(palavras, quantidade, reserva) {
    const resultado = [...palavras];

    reserva.forEach((palavra) => {
        if (
            resultado.length < quantidade &&
            !resultado.includes(palavra)
        ) {
            resultado.push(palavra);
        }
    });

    return resultado.slice(0, quantidade);
}


// ======================================================
// ATUALIZAR TEXTO DAS TECLAS
// ======================================================

function atualizarTextoDasTeclas(anel, palavras) {
    if (!anel || !anel.teclas) return;

    anel.palavras = palavras;

    anel.teclas.forEach((tecla, indice) => {
        const texto = palavras[indice] || "";

        tecla.textContent = texto;
        tecla.dataset.valor = texto;

        tecla.setAttribute(
            "aria-label",
            texto
                ? `Sugestão: ${texto}`
                : "Tecla vazia"
        );
    });
}


// ======================================================
// INTEGRAÇÕES EXTERNAS
// ======================================================

// Se você estiver usando um proxy próprio,
// coloque a URL em OPENAI_PROXY_URL.
//
// Se estiver usando a API diretamente,
// coloque sua chave em OPENAI_API_KEY.
//
// IMPORTANTE:
// não coloque uma chave real da OpenAI em um site
// público, pois ela ficará visível no navegador.

const OPENAI_API_KEY = "";

const OPENAI_PROXY_URL = "";

const OPENAI_MODELO = "gpt-4o-mini";


// ======================================================
// LANGUAGETOOL
// ======================================================

const LANGUAGETOOL_URL =
    "https://api.languagetool.org/v2/check";

const LANGUAGETOOL_IDIOMA =
    "pt-BR";


// ======================================================
// SUGESTÕES COM OPENAI
// ======================================================

async function sugerirComOpenAI(frase) {

    if (!OPENAI_PROXY_URL && !OPENAI_API_KEY) {
        return null;
    }

    try {

        const corpoBase = {

            model: OPENAI_MODELO,

            temperature: 0.7,

            messages: [

                {
                    role: "system",

                    content:
                        "Você ajuda um teclado de comunicação alternativa " +
                        "(AAC) em português do Brasil. " +
                        "Dada uma frase incompleta, sugira até 10 palavras " +
                        "ou expressões curtas (1 a 3 palavras) para continuar " +
                        "a frase de forma natural. " +
                        "Responda SOMENTE com um array JSON de strings."
                },

                {
                    role: "user",

                    content:
                        frase ||
                        "(frase vazia, sugira palavras para começar uma frase)"
                }
            ]
        };


        const url =
            OPENAI_PROXY_URL ||
            "https://api.openai.com/v1/chat/completions";


        const cabecalhos = {
            "Content-Type": "application/json"
        };


        if (!OPENAI_PROXY_URL && OPENAI_API_KEY) {

            cabecalhos.Authorization =
                `Bearer ${OPENAI_API_KEY}`;
        }


        const resposta = await fetch(
            url,
            {
                method: "POST",

                headers: cabecalhos,

                body: JSON.stringify(corpoBase)
            }
        );


        if (!resposta.ok) {

            console.warn(
                "OpenAI retornou HTTP",
                resposta.status
            );

            return null;
        }


        const dados = await resposta.json();


        const conteudo =
            dados?.choices?.[0]?.message?.content;


        if (typeof conteudo !== "string") {
            return null;
        }


        // Remove possíveis blocos Markdown:
        // ```json
        // [...]
        // ```

        const texto = conteudo
            .trim()
            .replace(/^```json\s*/i, "")
            .replace(/^```\s*/i, "")
            .replace(/\s*```$/i, "")
            .trim();


        const lista = JSON.parse(texto);


        if (!Array.isArray(lista)) {
            return null;
        }


        return lista
            .filter(
                (item) =>
                    typeof item === "string" &&
                    item.trim()
            )
            .map(
                (item) =>
                    item.trim()
            )
            .slice(0, 10);

    } catch (erro) {

        console.warn(
            "Não foi possível buscar sugestões da OpenAI:",
            erro
        );

        return null;
    }
}


// ======================================================
// CORREÇÃO AUTOMÁTICA COM LANGUAGETOOL
// ======================================================

async function corrigirComLanguageTool(texto) {

    const textoLimpo =
        String(texto || "").trim();


    if (!textoLimpo) {
        return "";
    }


    try {

        const corpo =
            new URLSearchParams({

                text: textoLimpo,

                language:
                    LANGUAGETOOL_IDIOMA
            });


        const resposta =
            await fetch(

                LANGUAGETOOL_URL,

                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/x-www-form-urlencoded"
                    },

                    body:
                        corpo.toString()
                }
            );


        if (!resposta.ok) {

            console.warn(
                "LanguageTool retornou HTTP",
                resposta.status
            );

            return textoLimpo;
        }


        const dados =
            await resposta.json();


        let corrigido =
            textoLimpo;


        const erros =
            [...(dados.matches || [])]
                .filter(

                    (erro) =>

                        Number.isInteger(
                            erro.offset
                        ) &&

                        Number.isInteger(
                            erro.length
                        ) &&

                        erro.offset >= 0 &&

                        erro.length >= 0 &&

                        erro.offset +
                        erro.length <=
                        corrigido.length
                )
                .sort(
                    (a, b) =>
                        b.offset -
                        a.offset
                );


        erros.forEach(
            (erro) => {

                const sugestao =
                    erro.replacements?.[0]?.value;


                if (
                    typeof sugestao ===
                    "string"
                ) {

                    corrigido =
                        corrigido.slice(
                            0,
                            erro.offset
                        ) +

                        sugestao +

                        corrigido.slice(
                            erro.offset +
                            erro.length
                        );
                }
            }
        );


        return corrigido;


    } catch (erro) {

        console.warn(
            "Não foi possível corrigir o texto com o LanguageTool:",
            erro
        );

        return textoLimpo;
    }
}
// ======================================================
// ATUALIZAR ARGOLA DE PALAVRAS-CHAVE
// ======================================================

function atualizarAnelPalavrasChave() {
    atualizarTextoDasTeclas(
        aneis[0],
        palavrasChave
    );
}


// ======================================================
// ATUALIZAR SUGESTÕES DA ARGOLA EXTERNA
// ======================================================

function atualizarSugestoesNoAnel(indiceAnel) {

    const anel = aneis[indiceAnel];

    if (!anel) return;


    // A argola interna possui somente as palavras-chave.
    if (indiceAnel === 0) {

        atualizarAnelPalavrasChave();

        return;
    }


    // A argola externa só pode aparecer
    // quando estiver habilitada.
    if (!sugestoesVisiveis) return;


    const frase =
        valor.textContent.trim();


    const base =
        sugestoesPorPalavra[palavraAtual()] ||
        sugestoesGenericas;


    const completas =
        preencherAte(
            base,
            anel.quantidade,
            frasesRapidas.concat(
                palavrasChave
            )
        );


    // Mostra primeiro as sugestões locais.
    atualizarTextoDasTeclas(
        anel,
        completas
    );


    // Cria um ID para esta requisição.
    const idAtual =
        ++idSolicitacaoSugestao;


    // Depois tenta melhorar as sugestões usando IA.
    sugerirComOpenAI(frase)
        .then((sugestoesIA) => {

            // Se outra solicitação já começou,
            // ignora esta resposta antiga.
            if (
                idAtual !==
                idSolicitacaoSugestao
            ) {
                return;
            }


            if (
                sugestoesIA?.length
            ) {

                atualizarTextoDasTeclas(

                    anel,

                    preencherAte(
                        sugestoesIA,
                        anel.quantidade,
                        completas
                    )
                );
            }
        });
}


// ======================================================
// EMBARALHAR LISTA
// ======================================================

function embaralhar(lista) {

    const copia =
        [...lista];


    for (
        let i = copia.length - 1;
        i > 0;
        i -= 1
    ) {

        const j =
            Math.floor(
                Math.random() *
                (i + 1)
            );


        [
            copia[i],
            copia[j]
        ] = [
            copia[j],
            copia[i]
        ];
    }


    return copia;
}


// ======================================================
// RECARREGAR SUGESTÕES
// ======================================================

async function recarregarSugestoes() {

    const indiceAnel =
        anelAtualIndice;


    // A argola externa não pode
    // ser recarregada se estiver escondida.
    if (
        indiceAnel === 1 &&
        !sugestoesVisiveis
    ) {
        return;
    }


    const anel =
        aneis[indiceAnel];


    if (!anel) return;


    const frase =
        valor.textContent.trim();


    // Estado inicial:
    // mostra somente palavras-chave
    // e saudações.
    if (
        indiceAnel === 0 &&
        !frase
    ) {

        atualizarTextoDasTeclas(

            anel,

            embaralhar(
                opcoesArgolaInicial
            ).slice(
                0,
                anel.quantidade
            )
        );

        return;
    }


    // Tenta primeiro sugestões diferentes
    // usando a IA.
    const sugestoesIA =
        await sugerirComOpenAI(

            `${frase} ` +
            `(sugira opções diferentes das mais óbvias)`
        );


    if (
        sugestoesIA?.length
    ) {

        atualizarTextoDasTeclas(

            anel,

            preencherAte(

                sugestoesIA,

                anel.quantidade,

                frasesRapidas.concat(
                    palavrasChave
                )
            )
        );

        return;
    }


    // Caso a IA não esteja disponível,
    // utiliza as sugestões locais.
    const base =
        sugestoesPorPalavra[
            palavraAtual()
        ] ||
        sugestoesGenericas;


    const baseEmbaralhada =
        embaralhar(base);


    const extras =
        embaralhar(

            frasesRapidas
                .concat(palavrasChave)
                .filter(
                    (palavra) =>
                        !base.includes(
                            palavra
                        )
                )
        );


    const novaLista =
        preencherAte(

            baseEmbaralhada,

            anel.quantidade,

            extras
        );


    atualizarTextoDasTeclas(
        anel,
        novaLista
    );
}


// ======================================================
// VOLTAR À CONFIGURAÇÃO INICIAL
// ======================================================

function voltarConfiguracaoInicial() {

    atualizarAnelPalavrasChave();

    esconderAnelSugestoes();


    anelAtualIndice = 0;

    posicaoAtualIndice = 0;

    zonaAtual = "teclado";


    focarTecla(
        0,
        0
    );
}


// ======================================================
// MOSTRAR ARGOLA DE SUGESTÕES
// ======================================================

function mostrarAnelSugestoes() {

    sugestoesVisiveis = true;

    aneis[1]
        .elemento
        .classList
        .add("visivel");
}


// ======================================================
// ESCONDER ARGOLA DE SUGESTÕES
// ======================================================

function esconderAnelSugestoes() {

    sugestoesVisiveis = false;


    aneis[1]
        .elemento
        .classList
        .remove("visivel");


    if (aneis[1].cunha) {

        aneis[1]
            .cunha
            .classList
            .remove("ativa");
    }


    aneis[1]
        .teclas
        .forEach(
            (tecla) => {
                tecla.tabIndex = -1;
            }
        );
}


// ======================================================
// ADICIONAR PALAVRA À FRASE
// ======================================================

function adicionarPalavra(texto) {

    if (!texto) return;


    const fraseAtual =
        valor.textContent.trim();


    valor.textContent =
        `${fraseAtual} ${texto}`.trim();
}


// ======================================================
// SELECIONAR UMA PALAVRA
// ======================================================

function selecionarPalavra(tecla) {

    if (
        !tecla?.dataset?.valor
    ) {
        return;
    }


    const anelOrigem =
        anelAtualIndice;


    adicionarPalavra(
        tecla.dataset.valor
    );


    // Se estava na argola interna,
    // vai para a argola externa.
    //
    // Se estava na externa,
    // volta para a interna.
    const anelDestino =
        anelOrigem === 0
            ? 1
            : 0;


    if (
        anelDestino === 1 &&
        !sugestoesVisiveis
    ) {

        mostrarAnelSugestoes();
    }


    atualizarSugestoesNoAnel(
        anelDestino
    );


    anelAtualIndice =
        anelDestino;


    posicaoAtualIndice = 0;


    focarTecla(
        anelDestino,
        0
    );
}


// ======================================================
// CONVERTER ÂNGULO EM DIREÇÃO
// ======================================================

function direcaoDoAngulo(angulo) {

    const x =
        Math.cos(
            angulo *
            Math.PI /
            180
        );


    const y =
        Math.sin(
            angulo *
            Math.PI /
            180
        );


    if (
        Math.abs(x) >=
        Math.abs(y)
    ) {

        return x >= 0
            ? "direita"
            : "esquerda";
    }


    return y >= 0
        ? "baixo"
        : "cima";
}


// ======================================================
// MOSTRAR CUNHA DE SELEÇÃO
// ======================================================

function mostrarCunha(
    anel,
    posicao
) {

    const abertura =
        360 /
        anel.quantidade;


    const inicio =
        posicao *
        abertura -
        abertura / 2;


    aneis.forEach(
        (outroAnel) => {

            if (
                outroAnel.cunha
            ) {

                outroAnel
                    .cunha
                    .classList
                    .remove("ativa");
            }
        }
    );


    if (!anel.cunha) return;


    anel.cunha.style.background =
        `conic-gradient(
            from ${inicio}deg,
            rgb(140 140 140 / 82%) 0deg ${abertura}deg,
            transparent ${abertura}deg 360deg
        )`;


    anel.cunha
        .classList
        .add("ativa");
}


// ======================================================
// SELECIONAR TECLA
// ======================================================

function selecionarTecla(
    tecla,
    anel,
    posicao
) {

    if (!tecla || !anel) {
        return;
    }


    teclaAtiva =
        tecla;


    direcaoAtiva =
        tecla.dataset.direcao ||
        "cima";


    anelAtualIndice =
        aneis.indexOf(anel);


    posicaoAtualIndice =
        posicao;


    menuOrbital.dataset.direcao =
        direcaoAtiva;


    menuOrbital.classList.add(
        "ativo"
    );


    mostrarCunha(
        anel,
        posicao
    );
}


// ======================================================
// COLOCAR FOCO EM UMA TECLA
// ======================================================

function focarTecla(
    anelDestino,
    posicaoDestino
) {

    if (
        anelDestino === 1 &&
        !sugestoesVisiveis
    ) {
        return;
    }


    const anel =
        aneis[anelDestino];


    if (!anel) return;


    aneis.forEach(
        (outroAnel) => {

            outroAnel.teclas.forEach(
                (tecla) => {

                    tecla.tabIndex = -1;
                }
            );
        }
    );


    const proximaTecla =
        anel.teclas[
            posicaoDestino
        ];


    if (!proximaTecla) {
        return;
    }


    proximaTecla.tabIndex = 0;

    proximaTecla.focus();


    // Sempre que uma tecla do teclado
    // recebe foco, a zona volta para teclado.
    zonaAtual = "teclado";
}


// ======================================================
// PRIMEIRO BOTÃO DO MENU
// ======================================================

function focarPrimeiroBotaoDoMenu() {

    if (
        botoesMenu.length > 0
    ) {

        botoesMenu[0].focus();
    }
}
// ======================================================
// NAVEGAÇÃO DENTRO DO MENU SUPERIOR
// ======================================================

function moverNoMenu(
    evento,
    indiceAtual
) {

    const direcaoMenu =
        menuOrbital.dataset.direcao ||
        "direita";


    // Define qual seta retorna ao teclado.
    const teclaVoltar = {

        direita: "ArrowDown",

        esquerda: "ArrowDown",

        cima: "ArrowDown",

        baixo: "ArrowUp"

    }[direcaoMenu];


    // ----------------------------------------------
    // VOLTAR PARA O TECLADO
    // ----------------------------------------------

    if (
        evento.key ===
        teclaVoltar
    ) {

        evento.preventDefault();

        zonaAtual = "teclado";


        focarTecla(
            anelAtualIndice,
            posicaoAtualIndice
        );

        return;
    }


    // ----------------------------------------------
    // NAVEGAR ENTRE OS BOTÕES DO MENU
    // ----------------------------------------------

    const avancar =
        [
            "ArrowRight",
            "ArrowDown"
        ].includes(
            evento.key
        );


    const retroceder =
        [
            "ArrowLeft",
            "ArrowUp"
        ].includes(
            evento.key
        );


    if (
        !avancar &&
        !retroceder
    ) {
        return;
    }


    evento.preventDefault();


    const passo =
        avancar
            ? 1
            : -1;


    const proximoIndice =
        (
            indiceAtual +
            passo +
            botoesMenu.length
        ) %
        botoesMenu.length;


    botoesMenu[
        proximoIndice
    ].focus();
}


// ======================================================
// NAVEGAÇÃO PRINCIPAL
// TECLADO FÍSICO / JOYSTICK
// ======================================================

document.addEventListener(
    "keydown",
    (evento) => {

        // ==========================================
        // TAB:
        // alterna entre teclado e menu
        // ==========================================

        if (
            evento.key === "Tab"
        ) {

            evento.preventDefault();


            if (
                zonaAtual ===
                "teclado"
            ) {

                zonaAtual = "menu";

                focarPrimeiroBotaoDoMenu();

            } else {

                zonaAtual = "teclado";

                focarTecla(
                    anelAtualIndice,
                    posicaoAtualIndice
                );
            }


            return;
        }


        // ==========================================
        // SE ESTIVER NO MENU
        // ==========================================

        if (
            zonaAtual ===
            "menu"
        ) {

            const indiceAtual =
                botoesMenu.indexOf(
                    document.activeElement
                );


            if (
                indiceAtual === -1
            ) {

                focarPrimeiroBotaoDoMenu();

                return;
            }


            moverNoMenu(
                evento,
                indiceAtual
            );

            return;
        }


        // ==========================================
        // A PARTIR DAQUI:
        // ZONA DO TECLADO
        // ==========================================


        // ENTER ou ESPAÇO selecionam
        // a tecla atualmente focada.

        if (
            [
                "Enter",
                " "
            ].includes(
                evento.key
            )
        ) {

            evento.preventDefault();


            const anel =
                aneis[
                    anelAtualIndice
                ];


            const tecla =
                anel?.teclas?.[
                    posicaoAtualIndice
                ];


            if (tecla) {

                selecionarPalavra(
                    tecla
                );
            }


            return;
        }


        const anelAtual =
            aneis[
                anelAtualIndice
            ];


        if (!anelAtual) {
            return;
        }


        let proximoAnel =
            anelAtualIndice;


        let proximaPosicao =
            posicaoAtualIndice;


        // ==========================================
        // SETAS
        // ==========================================

        switch (
            evento.key
        ) {

            // --------------------------------------
            // ESQUERDA
            // --------------------------------------

            case "ArrowLeft":

                proximaPosicao =
                    (
                        posicaoAtualIndice +
                        anelAtual.quantidade -
                        1
                    ) %
                    anelAtual.quantidade;

                break;


            // --------------------------------------
            // DIREITA
            // --------------------------------------

            case "ArrowRight":

                proximaPosicao =
                    (
                        posicaoAtualIndice +
                        1
                    ) %
                    anelAtual.quantidade;

                break;


            // --------------------------------------
            // CIMA
            // --------------------------------------

            case "ArrowUp":

                // Da argola externa para a interna
                if (
                    anelAtualIndice === 1
                ) {

                    proximoAnel = 0;


                    proximaPosicao =
                        Math.round(
                            (
                                posicaoAtualIndice /
                                anelAtual.quantidade
                            ) *
                            aneis[0].quantidade
                        ) %
                        aneis[0].quantidade;

                }

                // Da argola interna para o menu
                else if (
                    anelAtualIndice === 0
                ) {

                    evento.preventDefault();

                    zonaAtual = "menu";

                    focarPrimeiroBotaoDoMenu();

                    return;
                }

                break;


            // --------------------------------------
            // BAIXO
            // --------------------------------------

            case "ArrowDown":

                // Da argola interna para a externa
                if (
                    anelAtualIndice === 0 &&
                    sugestoesVisiveis
                ) {

                    proximoAnel = 1;


                    proximaPosicao =
                        Math.round(
                            (
                                posicaoAtualIndice /
                                anelAtual.quantidade
                            ) *
                            aneis[1].quantidade
                        ) %
                        aneis[1].quantidade;
                }

                break;


            default:

                return;
        }


        // Não entra na argola externa
        // se ela estiver escondida.
        if (
            proximoAnel === 1 &&
            !sugestoesVisiveis
        ) {

            return;
        }


        evento.preventDefault();


        if (
            proximoAnel !==
                anelAtualIndice ||
            proximaPosicao !==
                posicaoAtualIndice
        ) {

            anelAtualIndice =
                proximoAnel;


            posicaoAtualIndice =
                proximaPosicao;


            focarTecla(
                proximoAnel,
                proximaPosicao
            );
        }
    }
);


// ======================================================
// CONSTRUÇÃO DAS TECLAS CIRCULARES
// ======================================================

aneis.forEach(
    (anel, indiceAnel) => {

        if (!anel.elemento) {
            return;
        }


        // ------------------------------------------
        // CUNHA DE SELEÇÃO
        // ------------------------------------------

        const cunha =
            document.createElement(
                "div"
            );


        cunha.className =
            "cunha";


        anel.elemento.appendChild(
            cunha
        );


        anel.cunha =
            cunha;


        // ------------------------------------------
        // BURACO CENTRAL
        // ------------------------------------------

        if (
            anel.temBuraco
        ) {

            const buraco =
                document.createElement(
                    "div"
                );


            buraco.className =
                "buraco-central";


            anel.elemento.appendChild(
                buraco
            );
        }


        // ------------------------------------------
        // CRIAR CADA TECLA
        // ------------------------------------------

        for (
            let posicao = 0;
            posicao < anel.quantidade;
            posicao += 1
        ) {

            const tecla =
                document.createElement(
                    "button"
                );


            // Começa no topo.
            const angulo =
                (
                    posicao /
                    anel.quantidade
                ) *
                360 -
                90;


            const x =
                50 +
                Math.cos(
                    angulo *
                    Math.PI /
                    180
                ) *
                anel.raio *
                0.5;


            const y =
                50 +
                Math.sin(
                    angulo *
                    Math.PI /
                    180
                ) *
                anel.raio *
                0.5;


            tecla.className =
                "tecla";


            tecla.type =
                "button";


            // Somente a primeira tecla
            // da primeira argola começa com foco.
            tecla.tabIndex =
                (
                    posicao === 0 &&
                    indiceAnel === 0
                )
                    ? 0
                    : -1;


            tecla.dataset.direcao =
                direcaoDoAngulo(
                    angulo
                );


            tecla.style.left =
                `${x}%`;


            tecla.style.top =
                `${y}%`;


            tecla.style.transform =
                "translate(-50%, -50%)";


            // --------------------------------------
            // CLIQUE
            // --------------------------------------

            tecla.addEventListener(
                "click",
                () => {

                    selecionarPalavra(
                        tecla
                    );
                }
            );


            // --------------------------------------
            // MOUSE
            // --------------------------------------

            tecla.addEventListener(
                "mouseenter",
                () => {

                    selecionarTecla(
                        tecla,
                        anel,
                        posicao
                    );
                }
            );


            // --------------------------------------
            // FOCO
            // --------------------------------------

            tecla.addEventListener(
                "focus",
                () => {

                    selecionarTecla(
                        tecla,
                        anel,
                        posicao
                    );
                }
            );


            anel.teclas.push(
                tecla
            );


            anel.elemento.appendChild(
                tecla
            );
        }
    }
);


// ======================================================
// CONFIGURAÇÃO DOS BOTÕES DO MENU
// ======================================================

botoesMenu.forEach(
    (botao, indice) => {

        botao.tabIndex = 0;


        botao.addEventListener(
            "keydown",
            (evento) => {

                moverNoMenu(
                    evento,
                    indice
                );
            }
        );


        // Quando um botão do menu
        // recebe foco, muda a zona.
        botao.addEventListener(
            "focus",
            () => {

                zonaAtual =
                    "menu";
            }
        );
    }
);


// ======================================================
// BOTÃO LIMPAR
// ======================================================

document
    .getElementById("limpar")
    ?.addEventListener(
        "click",
        () => {

            valor.textContent =
                "";

            voltarConfiguracaoInicial();
        }
    );


// ======================================================
// BOTÃO EXCLUIR
// ======================================================

document
    .getElementById("excluir")
    ?.addEventListener(
        "click",
        () => {

            const palavras =
                valor.textContent
                    .trim()
                    .split(/\s+/)
                    .filter(Boolean);


            palavras.pop();


            valor.textContent =
                palavras.join(" ");


            if (
                palavras.length === 0
            ) {

                voltarConfiguracaoInicial();

            } else {

                atualizarSugestoesNoAnel(
                    anelAtualIndice
                );
            }
        }
    );


// ======================================================
// BOTÃO RECARREGAR
// ======================================================

document
    .getElementById("recarregar")
    ?.addEventListener(
        "click",
        () => {

            recarregarSugestoes();
        }
    );


// ======================================================
// BOTÃO VOLTAR AO INÍCIO
// ======================================================

document
    .getElementById("voltarInicio")
    ?.addEventListener(
        "click",
        () => {

            voltarConfiguracaoInicial();
        }
    );


// ======================================================
// LEITURA DA FRASE
// ======================================================

function falarFrase() {

    const texto =
        valor.textContent.trim();


    if (!texto) {
        return;
    }


    if (
        !("speechSynthesis" in window)
    ) {

        alert(
            "Este navegador não tem suporte a leitura por voz."
        );

        return;
    }


    const fala =
        new SpeechSynthesisUtterance(
            texto
        );


    fala.lang =
        "pt-BR";


    speechSynthesis.cancel();

    speechSynthesis.speak(
        fala
    );
}


// ======================================================
// BOTÃO FALAR
// ======================================================

document
    .getElementById("falar")
    ?.addEventListener(
        "click",
        falarFrase
    );


// ======================================================
// BOTÃO CONCLUIR
// CORREÇÃO AUTOMÁTICA
// ======================================================

document
    .getElementById("concluir")
    ?.addEventListener(
        "click",
        async () => {

            const textoOriginal =
                valor.textContent.trim();


            // Se não houver frase,
            // apenas volta ao início.
            if (!textoOriginal) {

                voltarConfiguracaoInicial();

                return;
            }


            // Corrige automaticamente
            // usando o LanguageTool.
            const textoCorrigido =
                await corrigirComLanguageTool(
                    textoOriginal
                );


            // Atualiza o texto exibido.
            valor.textContent =
                textoCorrigido;


            console.log(
                "Frase formada:",
                textoCorrigido
            );


            // Volta o teclado ao estado inicial.
            voltarConfiguracaoInicial();
        }
    );


// ======================================================
// INICIALIZAÇÃO
// ======================================================

// Preenche a argola interna.
atualizarAnelPalavrasChave();


// ======================================================
// FOCO INICIAL
// ======================================================

function focarInicio() {

    const primeiraTecla =
        aneis[0]?.teclas?.[0];


    if (
        primeiraTecla
    ) {

        primeiraTecla.focus();
    }
}


// Executa imediatamente.
focarInicio();


// Executa novamente quando a página terminar
// de carregar.
window.addEventListener(
    "load",
    focarInicio
);


// Garante o foco inicial após
// a primeira interação do usuário.
document.addEventListener(
    "pointerdown",
    focarInicio,
    {
        capture: true,
        once: true
    }
);