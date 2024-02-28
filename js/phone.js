const loadPhone = async (brand) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${brand}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones);//display function e phones data pass kore
}

// function loadPhone(){
//     fetch('https://openapi.programming-hero.com/api/phones?search=iphone')
//     .then(res => res.json())
//     .then(data => console.log(data.data));
// }

//eikhane forEach function use kore individual data pawar kaj hoise 
const displayPhones = phones =>{

    //step 1: create point where to add dynamic code
    const phoneContainer = document.getElementById('phone-container');

    //remove old search phone with new one
    phoneContainer.textContent = '';

    phones.forEach(phone =>{
        // console.log(phone);
        //step 2: create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-gray-500 shadow-xl p-8`;
        // step 3: set inner html
        phoneCard.innerHTML = `
                <figure><img src="${phone.image}" alt="Shoes" /></figure>
                <div class="card-body">
                <h2 class="card-title">${phone.phone_name}</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div class="card-actions justify-end">
                    <button class="btn btn-primary">Buy Now</button>
                </div>
                </div>
        `;
        //step 4: append html
        phoneContainer.appendChild(phoneCard);
    })
} 

// handle search button
const handleSearch = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText);
}


// loadPhone();