// Firebase services already initialized in firebase-init.js

// === DOM ELEMENTS ===
const loginContainer = document.querySelector('.form-container'); 
const adminContainer = document.getElementById('adminContainer');
const imageInput = document.getElementById('photoInput');
const imagePreviewContainer = document.getElementById('imagePreviewContainer');
const imagePreview = document.getElementById('imagePreview');

// === FIREBASE AUTH STATE LISTENER ===
auth.onAuthStateChanged(async (user) => {
  if (user) {
    loginContainer.style.display = 'none';
    adminContainer.style.display = 'block';
    showToast("Welcome!");
  } else {
    loginContainer.style.display = 'block';
    adminContainer.style.display = 'none';
  }
});

// === LOGIN FUNCTION ===
function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    return showToast("Please enter both email and password.");
  }

  auth.signInWithEmailAndPassword(email, password)
    .then(() => showToast("Login successful!"))
    .catch(error => showToast(error.message));
}

// === LOGOUT FUNCTION ===
function logout() {
  auth.signOut().then(() => {
    showToast("Logged out!");
    loginContainer.style.display = 'block';
    adminContainer.style.display = 'none';
  });
}
// === UPLOAD BLOG ===
async function uploadBlog() {
  const title = document.getElementById('blogTitle').value.trim();
  const content = document.getElementById('blogContent').value.trim();
  const uploadedBy = document.getElementById('uploadedBy').value.trim();

  if (!title || !content || !uploadedBy) {
    return showToast("Please enter title, content, and uploaded by name.");
  }

  const blogData = {
    title,
    content,
    uploadedBy,
    date: new Date().toISOString()
  };

  try {
    await db.ref("blogs").push(blogData);
    showToast("Blog uploaded successfully!");

    // Clear fields
    document.getElementById('blogTitle').value = "";
    document.getElementById('blogContent').value = "";
    document.getElementById('uploadedBy').value = "";
  } catch (err) {
    showToast("Error uploading blog.");
  }
}


// === UPLOAD PHOTO ===
function uploadPhoto() {
  const file = imageInput.files[0];
  if (!file) return showToast("Please choose a file.");

  const storageRef = storage.ref("gallery/" + file.name);

  storageRef.put(file)
    .then(() => {
      showToast("Photo uploaded successfully!");
      imageInput.value = "";
      imagePreviewContainer.style.display = "none";
    })
    .catch(err => showToast("Upload failed: " + err.message));
}

// === IMAGE PREVIEW ===
imageInput.addEventListener("change", () => {
  const file = imageInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      imagePreview.src = reader.result;
      imagePreviewContainer.style.display = "block";
    };
    reader.readAsDataURL(file);
  } else {
    imagePreviewContainer.style.display = "none";
  }
});

// === TOAST NOTIFICATION ===
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.innerText = message;
  toast.style.display = "block";
  setTimeout(() => {
    toast.style.display = "none";
  }, 3000);
}
