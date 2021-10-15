// Profile general information
const overview = document.querySelector(".overview");

const repoList = document.querySelector(".repo-list");

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