const main=document.getElementById('main');
const addUserBtn=document.getElementById('add_user');
const doubleBtn=document.getElementById('double');
const showMillionarieBtn=document.getElementById('show_millionarie');
const sortBtn=document.getElementById('sort');
const calculateWealthBtn=document.getElementById('calculate_wealth');

let data=[];

getRandomUser();
getRandomUser();

// fetch random user and add money

async function getRandomUser(){
    const res =  await fetch('https://randomuser.me/api')
    const data= await res.json();

    const user = data.results[0];

    const newUser ={
        name:`${user.name.first} ${user.name.last}`, 
        money:Math.floor(Math.random()*1000000)
    };

    console.log(newUser);

    addData(newUser)
}

//double money

function doubleMoney(){
    data=data.map(function(user){
        return {...user,money:user.money*2}
    });
    updateDom();
}

//sort by Richest

function sortByRichest(){
    data.sort((a,b)=>b.money - a.money);

    updateDom();
}

// filter by millionarie

function showOnlyMillionaree(){
    data=data.filter(function(user){
        return user.money>1000000;
    });
    updateDom();
}

// calculate total wealth by reduce method

function calculateWealth(){
    const wealth = data.reduce((acc,user)=>acc+=user.money,0)
    const wealthEl=document.createElement('div');
    wealthEl.innerHTML=`<h3>Total Wealth:<strong>${formatMoney(wealth)}</strong></h3>`;
    main.appendChild(wealthEl);
}
// Add new obj to data arr

function addData(obj){
    data.push(obj);
    updateDom();
}

//update Dom

function updateDom(providedData=data){

    //clear main div

    main.innerHTML=`<h2><strong>Person</strong>Wealth</h2>`;


    providedData.forEach(function(item){
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML=`<strong>${item.name}</strong>${formatMoney(item.money)}`;
        main.appendChild(element);
    })
}


// format number as currency string

function formatMoney(number){

    return '$'+ number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g,`$&,`);

}

addUserBtn.addEventListener('click',getRandomUser);
doubleBtn.addEventListener('click',doubleMoney);
sortBtn.addEventListener('click',sortByRichest);
showMillionarieBtn.addEventListener('click',showOnlyMillionaree);
calculateWealthBtn.addEventListener('click',calculateWealth);