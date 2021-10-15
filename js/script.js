// Profile general information
const overview = document.querySelector(".overview");

const repoList = document.querySelector(".repo-list");

const repoSection = document.querySelector(".repos");

// Each repo information
const repoData = document.querySelector(".repo-data");

// Button "Back to Repo Gallery"
const backButton = document.querySelector(".view-repos");

// Box search repo by name
const filterInput = document.querySelector(".filter-repos");

const username = "viet-v";

// Get user general info
const getProfile = async function () {
    const data = await fetch(`https://api.github.com/users/${username}`);
    const info = await data.json();
    // console.log(info);
    userInfo(info);
};

getProfile();

// Show user general info
const userInfo = function (info) {
    const userDiv = document.createElement("div");
    userDiv.classList.add("user-info");
    userDiv.innerHTML = `
        <figure>
            <img alt="user avatar" src=${info.avatar_url} >
        </figure>
        <div>
            <p><strong>Name:</strong> ${info.name}</p>
            <p><strong>Bio:</strong> ${info.bio}</p>
            <p><strong>Location:</strong> ${info.location}</p>
            <p><strong>Number of public repos:</strong> ${info.public_repos}</p>
        </div>
        `;
    overview.append(userDiv);
};

// Get repo list info
const getRepo = async function () {
    const data = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repos = await data.json();
    console.log(repos);
    eachRepo(repos);
};

getRepo();

// Display repo list
const eachRepo = function (repos) {
    filterInput.classList.remove("hide");
    for (let repo of repos) {
        const li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(li);
    }
};

// Click on each repo name, then display repo info
repoList.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        console.log(repoName);
        repoInfo(repoName);
    }
});

// Get each repo info and display
const repoInfo = async function (repoName) {
    const data = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await data.json();
    console.log(repoInfo);
    const fetchLanguages = await fetch(`https://api.github.com/repos/${username}/${repoName}/languages`);
    const languageData = await fetchLanguages.json();
    console.log(languageData);
    const languages = [];
    for (let key in languageData) {
        languages.push(key);
    };
    console.log(languages);
    repoDisplay (repoInfo, languages);
};
// Display each repo info
const repoDisplay = function (repoInfo, languages) {
    repoData.innerHTML = "";
    repoDiv = document.createElement("div");
    repoDiv.innerHTML = `
        <h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
        `;
    repoData.append(repoDiv);
    repoData.classList.remove("hide");
    repoSection.classList.add("hide");
    backButton.classList.remove("hide");
};

// Back to gallery button
backButton.addEventListener("click", function () {
    repoSection.classList.remove("hide");
    repoData.classList.add("hide");
    backButton.classList.add("hide");
});

// Search for repo name
filterInput.addEventListener("input", function(e) {
    const input = e.target.value;
    console.log(input);
    const repos = document.querySelectorAll(".repo");
    const inputValue = input.toLowerCase();
    for (let repo of repos) {
        const repoName = repo.innerText.toLowerCase();
        if (!repoName.includes(inputValue)) {
            repo.classList.add("hide");
        } else {
            repo.classList.remove("hide");
        };
    };
});