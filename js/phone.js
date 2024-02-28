const loadPhone = async (searchText = '13') => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones);
};

const displayPhones = (phones) => {
  //1.
  const phoneContainer = document.getElementById("phone-container");
  //clear phone container cards before adding new cards
  phoneContainer.textContent = "";

  //display show all button if there are more than 12 phone
  const showAllContainer = document.getElementById("show-all-container");
  if (phones.length > 12) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }

  //show only first 12 phone
  phones = phones.slice(0, 12);

  phones.forEach((phone) => {
    // console.log(phone);
    //2. create a div
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card bg-base-100 shadow-xl`;

    //3. set inner html
    phoneCard.innerHTML = `
        <figure class="px-10 pt-10">
                        <img src="${phone.image}" alt="Shoes"
                            class="rounded-xl" />
                    </figure>
                    <div class="card-body items-center text-center">
                        <h2 class="card-title">${phone.phone_name}</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div class="card-actions">
                            <button onclick="handleShowDetail('${phone.slug}');" class="btn btn-primary">Show Details</button>
                        </div>
                    </div>
        `;

    //4. append Child
    phoneContainer.appendChild(phoneCard); 
  });

  //hide spinner/loader
  toggleSpinner(false)
};

//
const handleShowDetail = async(id) =>{
    // console.log("clicked show details", id); 
    //load single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json()
const phone = data.data
    showPhoneDetails(phone);
}

const showPhoneDetails = (phone) =>{
    console.log(phone)
    const phoneName = document.getElementById("show-detail-phone-name")
    phoneName.innerText = phone.name;
    const showDetailContainer = document.getElementById("show-detail-container")
    showDetailContainer.innerHTML = `
    <img src="${phone.image}" alt="" />
    <p><span class="text-2xl">Storage:</span> ${phone.mainFeatures.storage}</p>
    <p><span class="text-2xl">Display Size:</span> ${phone.mainFeatures.displaySize}</p>
    <p><span class="text-2xl">Chipset:</span> ${phone.mainFeatures.chipSet}</p>
    <p><span class="text-2xl">Release Date:</span> ${phone.releaseDate}</p>
    <p><span class="text-2xl">Slug:</span> ${phone.slug}</p>
    `

    //show the modal
    show_modal.showModal()

}

//handle search button
const handleSearch = () => {
  toggleSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  console.log(searchText);
  loadPhone(searchText);
};

const handleSearch2 = () => {
  const searchField2 = document.getElementById("search-field2");
  const searchText2 = searchField2.value;
  loadPhone(searchText2);
};

const toggleSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner");
  if(isLoading){
    loadingSpinner.classList.remove("hidden");
  }
  else{
    loadingSpinner.classList.add("hidden")
  }

};

loadPhone()