// File: js/gallery.js

// Array of image information
const galleryImages = [
  {
    full: "/images/full/img1.jpg",
    thumb: "/images/thumb/img1.jpg",
    caption: "Sarah's Weight Loss Journey",
  },
  {
    full: "/images/full/img2.jpg",
    thumb: "/images/thumb/img2.jpg",
    caption: "Mike's Muscle Building Progress",
  },
  {
    full: "/images/full/img3.jpg",
    thumb: "/images/thumb/img3.jpg",
    caption: "Emily's Fitness Competition Prep",
  },
  {
    full: "/images/full/img4.jpg",
    thumb: "/images/thumb/img4.jpg",
    caption: "David's Recovery Journey",
  },
  {
    full: "/images/full/img5.jpg",
    thumb: "/images/thumb/img5.jpg",
    caption: "Our State-of-the-Art Weight Room",
  },
  {
    full: "/images/full/img6.jpg",
    thumb: "/images/thumb/img6.jpg",
    caption: "Cardio Area With Mountain Views",
  },
  {
    full: "/images/full/img7.avif",
    thumb: "/images/full/img7.avif",
    caption: "Morning Yoga Class",
  },
  {
    full: "/images/full/img8.jpg",
    thumb: "/images/thumb/img8.jpg",
    caption: "HIIT Group Training Session",
  },
  {
    full: "/images/full/img9.jpg",
    thumb: "/images/full/img9.jpg",
    caption: "Nutrition Workshop",
  },
  {
    full: "/images/full/img10.jpg",
    thumb: "/images/thumb/img10.jpg",
    caption: "John's 12-Week Transformation",
  },
];

let currentImageIndex = 0;

// Function to change the main image
function setImage(index) {
  // Update current index
  currentImageIndex = index;

  // Update main image and caption
  document.getElementById("current-image").src = galleryImages[index].full;
  document.getElementById("image-caption").textContent = galleryImages[index].caption;

  // Update active thumbnail
  const thumbnails = document.getElementsByClassName("thumbnail");
  for (let i = 0; i < thumbnails.length; i++) {
    if (i === index) {
      thumbnails[i].classList.add("active");
    } else {
      thumbnails[i].classList.remove("active");
    }
  }
}

// Function to navigate to next or previous image
function changeImage(direction) {
  // Calculate new index with wraparound
  let newIndex = currentImageIndex + direction;

  // Handle wraparound
  if (newIndex < 0) {
    newIndex = galleryImages.length - 1;
  } else if (newIndex >= galleryImages.length) {
    newIndex = 0;
  }

  // Set the new image
  setImage(newIndex);
}

// Add keyboard navigation
document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowLeft") {
    changeImage(-1);
  } else if (event.key === "ArrowRight") {
    changeImage(1);
  }
});

// Preload images for smoother experience
function preloadImages() {
  galleryImages.forEach((image) => {
    const img = new Image();
    img.src = image.full;
  });
}

// Call preload function when page loads
window.onload = preloadImages;
