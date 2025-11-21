// Dados dos professores
const professores = {
    1: { nome: "Yasmin", img: "prof1.png", desc: "Professora de violino." },
    2: { nome: "Felipe", img: "prof2.png", desc: "Especialista em violão e harmonia." },
    3: { nome: "Rogério", img: "prof3.png", desc: "Professor de cordas." },
    4: { nome: "Matheus", img: "prof4.png", desc: "Professor de piano." },
    5: { nome: "Leonardo", img: "prof5.png", desc: "Professor de guitarra." }
};

const sons = {
    "C4": new Audio("sons/C4.mp3"),
    "D4": new Audio("sons/D4.mp3"),
    "E4": new Audio("sons/E4.mp3"),
    "F4": new Audio("sons/F4.mp3"),
    "G4": new Audio("sons/G4.mp3")
};

document.querySelectorAll(".nota").forEach(nota => {
    nota.addEventListener("click", () => {
        const nomeNota = nota.dataset.note;

        const audio = new Audio(`sons/${nomeNota}.mp3`);
        audio.play();


        // Pegando professor correspondente
        const prof = professores[nota.dataset.prof];
        document.getElementById("prof-img").src = prof.img;
        document.getElementById("prof-nome").textContent = prof.nome;
        document.getElementById("prof-desc").textContent = prof.desc;

        // Mostrar card
        document.getElementById("professor-card").classList.remove("escondido");
    });
});
