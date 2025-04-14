document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".image-section");
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.querySelector("nav");

    // Reveal sections on scroll
    function revealOnScroll() {
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.8 && rect.bottom > 0) {
                section.classList.add("show");
            } else {
                section.classList.remove("show");
            }
        });
    }

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();

    // Mobile Menu Toggle
    menuToggle.addEventListener("click", function () {
        navMenu.classList.toggle("active");
        menuToggle.classList.toggle("active");

        // Change icon (☰ to ✖)
        if (navMenu.classList.contains("active")) {
            menuToggle.innerHTML = "✖";
        } else {
            menuToggle.innerHTML = "☰";
        }
    });

    // Close menu when clicking outside (for better UX)
    document.addEventListener("click", function (event) {
        if (!navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
            navMenu.classList.remove("active");
            menuToggle.classList.remove("active");
            menuToggle.innerHTML = "☰";
        }
    });

   // === FETCH BLOGS AND DISPLAY ===
document.addEventListener("DOMContentLoaded", function () {
    const blogContainer = document.getElementById("blogContainer");
  
    db.ref("blogs").on("value", (snapshot) => {
      blogContainer.innerHTML = ""; // clear previous
      const blogs = snapshot.val();
  
      if (blogs) {
        Object.values(blogs).reverse().forEach(blog => {
          const section = document.createElement("section");
          section.className = "image-section show"; // to apply animation immediately
  
          section.innerHTML = `
            <div class="text-content">
              <h2>${blog.title}</h2>
              <p>${blog.content}</p>
              <p><strong>Uploaded by:</strong> ${blog.uploadedBy || "Anonymous"}</p>
              <p><em>${new Date(blog.date).toLocaleString()}</em></p>
            </div>
          `;
          blogContainer.appendChild(section);
        });
      } else {
        blogContainer.innerHTML = "<p>No blogs available.</p>";
      }
    });
  });
  
});
