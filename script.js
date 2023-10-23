//todo fetch element from the html
let searchButton = document.querySelector("#search");
let cards = document.querySelector(".cards");
let cardList = document.querySelectorAll(".card");
let search_phone_container = document.querySelector(".search_phone");
let showAllDiv = document.querySelector("#ShowAllDiv");
let showAllButton = document.querySelector("#showAll");
let defalutDetailButton = document.querySelectorAll(".content button")
console.log(defalutDetailButton);

//!for default phone card-------------------

//todo object for default phone slug value
let defaultPhoneSlug = {
    0 : "apple_iphone_13_mini-11104",
    1 : "apple_iphone_13_pro-11102",
    2 : "apple_iphone_13_pro_max-11089",
    3 : "apple_iphone_13-11103",
    4 : "samsung_galaxy_a13_5g-11149",
}

//todo default button click and show detail for phone
defalutDetailButton.forEach((item,idx)=>{
    item.addEventListener("click",(e)=>{
        showDetail(defaultPhoneSlug[idx]);
    })
});


//!for dynamic phone card----------------

//todo search for the phone whne we search and click on search button
let searchBarText = "";
searchButton.addEventListener("click", (e) => {
  searchBarText = document.querySelector("input").value?.toLowerCase();
  // console.log(searchBarText);

  //if serach bar is empty
  if (searchBarText.length == 0) {
    cards.style.display = "none";
    let newPara = document.createElement("p");
    newPara.innerText = "Please Write something in Search Bar";
    newPara.style.color = "red";
    newPara.style.fontWeight = "700";
    newPara.classList.add("newParaStyle");
    console.log(newPara.innerText);
    search_phone_container.appendChild(newPara);
    return;
  }

  //if searchbar is not empty
  showAllDiv.style.display = "flex";
  cards.innerHTML = "";
  addPhones();
});

//todo function of serach value and add that type of phone in display
async function addPhones() {
    let data = await fetch(
      `https://openapi.programming-hero.com/api/phones?search=${searchBarText}`
    );
  
    let dataVal = await data.json();
    let arr = dataVal.data;
    console.log(arr);
    console.log(searchBarText);

    //iphone value is less then 20 so that we have to add condition
    let num = 0;
    if(searchBarText == "iphone"){
      num = arr.length-1;
    }else{
      num =20;
    }

    for (let i = 0; i < cardList.length; i++) {
      cardList[i].style.display = "none";
    }
  
    for (let i = 0; i <= num; i++) {
      //create new div
      let newDiv = document.createElement("div");
      newDiv.classList.add("card");
  
      //add details on new div
      newDiv.innerHTML = `
          <img src=${arr[i].image} alt="" />
          <div class="content">
            <h2>${arr[i].phone_name}</h2>
            <p>
              There are many variations of passages of available, but the
              majority have suffered
            </p>
            <button>SHOW DETAILS</button>
          </div>
          `;
  
      cards.appendChild(newDiv);
    }

    let detailButtons = document.querySelectorAll(".cards button")
    console.log(detailButtons);
    
    detailButtons.forEach((item,idx)=>{
        item.addEventListener("click",(e)=>{
            console.log(arr[idx].slug);
            showDetail(arr[idx].slug);
        })
    })
     
  }

//todo show all phone when we click on show all button
showAllButton.addEventListener("click", () => {
    // console.log("showALLPHONE");
    showAllDiv.style.display = "none"
    addAllPhones();
    
});


//todo add all phones

async function addAllPhones() {
  let data = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchBarText}`
  );

  let dataVal = await data.json();
  let arr = dataVal.data;
  console.log(arr);
//   console.log(searchBarText);

  for (let i = 0; i < cardList.length; i++) {
    cardList[i].style.display = "none";
  }

  for (let i = 21; i < arr.length; i++) {
    //create new div
    let newDiv = document.createElement("div");
    newDiv.classList.add("card");

    //add details on new div
    newDiv.innerHTML = `
        <img src=${arr[i].image} alt="" />
        <div class="content">
          <h2>${arr[i].phone_name}</h2>
          <p>
            There are many variations of passages of available, but the
            majority have suffered
          </p>
          <button>SHOW DETAILS</button>
        </div>
        `;

    cards.appendChild(newDiv);
  }

  let detailButtons = document.querySelectorAll(".cards button")
    console.log(detailButtons);
    
    detailButtons.forEach((item,idx)=>{
        item.addEventListener("click",(e)=>{
            console.log(arr[idx].slug);
            showDetail(arr[idx].slug);
        })
    })
  
}

//todo add pop up menu;
async function showDetail(slugOfPhone){
    let data = await fetch(`https://openapi.programming-hero.com/api/phone/${slugOfPhone}`);
    let dataFormat = await data.json();
    
    let mainNewDiv = document.createElement("div");
    let newDiv = document.createElement("div");
    mainNewDiv.classList.add("deatilMainDiv");
    
    let sensorData = dataFormat.data.mainFeatures.sensors;

    newDiv.innerHTML = `
        <img src=${dataFormat.data.image} alt="" />
        <h3>${dataFormat.data.name}</h3>
        <p>Brand: ${dataFormat.data.brand}</p>
        <br/>
        <p>Storage: ${dataFormat.data.mainFeatures.storage}</p>
        <p>ChipSet: ${dataFormat.data.mainFeatures.chipSet}</p>
        <p>Sensors:<br/> ${sensorData}</p>
        <p>${dataFormat.data.releaseDate}</p>
        <button class=closeButton>CLOSE</button>
    `
    newDiv.classList.add("deatilSubDiv");
    document.body.appendChild(mainNewDiv).appendChild(newDiv);
    let buttonClose = document.querySelector(".deatilMainDiv button");
    buttonClose.addEventListener("click",()=>{
        buttonClose.parentElement.parentElement.remove();
    })
    
};