// Profile general information
const overview = document.querySelector(".overview");

const username = "viet-v";


const getProfile = async function () {
    const data = await fetch(`https://api.github.com/users/${username}`);
    const info = await data.json();
    console.log(info);
    userInfo(info);
};

getProfile();


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