const postContainer =document.getElementById('post-container');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');

let limit=5;
let page=1;

//fetch posts from api

async function getPosts(){
    const res= await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`)
    const data= await res.json();
    return data;
}

//show posts in dom

async function showPosts(){
    const posts= await getPosts();

    posts.forEach(post => {
        const postDiv=document.createElement('div');
        postDiv.classList.add('post');
        postDiv.innerHTML=`
        <div class="number">${post.id}
        </div>
        <div class="post-info">
            <h2 class="post-title">${post.title}</h2>
            <p class="post-body">${post.body}
            </p>
            </div>`;
            postContainer.appendChild(postDiv)
        
    });
}

// show loader & fetch posts

function showLoading(){
    loading.classList.add('show');
    setTimeout(()=>{
        loading.classList.remove('show');
        setTimeout(()=>{
            page++;
            showPosts();
        },300);
    },1000)
}

//show initial posta
    showPosts();
//filter Posts

function filterPosts(e){
    const term = e.target.value.toUpperCase();
    const posts = document.querySelectorAll('.post');

    posts.forEach(post=>{
        const title=post.querySelector('.post-title').innerText.toUpperCase();
        const body = post.querySelector('.post-body').innerText.toUpperCase();

        if(title.indexOf(term)>-1 || body.indexOf(term)>-1){
            post.style.display='flex';
        } else {
            post.style.display='none';
        }
    })
}

window.addEventListener('scroll',()=>{

    const {scrollTop,scrollHeight,clientHeight}=document.documentElement;

    if(scrollTop+clientHeight>=scrollHeight-5){
        showLoading();
    }
})

filter.addEventListener('input',filterPosts);

// clientHeight-The clientHeight property returns the viewable height of an element in pixels,
// including padding, but not the border, scrollbar or margin.

//scrolltop -The scrollTop property sets or returns the number of pixels an element's content is scrolled vertically.

//scrollHeight - The scrollHeight property returns the entire height of an element in pixels, including padding, but not the border, scrollbar or margin.

