const features = document.querySelectorAll(".feature");

features.forEach((feature) => {
  feature.addEventListener("mouseenter", () => {
    feature.style.transform = "translateY(-15px)";
    feature.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.2)";
  });

  feature.addEventListener("mouseleave", () => {
    feature.style.transform = "translateY(0)";
    feature.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
  });
});


document.querySelector(".cta-button").addEventListener("click", () => {
    const targetSection = document.getElementById("target-section-id");
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  });
  