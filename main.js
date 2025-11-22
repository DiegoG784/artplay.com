console.log("SCRIPT.JS CARREGADO COM SUCESSO!");
const professores = {
1: { nome: "Yasmin", img: "prof1.png", desc: "Professora de violino." },
2: { nome: "Felipe Pimentel", img: "prof2.png", desc: "Nascido em Osasco (SP) em 1986, é músico e professor de violão e guitarra. Formado no curso livre de Guitarra do Conservatório Vila Mariana em 2012, também estudou no Conservatório Heitor Villa-Lobos, no IGT (Instituto de Guitarra e Tecnologia) e com diversos professores particulares ao longo de sua trajetória.<br>Leciona violão e guitarra desde 2008, passando por diversas escolas de música em São Paulo. É fundador e professor da Artplay Música, onde atua atualmente, unindo experiência, didática moderna e dedicação à formação de novos músicos." },
3: { nome: "Rogério", img: "prof3.png", desc: "Professor de cordas." },
4: { nome: "Matheus Novaes", img: "prof4.png", desc: "Matheus Novaes é pianista, tecladista, produtor e arranjador, com mais de 15 anos de experiência em aulas particulares, workshops, seminários e masterclasses. Também atua como diretor musical, arranjador e produtor de trilhas sonoras, com trabalhos no Bless Studio, Igreja Renascer Moema, Estúdio Belas Artes e na Igreja Evangélica OBPC, onde segue como músico e diretor musical.<br> Ao longo de sua trajetória, colaborou com diversos artistas e bandas dos cenários gospel e secular, incluindo Robson Nascimento, Célia Cipriano (Fat Family), Alexandre (Templo Soul), Sergio Mello (Ebony Voices), Paulo Cremona (Ídolos), Friends & Jazz (ULM), Quarteto Diminueto (Festival de Música Brasileira - Argentina), Fábio Cadore, Oscar Puebla (Universidade de Cuyo - Argentina), Marcelo Aguiar, Julliard Jazz Ensemble (EUA), Clóvis Pinho, Renascer Praise, Maurílio Santos e Bishop S.Y. Younger (Ramp International Church)."},
5: { nome: "Leonardo", img: "prof5.png", desc: "Professor de guitarra." },
6: { nome: "Milena Moraes", img: "prof6.png", desc: "Milena Moraes é professora de Técnica Vocal e Teclado/Piano, nascida em São Paulo em1977. Formada em Pedagogia Vocal pela Ensinando Canto – Camila Zaponi, segue ampliando sua formação em Licenciatura em Música pela Uninter e em Teclado pela Jahn Sohein e Instituto Pimentel.<br> Atua como docente na Escola de Música Art Play, Asset - Educar para Transformar, Trio Teachers, além de ministrar aulas particulares. Reconhecida por sua abordagem sensível e técnica, Milena desenvolve um trabalho voltado ao aprendizado consistente, seguro e musicalmente expressivo."}
};

const sons = {
"F4": new Audio("sons/F4.mp3"),
"D4": new Audio("sons/D4.mp3"),
"B4": new Audio("sons/B4.mp3"),
"G4": new Audio("sons/G4.mp3"),
"E4": new Audio("sons/E4.mp3"),
"C3": new Audio("sons/C3.mp3")
};

document.querySelectorAll(".nota").forEach(nota => {
nota.addEventListener("click", () => {
const nomeNota = nota.dataset.note;


const audio = sons[nomeNota];
        
        if (audio) {
            audio.currentTime = 0; 
            audio.play().catch(e => console.error("Erro ao tocar áudio:", e));
        }


const prof = professores[nota.dataset.prof];
document.getElementById("prof-img").src = prof.img;
document.getElementById("prof-nome").textContent = prof.nome;
document.getElementById("prof-desc").innerHTML = prof.desc;


document.getElementById("professor-card").classList.remove("escondido");
});
});

document.addEventListener('DOMContentLoaded', () => {
    const notas = document.querySelectorAll('.nota');
    console.log("Número de notas encontradas:", notas.length);
        if (notas.length === 0) {
            console.error("Nenhuma nota encontrada. Verifique se as notas têm a classe 'nota' no HTML.");
        }
    
    const cardProfessor = document.getElementById('professor-card');
    const profImg = document.getElementById('prof-img');
    const profNome = document.getElementById('prof-nome');
    const profDesc = document.getElementById('prof-desc');

    let currentOpenProf = null;

    function carregarDadosProfessor(profId) {
        const prof = professores[profId];
        
        if (prof) {
            profNome.textContent = prof.nome;
            profDesc.innerHTML = prof.desc;
            profImg.src = prof.img;
        }
    }

    function tocarNota(nota) {
        const nomeNota = nota.dataset.note;
        const audio = sons[nomeNota];

        if (audio) {
            audio.currentTime = 0; // Reinicia o áudio
            audio.play().catch(e => console.error("Erro ao tocar áudio:", e));
        }

        nota.classList.add('tocado');
        setTimeout(() => {
            nota.classList.remove('tocado');
        }, 150);
    }

    function toggleCard(nota, profId) {
        const isSameProf = currentOpenProf === profId;

        tocarNota(nota);

        if (cardProfessor.classList.contains('escondido')) {
            carregarDadosProfessor(profId);
            cardProfessor.classList.remove('escondido');
            currentOpenProf = profId;

        } else if (isSameProf) {
            cardProfessor.classList.add('escondido');
            currentOpenProf = null;

        } else {
            carregarDadosProfessor(profId); 
            currentOpenProf = profId;
        }
    }

    notas.forEach(nota => {
        nota.addEventListener('click', (event) => {
            event.stopPropagation();
            const profId = nota.dataset.prof; 
            toggleCard(nota, profId);
        });
    });

    document.addEventListener("click", (event) => {
        // Verifica se o clique NÃO foi dentro do card E NÃO foi em uma nota
        const isClickInsideCard = cardProfessor.contains(event.target);
        const isClickOnNote = event.target.classList.contains('nota');

        if (!isClickInsideCard && !isClickOnNote) {
            cardProfessor.classList.add("escondido");
            currentOpenProf = null; // Reseta o professor aberto
        }
    });

    cardProfessor.addEventListener("click", (event) => {
        event.stopPropagation();
    });
});
    var calendar = new Calendar(calendarEl, {
    windowResize: function(arg) {
    alert('The calendar has adjusted to a window resize. Current view: ' + arg.view.type);
    }
    });
    
 

