# 🐙 GitPix

Welcome to `GitPix`! A fun and interactive application that allows you to get a fresh perspective on GitHub users by mashing up data from Unsplash, GitHub, and GIPHY API.

![GitPix App Screenshot](media/Screenshot%202023-10-20%20at%2010.29.50.png)

<!-- You can replace this with a real screenshot of your app -->

🔗 [Try GitPix](https://paing-ko.github.io/GitPix/)

## 🌟 Features

- **Search GitHub Users:** Input a GitHub username and get a visually appealing profile with data from GitHub.
- **Dynamic Backgrounds:** With each profile, enjoy a unique background fetched from Unsplash.
- **User Info:** View the user's repos, followers, following, stars, contributions, preferred languages, and more.
- **Interactive Charts:** Get insights into user data with intuitive charts.
- **GIPHY Search:** Fancy a laugh or want to express an emotion? Search and view GIPHYs right at the bottom.

## 🧠 User Stories

### Core Stories

- **Mashup of Data:** See an intriguing mix of images, GitHub user data, and GIFs.
- **User Interaction:** Input a GitHub username or search a GIPHY to change the displayed result.
- **Responsive Design:** Seamlessly view the app across all devices.

### Stretch Stories

- **Data Loading Indication:** As data loads, users get a visual cue indicating the process.
- **Error Handling:** Users are promptly informed when something doesn't go as planned.

## ✔️ Acceptance Criteria

- Queries at least two APIs using `fetch`.
- Dynamic content, all generated using JS.
- Well-documented user journey.
- Mobile-first, responsive design.
- Accessibility considered and implemented for a broad range of users.

## 🛠️ Planning

During the planning phase, I:

- Researched and chose APIs that fit my app vision.
- Carefully considered the user's journey through the app.
- Defined MVP and started working on data fetching then styling.

## 🔑 API Keys

For this project, I've utilized APIs that are either token-free or employ free API keys. In a real-world scenario, always avoid exposing API keys on the client side.
- **Unsplash**: Provides the vast library of diverse images. 
  - [View Documentation](https://unsplash.com/documentation)
- **GitHub**: Powers the core feature of fetching GitHub user data.
  - [View Documentation](https://docs.github.com/en/rest)
- **GIPHY**: The source of the entertaining GIFs that users can search for.
  - [View Documentation](https://developers.giphy.com/docs/api/)


## 🚀 Getting Started

1. Clone the repo:
   ```bash
   git clone https://github.com/Paing-Ko/GitPix.git
   ```
2. Navigate into the directory:

   ```bash
   cd GitPix
   ```

3. Open index.html in your browser.

   ```bash
   open index.html
   ```

4. Start exploring and have fun!
