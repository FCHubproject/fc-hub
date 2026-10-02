// FC HUB - Career Manager

let players = [];

async function loadPlayers() {
  const status = document.getElementById("status");

  try {
    status.textContent = "Chargement des joueurs...";

    const response = await fetch("./fcdata.js");

    if (!response.ok) {
      throw new Error("Impossible de charger fcdata.js");
    }

    const text = await response.text();

    // Recherche de la variable contenant les joueurs
    const match = text.match(
      /(?:const|let|var)\s+FC_PLAYERS\s*=\s*(\[[\s\S]*?\]);/
    );

    if (!match) {
      throw new Error("FC_PLAYERS introuvable");
    }

    players = Function(
      "return " + match[1]
    )();

    status.textContent =
      "✅ " +
      players.length.toLocaleString("fr-FR") +
      " joueurs chargés.";

  } catch (error) {

    console.error(error);

    status.textContent =
      "❌ Impossible de charger la base de joueurs.";
  }
}

function searchPlayers() {

  const search =
    document
      .getElementById("playerSearch")
      .value
      .toLowerCase();

  const results =
    players.filter(player =>
      JSON.stringify(player)
        .toLowerCase()
        .includes(search)
    );

  const container =
    document.getElementById("results");

  container.innerHTML = "";

  results.slice(0, 50).forEach(player => {

    const div =
      document.createElement("div");

    div.className = "player";

    div.textContent =
      JSON.stringify(player);

    container.appendChild(div);

  });
}

document.addEventListener(
  "DOMContentLoaded",
  loadPlayers
);
