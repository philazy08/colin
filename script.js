const categoryForm = document.querySelector(".categories");
const projectCards = document.querySelectorAll(".project-card");

// 1. KATEGORIEN-FILTER (Bestehender Code)
function updateProjects() {
  const selected = categoryForm.querySelector("input[name='cat']:checked")?.value || "all";

  projectCards.forEach((card) => {
    const categories = (card.dataset.category || "").split(" ");
    card.hidden = selected !== "all" && !categories.includes(selected);
  });
}

categoryForm.addEventListener("change", updateProjects);
updateProjects();


// 2. DYNAMISCHER PROJEKT-WECHSEL (Neu)
projectCards.forEach((card) => {
  card.addEventListener("click", function () {
    // Daten aus der geklickten Karte auslesen
    const title = this.dataset.title;
    const description = this.dataset.description;
    const employer = this.dataset.employer;
    const year = this.dataset.year;
    const collab = this.dataset.collab;
    const type = this.dataset.type;
    const imgMain = this.dataset.imgMain;
    const imgGallery = this.dataset.imgGallery ? this.dataset.imgGallery.split(",") : [];

    // DOM-Elemente der Detailseite selektieren
    document.getElementById("detail-title").textContent = title + ":";
    document.getElementById("detail-description").textContent = description;
    document.getElementById("detail-employer").textContent = employer;
    document.getElementById("detail-year").textContent = year;
    document.getElementById("detail-collab").textContent = collab;
    document.getElementById("detail-type").textContent = type;

    // Galerie dynamisch aufbauen
    const gallerySection = document.getElementById("detail-gallery");
    gallerySection.innerHTML = ""; // Vorherigen Inhalt leeren

    // Hauptbild hinzufügen
    if (imgMain) {
      const mainImgElement = document.createElement("img");
      mainImgElement.classList.add("wide");
      mainImgElement.src = imgMain;
      mainImgElement.alt = title;
      gallerySection.appendChild(mainImgElement);
    }

    // Weitere Galeriebilder hinzufügen (falls vorhanden)
    if (imgGallery.length > 0 && imgGallery[0] !== "") {
      const bookRow = document.createElement("div");
      bookRow.classList.add("book-row");

      imgGallery.forEach((imgSrc, index) => {
        const imgElement = document.createElement("img");
        imgElement.src = imgSrc;
        imgElement.alt = `${title} Detailbild ${index + 1}`;
        
        // Wenn es mehr als 2 Bilder sind, packe das dritte ans Ende
        if (index === 2) {
          imgElement.classList.add("wide", "book-bottom");
          gallerySection.appendChild(imgElement);
        } else {
          bookRow.appendChild(imgElement);
        }
      });

      if (bookRow.children.length > 0) {
        // Die Zeile mit den zwei Bildern vor dem "book-bottom" einfügen
        gallerySection.insertBefore(bookRow, gallerySection.querySelector(".book-bottom"));
      }
    }
  });
});