document.addEventListener("DOMContentLoaded", function () {
  const participantInput = document.getElementById("participantName");
  const addButton = document.getElementById("addParticipant");
  const participantList = document.getElementById("participantList");
  const numberOfTeamsSelect = document.getElementById("numberOfTeams");
  const drawButton = document.getElementById("drawButton");
  const teamsContainer = document.getElementById("teamsContainer");

  // Aggiungi un partecipante
  addButton.addEventListener("click", function () {
    const participantName = participantInput.value.trim();
    if (participantName !== "") {
      const listItem = document.createElement("li");
      listItem.textContent = participantName;
      participantList.appendChild(listItem);
      participantInput.value = ""; // Pulisci l'input
    } else {
      alert("Per favore, inserisci un nome partecipante.");
    }
  });

  // Sorteggia le squadre
  drawButton.addEventListener("click", function () {
    const participants = Array.from(participantList.children).map(
      (li) => li.textContent
    );
    const numberOfTeams = parseInt(numberOfTeamsSelect.value);

    if (participants.length < 2) {
      alert("Per favore, inserisci almeno 2 partecipanti.");
      return;
    }

    const shuffledParticipants = shuffleArray(participants);
    const teams = Array.from({ length: numberOfTeams }, (_, i) => ({
      teamName: `Squadra ${i + 1}`,
      participants: [],
    }));

    // Assegna i partecipanti alle squadre
    shuffledParticipants.forEach((participant, index) => {
      teams[index % numberOfTeams].participants.push(participant);
    });

    // Mostra i risultati
    teamsContainer.innerHTML = "";
    teams.forEach((team) => {
      const teamDiv = document.createElement("div");
      teamDiv.className = "team";
      teamDiv.innerHTML = `<strong>${
        team.teamName
      }:</strong> ${team.participants.join(", ")}`;
      teamsContainer.appendChild(teamDiv);
    });
  });

  // Funzione per mescolare un array
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
});
