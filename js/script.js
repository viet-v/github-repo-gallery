// Profile general information
const overview = document.querySelector(".overview");

const repoList = document.querySelector(".repo-list");

const repoSection = document.querySelector(".repos");

const repoData = document.querySelector(".repo-data");

const username = "viet-v";


const getProfile = async function () {
    const data = await fetch(`https://api.github.com/users/${username}`);
    const info = await data.json();
    console.log(info);
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

const getRepo = async function () {
    const data = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repos = await data.json();
    console.log(repos);
    eachRepo(repos);
};

getRepo();

const eachRepo = function (repos){
    for (let repo of repos) {
        const li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(li);
    }
};

repoList.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        console.log(repoName);
        repoInfo(repoName);
    }
});

const repoInfo = async function (repoName) {
    const data = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await data.json();
    console.log(repoInfo);
    const fetchLanguages = await fetch(`https://api.github.com/repos/${username}/${repoName}/languages`);
    const languageData = await fetchLanguages.json();
    console.log(languageData);
    const languages = [];
    for (let key in languageData) {
        languages.push(`${key}: ${languageData[key]}`);
    };
    console.log(languages);
    repoDisplay (repoInfo, languages);
};

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
};