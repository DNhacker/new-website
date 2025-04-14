document.addEventListener("DOMContentLoaded", function () {
    // Select all sliders and images
    const allSliders = document.querySelectorAll(".functions-slider, .memories-slider, .playtime-slider, .school-slider");
    const images = document.querySelectorAll(".functions-slider img, .memories-slider img, .playtime-slider img, .school-slider img");

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.querySelector("nav");
    const popup = document.getElementById("popup");
    const popupImg = document.getElementById("popupImg");
    const popupTitle = document.getElementById("popupTitle");
    const popupDescription = document.getElementById("popupDescription");
    const closePopup = document.getElementById("closePopup");

    let scrollSpeed = 0.5;
    
    document.querySelector(".functions-slider").addEventListener("click", function(e) {
        if (e.target.tagName === "IMG") {
          const img = e.target;
          popupImg.src = img.src;
          popupTitle.textContent = img.dataset.title || "Untitled";
          popupDescription.textContent = img.dataset.description || "No description";
          popup.classList.add("active");
        }
      });

      document.querySelector(".playtime-slider").addEventListener("click", function(e) {
        if (e.target.tagName === "IMG") {
          const img = e.target;
          popupImg.src = img.src;
          popupTitle.textContent = img.dataset.title || "Untitled";
          popupDescription.textContent = img.dataset.description || "No description";
          popup.classList.add("active");
        }
      });

      document.querySelector(".memories-slider").addEventListener("click", function(e) {
        if (e.target.tagName === "IMG") {
          const img = e.target;
          popupImg.src = img.src;
          popupTitle.textContent = img.dataset.title || "Untitled";
          popupDescription.textContent = img.dataset.description || "No description";
          popup.classList.add("active");
        }
      });

      document.querySelector(".school-slider").addEventListener("click", function(e) {
        if (e.target.tagName === "IMG") {
          const img = e.target;
          popupImg.src = img.src;
          popupTitle.textContent = img.dataset.title || "Untitled";
          popupDescription.textContent = img.dataset.description || "No description";
          popup.classList.add("active");
        }
      });




    // Open popup on image click
    let currentImageIndex = 0;
const imagesArray = Array.from(images);

imagesArray.forEach((img, index) => {
    img.addEventListener("click", function () {
        currentImageIndex = index;
        showPopupImage(imagesArray[currentImageIndex]);
        let startX = 0;
let endX = 0;

popup.addEventListener("touchstart", function(e) {
    startX = e.touches[0].clientX;
});

popup.addEventListener("touchend", function(e) {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    if (endX < startX - swipeThreshold) {
        currentImageIndex = (currentImageIndex + 1) % imagesArray.length;
        showPopupImage(imagesArray[currentImageIndex]);
    } else if (endX > startX + swipeThreshold) {
        currentImageIndex = (currentImageIndex - 1 + imagesArray.length) % imagesArray.length;
        showPopupImage(imagesArray[currentImageIndex]);
    }
}

    });
});

function showPopupImage(img) {
    const title = img.getAttribute("data-title") || "Untitled";
    const description = img.getAttribute("data-description") || "No description";
    popupImg.src = img.src;
    popupTitle.textContent = title;
    popupDescription.textContent = description;
    popup.classList.add("active");
}





    // Close popup
    if (closePopup) {
        closePopup.addEventListener("click", function () {
            popup.classList.remove("active");
        });
    }




    // Close popup when clicking outside the image
    if (popup) {
        popup.addEventListener("click", function (event) {
            if (event.target === popup) {
                popup.classList.remove("active");
            }
        });
    }



    // Mobile menu toggle
    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", function () {
            navMenu.classList.toggle("active");
            menuToggle.classList.toggle("active");
            menuToggle.innerHTML = navMenu.classList.contains("active") ? "⛒" : "☰";
        });

        document.addEventListener("click", function (event) {
            if (!navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
                navMenu.classList.remove("active");
                menuToggle.classList.remove("active");
                menuToggle.innerHTML = "☰";
            }
        });
    }




    // Handle all sliders
    allSliders.forEach(track => {
        let isPaused = false;
        let isDragging = false;
        let startX, scrollLeft;



        // Hover pause
        track.addEventListener("mouseenter", () => {
            isPaused = true;
            track.style.animationPlayState = "paused";
        });

        track.addEventListener("mouseleave", () => {
            if (!isDragging) {
                isPaused = false;
                track.style.animationPlayState = "running";
            }
        });



        // Drag to scroll
        track.addEventListener("mousedown", (e) => {
            isDragging = true;
            isPaused = true;
            track.style.animationPlayState = "paused";
            startX = e.pageX - track.offsetLeft;
            scrollLeft = track.scrollLeft;
            track.style.cursor = "grabbing";
        });

        track.addEventListener("mousemove", (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.pageX - track.offsetLeft;
            const walk = (x - startX) * 2;
            track.scrollLeft = scrollLeft - walk;
        });

        document.addEventListener("mouseup", () => {
            isDragging = false;
            track.style.cursor = "grab";
            setTimeout(() => {
                if (!isDragging) {
                    isPaused = false;
                    track.style.animationPlayState = "running";
                }
            }, 1000);
        });

        track.addEventListener("mouseleave", () => {
            isDragging = false;
            track.style.cursor = "grab";
        });

        // Clone for infinite loop
        function cloneImages() {
            const firstSet = track.innerHTML;
            track.innerHTML += firstSet;
        }

        cloneImages();

        function checkScroll() {
            const halfWidth = track.scrollWidth / 2;
            if (track.scrollLeft >= halfWidth) {
                track.scrollLeft -= halfWidth;
            }
        }

        function autoScroll() {
            if (!isPaused && !isDragging) {
                track.scrollLeft += scrollSpeed;
                checkScroll();
            }
            requestAnimationFrame(autoScroll);
        }

        autoScroll();
    });

    // Teacher photo animation
    let nextBtn = document.querySelector('.next');
    let prevBtn = document.querySelector('.prev');
    let slider = document.querySelector('.slider');
    let sliderList = slider.querySelector('.slider .list');
    let thumbnail = document.querySelector('.slider .thumbnail');
    let thumbnailItems = thumbnail.querySelectorAll('.item');
    thumbnail.appendChild(thumbnailItems[0]);

    nextBtn.onclick = function () {
        moveSlider('next');
        resetAutoSlide();
    }

    prevBtn.onclick = function () {
        moveSlider('prev');
        resetAutoSlide();
    }

    function moveSlider(direction) {
        let sliderItems = sliderList.querySelectorAll('.item');
        let thumbnailItems = document.querySelectorAll('.thumbnail .item');

        if (direction === 'next') {
            sliderList.appendChild(sliderItems[0]);
            thumbnail.appendChild(thumbnailItems[0]);
            slider.classList.add('next');
        } else {
            sliderList.prepend(sliderItems[sliderItems.length - 1]);
            thumbnail.prepend(thumbnailItems[thumbnailItems.length - 1]);
            slider.classList.add('prev');
        }

        slider.addEventListener('animationend', function () {
            slider.classList.remove(direction);
        }, { once: true });
    }

    let autoSlideInterval = setInterval(function () {
        moveSlider('next');
    }, 5000);

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(function () {
            moveSlider('next');
        }, 5000);
    }
});
