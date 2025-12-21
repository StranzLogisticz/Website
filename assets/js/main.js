document.addEventListener("DOMContentLoaded", function() {
  const hero = document.querySelector(".hero");
  if (hero) {
    const h1 = hero.querySelector("h1");
    const p = hero.querySelector("p");
    const btnRow = hero.querySelector(".btn-row");

    if (h1 && hero.dataset.title) h1.textContent = hero.dataset.title;
    if (p && hero.dataset.subtitle) p.textContent = hero.dataset.subtitle;

    if (btnRow && hero.dataset.buttons) {
      btnRow.innerHTML = ""; // clear existing
      const buttons = hero.dataset.buttons.split(",");
      buttons.forEach(btn => {
        const [label, link] = btn.split(":");
        if (label && link) {
          const a = document.createElement("button");
          a.textContent = label.trim();
          a.className = "btn-primary"; // orange style

          // ✅ Force external link open
          a.addEventListener("click", () => {
            window.open(link.trim(), "_blank", "noopener,noreferrer");
          });

          btnRow.appendChild(a);
        }
      });
    }
  }
});
