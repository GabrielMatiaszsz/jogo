const cards = ['💖', '🌹', '🐶', '🍫', '💖', '🌹', '🐶', '🍫'];
let shuffled = cards.sort(() => 0.5 - Math.random());
let first = null;
let lock = false;
let matchedPairs = 0;

const board = document.getElementById("gameBoard");

shuffled.forEach((symbol, index) => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.symbol = symbol;
  card.dataset.index = index;

  card.addEventListener("click", () => {
    if (lock || card.classList.contains("revealed")) return;

    card.textContent = symbol;
    card.classList.add("revealed");

    if (!first) {
      first = card;
    } else {
      if (first.dataset.symbol === symbol && first !== card) {
        matchedPairs++;
        first = null;

        // ✅ Verifica se todas as cartas foram reveladas
        if (matchedPairs === cards.length / 2) {
          setTimeout(() => {
            alert("🎉 Parabéns, meu amor! Você ganhou um vale night comigo 🍕❤️ Vamos sair pra comer onde você quiser!");
          }, 500);
        }
      } else {
        lock = true;
        setTimeout(() => {
          first.textContent = '';
          card.textContent = '';
          first.classList.remove("revealed");
          card.classList.remove("revealed");
          first = null;
          lock = false;
        }, 1000);
      }
    }
  });

  board.appendChild(card);
});
