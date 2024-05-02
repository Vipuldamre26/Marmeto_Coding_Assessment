let data;
let lists = document.querySelectorAll('li');
let ul = document.querySelector('.ul');
let cards = document.querySelector('.cards');
const apiURL = 'https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json';
let index = 0;
// console.log(lists);

// lists.forEach(element => {
//     console.log(element);
// });


// ****************************************************************************************


// fetching data
async function fetchData() {
    try {
        const response = await fetch(apiURL);
        let res = await response.json();
        // console.log(data);
        data = res;
        console.log(data);
    } catch (error) {
        console.log(error);
    }

    // after fetching showing this data on UI 
    addData(index);
   
}

// ****************************************************************************************


// calculating discount percentage of the product 

function calculatePercentage( SP, MRP) {
    if (MRP !== 0) {
        let percentage = ((MRP - SP)/MRP) * 100;
        return percentage.toFixed(0);
    } else {
        console.error("Total value cannot be zero.");
        return null;
    }
}

// ****************************************************************************************

window.onload = fetchData;


// ****************************************************************************************


function addData(index){

    if (!data) {
        console.log("Data is not available yet.");
        return;
    }

    let category = data.categories[index].category_products;
    // console.log(data);
    // console.log(category);
    // console.log(typeof category);

    cards.innerHTML = '';

    category.forEach((item) => {


        // adding image info 
        let card = document.createElement('div');
        card.classList.add('card');

        let imgDiv = document.createElement('div');
        imgDiv.classList.add('imgDiv');

        let img = document.createElement('img');
        img.setAttribute('src', item.image);




        // adding badge text 
        let badgeTextDiv = document.createElement('div');
        // console.log(item.badge_text === null);

        if(item.badge_text !== null){
            badgeTextDiv.classList.add('badgeDiv');
            badgeTextDiv.innerHTML = item.badge_text;
        }
        



        // adding details div info 

        let detailDiv = document.createElement('div');
        detailDiv.classList.add('detailDiv');

        let detailStrong = document.createElement('strong');
        detailStrong.classList.add('detailStrong');

        let detailUl = document.createElement('ul');
        detailUl.classList.add('detailUl');

        let detailLi = document.createElement('li');
        detailLi.classList.add('detailLi');

        detailStrong.innerHTML = `${item.title}..`;
        detailLi.innerHTML = item.vendor;




        // adding detail price section 

        let detailPrice = document.createElement('div');
        detailPrice.classList.add('detailPrice');

        let priceSpan1 = document.createElement('span');
        priceSpan1.classList.add('span1');

        let priceSpan2 = document.createElement('span');
        priceSpan2.classList.add('span2');

        let priceSpan3 = document.createElement('span');
        priceSpan3.classList.add('span3');

        priceSpan1.innerHTML = `Rs ${item.price}.00`;
        priceSpan2.innerHTML = `${item.compare_at_price}.00`;
        priceSpan3.innerHTML = calculatePercentage(item.price, item.compare_at_price) + '% Off';


        // add to cart button 
        let btn = document.createElement('button');
        btn.classList.add('btn');
        btn.innerHTML = 'Add to Cart';
        
        
        
        
        imgDiv.append(img);

        detailUl.append(detailLi);
        detailDiv.append(detailStrong, detailUl);

        detailPrice.append(priceSpan1, priceSpan2, priceSpan3);

        if(item.badge_text !== null){
            card.append(badgeTextDiv, imgDiv, detailDiv, detailPrice, btn);
        }
        else{
            card.append(imgDiv, detailDiv, detailPrice, btn);
        }

        

        cards.append(card);
    })

}


// ****************************************************************************************




function clickButton(e) {
    lists.forEach((list) => {
        list.classList.remove('active');
        e.classList.add('active');

    })
}


// ****************************************************************************************



// lists.forEach((item) => {
//     item.addEventListener('click', clickButton);
//     item.addEventListener('click', (e) => addCards(e));
// })

ul.addEventListener('click', (e) => {
    if(e.target.classList.contains('list')){
        clickButton(e.target);
        addCards(e.target);
    }
    else if( e.target.classList.contains('span')){
        clickButton(e.target.parentElement);
        addCards(e.target.parentElement);
    }
})




function addCards(ele) {
    if (!data) {
        console.log("Data is not available yet.");
        return;
    }

    // console.log(e.children[1].innerHTML);
    console.log(ele.innerHTML);
    if(ele.children[1].innerText == 'Men'){
        index = 0;
    }
    else if(ele.children[1].innerText == 'Women'){
        index = 1;
    }
    else if(ele.children[1].innerText == 'Kids'){
        index = 2;
    }

    addData(index);
}
