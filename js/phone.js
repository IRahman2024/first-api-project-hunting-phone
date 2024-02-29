const loadPhone = async (brand='13', isShowALL) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${brand}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones, isShowALL);//display function e phones data pass kore
}

// function loadPhone(){
//     fetch('https://openapi.programming-hero.com/api/phones?search=iphone')
//     .then(res => res.json())
//     .then(data => console.log(data.data));
// }

//eikhane forEach function use kore individual data pawar kaj hoise 
const displayPhones = (phones, isShowALL) =>{

    //step 1: create point where to add dynamic code
    const phoneContainer = document.getElementById('phone-container');

    //remove old search phone with new one
    phoneContainer.textContent = '';

    //display show all button if there are more then 10 cards
    const showAll = document.getElementById('show-all-container');
    if(phones.length > 9 && !isShowALL)
        showAll.classList.remove('hidden');
    else
        showAll.classList.add('hidden');
    
    if(!isShowALL){
        // display only 10 phones at a time
        phones = phones.slice(0, 10);
    }

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
                <div class="card-actions justify-center">
                <!-- // ${phone.slug} part take quation e rakha hoise karon phone.slug ekta non-string variable return kore-->
                    <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show detail</button>
                </div>
                </div>
        `;
        //step 4: append html
        phoneContainer.appendChild(phoneCard);
    });
    toggleLoadingSpinner(false);


} 

// handle search button
const handleSearch = (isShowALL) => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText, isShowALL);
}

const toggleLoadingSpinner = (isLoading) =>{
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading)
        loadingSpinner.classList.remove('hidden');
    else
        loadingSpinner.classList.add('hidden');
}

const showAll = () =>{
    handleSearch(true);
}

const handleShowDetail = async (id) =>{
    // console.log('clicked by ', id);
    //
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    showPhoneDetails(phone);
}

const showPhoneDetails = (phones) =>{
    console.log(phones);
    const phoneName = document.getElementById('show-detail-phone-name');
    phoneName.innerText = phones.name;

    const showDetailContainer = document.getElementById('show-detail-container');

    showDetailContainer.innerHTML = `
    <img src="${phones.image}" alt="">
    <p>storage: ${phones?.mainFeatures.storage}</p>
    <!-- // etar mane hoilo je jodi gps na thake taile no gps dekhabe  -->
    <p>storage: ${phones?.others?.gps || 'no gps available'}</p>
    <!--//this is ternary method -->
    <p>storage: ${phones?.others?.gps ? phones?.others?.gps : 'no gps available'}</p>
    
    `






    show_detail_modal.showModal()
}

loadPhone();