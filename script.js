document
  .getElementById("username")
  .addEventListener("keydown", function (event) {
    if (event.keyCode === 13) fetchRepos();
  });

async function fetchRepos() {
  const username = document.getElementById("username").value;
  if (!username) return alert("Please enter a GitHub username.");

  try {
    const [profile, repos] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`).then((res) =>
        res.json()
      ),
      fetch(`https://api.github.com/users/${username}/repos?sort=updated`).then(
        (res) => res.json()
      ),
    ]);

    // Handling user not found
    if (profile.message && profile.message.includes("Not Found")) {
      return alert("GitHub user not found.");
    }

    // Default values for null fields
    profile.name = profile.name || "Unknown Name";
    profile.bio = profile.bio || "No bio available";
    profile.login = profile.login || "Unknown Username";
    profile.avatar_url = profile.avatar_url || ""; // replace with a default image URL if you prefer

    const flickButton = document.getElementById("flickBtn");
    flickButton.classList.add("flipped");

    // Optional: Remove the flipped class after the animation completes to reset the effect
    flickButton.addEventListener("animationend", () => {
      flickButton.classList.remove("flipped");
    });

    const repoContainer = document.getElementById("repoContainer");
    const totalStars = repos.reduce(
      (sum, repo) => sum + repo.stargazers_count,
      0
    );

    repoContainer.innerHTML = `
    <div id="profile-background">
        <div id="profile-container">
            <img src="${profile.avatar_url}" class="profile-pic" alt="${username}'s Profile Picture">
            <h2>${profile.name}</h2>
            <span class="username">${profile.login}</span>
            <p>${profile.bio}</p>
            <button class="follow-btn" onclick="window.open('${profile.html_url}', '_blank')">Follow</button>
        </div>
    </div>
    <div class="stats-container">
        <div class="stats-item">Repos:  ${profile.public_repos}</div>
        <div class="stats-item">Followers:  ${profile.followers}</div>
        <div class="stats-item">Following:  ${profile.following}</div>
        <div class="stats-item">⭐:  ${totalStars} star(s)</div>
    </div>

     <div class="repo-box">
        <div class="repo-header">Recent Repos</div>
        <div class="repo-list">
        </div>
    </div>
`;

    const repoListDiv = repoContainer.querySelector(".repo-list");
    // Profile pic rotate
    const profilePic = document.querySelector(".profile-pic");
    // Function to start rotation
    function startRotation() {
      profilePic.style.animation = "rotate 1s linear infinite";
    }
    // Function to stop rotation and reset animation
    function stopRotation() {
      profilePic.style.animation = "";
      void profilePic.offsetWidth; // This is a trick to reset the animation
    }

    // For touch devices
    profilePic.addEventListener("touchstart", startRotation);
    profilePic.addEventListener("touchend", stopRotation);

    // For non-touch devices
    profilePic.addEventListener("mousedown", startRotation);
    profilePic.addEventListener("mouseup", stopRotation);
    profilePic.addEventListener("mouseleave", stopRotation);

    // For hover effect
    profilePic.addEventListener("mouseenter", startRotation);
    profilePic.addEventListener("mouseout", stopRotation);

    for (let i = 0; i < 2 && i < repos.length; i++) {
      const repo = repos[i];
      const repoDiv = document.createElement("div");
      repoDiv.innerHTML = `<h2>${repo.name}</h2><a href="${repo.html_url}" target="_blank">View on GitHub</a>`;
      repoListDiv.appendChild(repoDiv);
    }

    displayImages(username);
    await setBackground();
  } catch (error) {
    console.error("Network Error:", error);
  }
}

// generate charts
function displayImages(username) {
  const images = [
    {
      id: "top-langs",
      url: `https://github-readme-stats.vercel.app/api/top-langs?username=${username}&show_icons=true&theme=tokyonight&locale=en&layout=compact`,
    },
    {
      id: "user-stats",
      url: `https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=tokyonight&locale=en`,
    },
    {
      id: "streak-stats",
      url: `https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=tokyonight`,
    },
    {
      id: "contribution-graph",
      url: `https://ghchart.rshah.org/40916c/${username}`,
    },
  ];

  images.forEach((img) => {
    const imageElement = document.getElementById(img.id);
    imageElement.style.display = "block";
    imageElement.src = img.url;
  });
}

// profile background
async function setBackground() {
  const response = await fetch(
    "https://api.unsplash.com/photos/random?query=programming&client_id=9-VX4xJ6eSMuRCnKpGQP_zyM_QqSgKtmvHZmUR4DTYs"
  );
  const data = await response.json();
  const imageUrl = data.urls.full;
  document.getElementById(
    "profile-background"
  ).style.cssText = `background-image: url(${imageUrl});
`;
}

// Rainbow
const spans = document.querySelectorAll(".rainbow span");

spans.forEach((span, index) => {
  setTimeout(() => {
    span.style.animationDelay = `${index * 0.2}s`;
  }, 0);
});

// GIPHY
async function fetchGif(searchTerm) {
  const response = await fetch(
    `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=7zcr5tNW9JmYSO2awsqBqGK3OjpLjnh3&limit=10`
  );
  const data = await response.json();
  const randomIndex = Math.floor(Math.random() * data.data.length);
  return data.data[randomIndex].images.original.url;
}

const modal = document.getElementById("giphyModal");
const closeBtn = document.querySelector(".close");

function searchGif() {
  const searchTerm = document.getElementById("search-term").value.trim(); // .trim() removes whitespace from the start and end

  // Check if searchTerm is empty or not
  if (!searchTerm) {
    alert("Please enter a search term before searching.");
    return; // Exit the function early
  }

  fetchGif(searchTerm).then((url) => {
    const giphyImage = document.getElementById("giphy-image");
    giphyImage.src = url;
    giphyImage.style.display = "block"; /* Display the image element */
    modal.style.display = "block"; // Display the modal only after a successful search
  });

  document.getElementById("search-term").value =
    ""; /* Clear the input element's value */
}

function checkEnter(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    searchGif();
  }
}

// Function to close the modal
closeBtn.onclick = function () {
  modal.style.display = "none";
};


// logo reload
document.getElementById("logo").addEventListener("click", function () {
  window.location.reload();
});
