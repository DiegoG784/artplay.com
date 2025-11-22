// Dados dos professores (ok, sem alteração)
console.log("SCRIPT.JS CARREGADO COM SUCESSO!");
const professores = {
1: { nome: "Yasmin", img: "prof1.png", desc: "Professora de violino." },
2: { nome: "Felipe", img: "prof2.png", desc: "Especialista em violão e harmonia." },
3: { nome: "Rogério", img: "prof3.png", desc: "Professor de cordas." },
4: { nome: "Matheus", img: "prof4.png", desc: "Professor de piano." },
5: { nome: "Leonardo", img: "prof5.png", desc: "Professor de guitarra." },
6: { nome: "Milena", img: "prof6.png", desc: "Professora de Canto e Teclado"}
};

// Objeto de áudios pré-carregados (usando MP3)
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
        
        // Se o áudio existir (boa prática de segurança)
        if (audio) {
            audio.currentTime = 0; 
            audio.play().catch(e => console.error("Erro ao tocar áudio:", e));
        }


const prof = professores[nota.dataset.prof];
document.getElementById("prof-img").src = prof.img;
document.getElementById("prof-nome").textContent = prof.nome;
document.getElementById("prof-desc").textContent = prof.desc;


document.getElementById("professor-card").classList.remove("escondido");
});
});

document.addEventListener('DOMContentLoaded', () => {
    // 1. Selecionar elementos
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
            profDesc.textContent = prof.desc;
            profImg.src = prof.img; // Carrega a imagem do professor
        }
    }

    function tocarNota(nota) {
        const nomeNota = nota.dataset.note;
        const audio = sons[nomeNota];

        if (audio) {
            audio.currentTime = 0; // Reinicia o áudio
            audio.play().catch(e => console.error("Erro ao tocar áudio:", e));
        }

        // Feedback Visual
        nota.classList.add('tocado');
        setTimeout(() => {
            nota.classList.remove('tocado');
        }, 150); // Duração do destaque
    }

    function toggleCard(nota, profId) {
        const isSameProf = currentOpenProf === profId;

        tocarNota(nota); // Toca o som em qualquer clique

        if (cardProfessor.classList.contains('escondido')) {
            // Se o card está escondido, mostra o card e carrega o professor
            carregarDadosProfessor(profId);
            cardProfessor.classList.remove('escondido');
            currentOpenProf = profId;

        } else if (isSameProf) {
            // Se o card está aberto E é o mesmo professor, fecha
            cardProfessor.classList.add('escondido');
            currentOpenProf = null;

        } else {
            // Se o card está aberto, mas é outro professor, troca o conteúdo
            carregarDadosProfessor(profId); 
            currentOpenProf = profId;
        }
    }

    // 4. Adicionar o ouvinte de evento (event listener) a cada nota
    notas.forEach(nota => {
        nota.addEventListener('click', (event) => {
            event.stopPropagation(); // Impede o fechamento imediato do card (UX)
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


