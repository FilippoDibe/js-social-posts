const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2021-06-25"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "2021-09-03"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "2021-05-15"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": null
        },
        "likes": 56,
        "created": "2021-04-03"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "2021-03-05"
    }
];

const container = document.getElementById("container");

const likePostIds = []

const dataRovesciata = (dateString) => {
    const [anno, mese, giorno] = dateString.split("-");
    return `${giorno}/${mese}/${anno}`;
};

posts.forEach(post => {
    const postElement = document.createElement("div");
    postElement.classList.add("post");


    postElement.innerHTML = 
    `
        <div class="post__header">
            <div class="post-meta">                    
                <div class="post-meta__icon">
                    <img class="profile-pic" src="${post.author.image}" alt="${post.author.name}">                    
                </div>
            <div class="post-meta__data">
                    <div class="post-meta__author">${post.author.name}</div>
                    <div class="post-meta__time">${dataRovesciata(post.created)}</div>
            </div>                    
            </div>
        </div>
        <div class="post__text">${post.content}</div>
        <div class="post__image">
            <img src="${post.media}" alt="">
        </div>
        <div class="post__footer">
            <div class="likes js-likes">
                <div class="likes__cta">
                    <a class="like-button js-like-button" href="#" data-postid="${post.id}">
                        <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                        <span class="like-button__label">Mi Piace</span>
                    </a>
                </div>
                <div class="likes__counter">
                    Piace a <b id="like-counter-${post.id}" class="js-likes-counter">${post.likes}</b> persone
                </div>
            </div> 
        </div> 
    `;
    const bottoneLike = postElement.querySelector('.js-like-button')
    const likeCounter = postElement.querySelector(".js-likes-counter")

    bottoneLike.addEventListener('click', () => {
        // controllo dello stato del like 
        const likeSi = likePostIds.includes(post.id);
        if (likeSi){
            // togle il like 
            bottoneLike.classList.remove('liked');
            likePostIds.splice(likePostIds.indexOf(post.id), 1);
            post.likes --;
        }else{
            // mette il like 
            bottoneLike.classList.add("liked");
            likePostIds.push(post.id);
            post.likes ++;
        }
        likeCounter.textContent = post.likes;

        
    });

    container.appendChild(postElement);

});

// bonus delle lettere al posto dell immagine 
// funzione per riconoscere le lettere da usare 
const iniziali = (name) =>{
    const parteNome = name.split(" ");
    return parteNome.map(part => part.charAt(0)).join("");
};

// funzione per l'assenza dell'immagine prifilo
const immagineProfilo = (author) => {
    if (author.image) {
        return `<img class="profile-pic" src="${author.image}" alt="${author.name}">`;
    }else{
        const inizialiImage = iniziali(author.name);
        return `<div class=fallback-initials">${iniziali}</div>`
    }
};