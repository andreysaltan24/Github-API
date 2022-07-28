const URL = 'https://api.github.com/users';

const form = document.querySelector('.form');
const input = document.querySelector('.input');
const btn = document.querySelector('.btn');
const about = document.querySelector('.about');

const getProfile = (user) => {
    const data = fetch(`${URL}/${user}`)
    .then((res) => {
        if(res.ok) {
            return res.json();
        }
    })
    .catch(handleError);
    return data;
}

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
    e.preventDefault();
    const user = getUser();

    if(user.trim()) {
        getProfile(user)
         .then((res) => {
            createHtml(res);
            resetForm();
         })
         .catch((e) => alert ('User not defined'));
    }
}

function getUser() {
    return input.value;
}

function resetForm() {
    return (input.value = '');
}

function createHtml(user) {
    const userInfo = `
    <div><img src = ${user.avatar_url} alt=""></img>
    <ul>
        <li>Repositories: ${user.public_repos}</li>
        <li>Followers: ${user.followers}</li>
        <li>Following: ${user.following}</li>
    </ul>
    </div>`;

    about.innerHTML = userInfo;
}

function handleError(e) {
    alert(e.message);
}