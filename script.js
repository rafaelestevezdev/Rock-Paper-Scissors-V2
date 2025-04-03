// Referencias a elementos del DOM para actualizar puntajes, mensajes y el historial
const userScoreSpan = document.getElementById("user-score"); // Elemento para mostrar el puntaje del usuario
const computerScoreSpan = document.getElementById("computer-score"); // Elemento para mostrar el puntaje de la computadora
const resultMessage = document.getElementById("result-message"); // Elemento para mostrar el mensaje del resultado
const historyBody = document.getElementById("history-body"); // Cuerpo de la tabla para el historial de rondas
const clearHistoryButton = document.getElementById("clear-history"); // Botón para limpiar el historial

// Referencias a los botones de las opciones (piedra, papel, tijeras)
const choice = {
    rock: document.getElementById("rock"),
    paper: document.getElementById("paper"),
    scissors: document.getElementById("scissors"),
};

// Variables para almacenar los puntajes y el número de ronda
let userScore = 0; // Puntaje del usuario
let computerScore = 0; // Puntaje de la computadora
let round = 1; // Número de la ronda actual

// Función para obtener una elección aleatoria de la computadora
function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"]; // Opciones disponibles
    return choices[Math.floor(Math.random() * choices.length)]; // Selección aleatoria
}

// Función para determinar el resultado de una ronda
function playRound(userChoice, computerChoice) {
    // Si ambas elecciones son iguales, es un empate
    if (userChoice === computerChoice) return "draw";

    // Condiciones para que el usuario gane
    if (
        (userChoice === "rock" && computerChoice === "scissors") ||
        (userChoice === "paper" && computerChoice === "rock") ||
        (userChoice === "scissors" && computerChoice === "paper")
    ) {
        return "user"; // El usuario gana
    }

    // Si no es empate ni gana el usuario, la computadora gana
    return "computer";
}

// Función para actualizar el juego después de cada ronda
function updateGame(userChoice, computerChoice, result) {
    // Actualizar puntajes y mensajes según el resultado
    if (result === "user") {
        userScore++; // Incrementar el puntaje del usuario
        userScoreSpan.textContent = userScore; // Mostrar el nuevo puntaje del usuario
        resultMessage.textContent = `You win! ${userChoice} beats ${computerChoice}.`; // Mensaje de victoria
    } else if (result === "computer") {
        computerScore++; // Incrementar el puntaje de la computadora
        computerScoreSpan.textContent = computerScore; // Mostrar el nuevo puntaje de la computadora
        resultMessage.textContent = `You lose! ${computerChoice} beats ${userChoice}.`; // Mensaje de derrota
    } else {
        resultMessage.textContent = `It's a draw! Both chose ${userChoice}.`; // Mensaje de empate
    }

    // Crear una nueva fila en la tabla del historial
    const newRow = document.createElement("tr");
    // Agregar las celdas con los datos de la ronda
    [round, userChoice, computerChoice, result === "draw" ? "Draw" : result === "user" ? "Win" : "Lose"].forEach((text) => {
        const td = document.createElement("td"); // Crear una celda
        td.textContent = text; // Asignar el texto correspondiente
        newRow.appendChild(td); // Agregar la celda a la fila
    });
    historyBody.appendChild(newRow); // Agregar la fila al cuerpo de la tabla
    round++; // Incrementar el número de la ronda
}

// Función para manejar la elección del usuario
function handleUserChoice(userChoice) {
    const computerChoice = getComputerChoice(); // Obtener la elección de la computadora
    const result = playRound(userChoice, computerChoice); // Determinar el resultado de la ronda
    updateGame(userChoice, computerChoice, result); // Actualizar el juego con los resultados
}

// Agregar eventos de clic a los botones de las opciones
Object.keys(choice).forEach((key) => {
    choice[key].addEventListener("click", () => handleUserChoice(key)); // Llamar a handleUserChoice con la opción seleccionada
});

// Evento para limpiar el historial y reiniciar el juego
clearHistoryButton.addEventListener("click", () => {
    historyBody.innerHTML = ""; // Limpiar el historial de la tabla
    userScore = 0; // Reiniciar el puntaje del usuario
    computerScore = 0; // Reiniciar el puntaje de la computadora
    round = 1; // Reiniciar el número de ronda
    userScoreSpan.textContent = userScore; // Actualizar el puntaje del usuario en la interfaz
    computerScoreSpan.textContent = computerScore; // Actualizar el puntaje de la computadora en la interfaz
    resultMessage.textContent = "Choose an option to start:"; // Mensaje inicial
});