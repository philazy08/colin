const categoryForm = document.querySelector(".categories");
const projectCards = document.querySelectorAll(".project-card");

function updateProjects() {
  const selected = categoryForm.querySelector("input[name='cat']:checked")?.value || "all";

  projectCards.forEach((card) => {
    const categories = (card.dataset.category || "").split(" ");
    card.hidden = selected !== "all" && !categories.includes(selected);
  });
}

categoryForm.addEventListener("change", updateProjects);
updateProjects();
