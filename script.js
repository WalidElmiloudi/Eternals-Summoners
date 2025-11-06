
const prices = {
  Mythical: 12.00,
  Legendary: 10.00,
  Epic: 8.00,
  Rare: 6.00,
  Common: 4.00
};

const quantities = {
  Mythical: 1,
  Legendary: 10,
  Epic: 100,
  Rare: 1000,
  Common: 10000
};

let favorites = [];

let allCards = [];
let currentPage = 1;
const cardsPerPage = 8;

async function loadCards() {
  const res = await fetch("cards.json");
  const data = await res.json();
  allCards = data.cards;
  displayCards(allCards);
}

function displayCards(cards) {
  const container = document.getElementById("cardsDisplay");
  container.innerHTML = "";

  const totalPages = Math.ceil(cards.length / cardsPerPage);
  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const cardsToDisplay = cards.slice(startIndex, endIndex);

  cards.forEach(card => {
    const price = prices[card.rarity];
    const quantity = quantities[card.rarity];
    const cardDiv = document.createElement("div");
    cardDiv.innerHTML = `
       <div class="w-39.5 h-64 border border-white flex flex-col justify-around items-center xl:scale-160 xl:mt-20 xl:mx-20 xl:my-30 2xl:scale-200 2xl:mt-40">
    <div class="w-35.5 h-47.5 bg-black flex justify-center items-center">
      <div class="w-33 h-45.25 border border-[#bea301] flex flex-col items-center justify-evenly overflow-hidden">
        <div class="w-31  border border-[#bea301] relative">
          <img  class="animate-pulse" src="${card['bg-img']}" alt="${card['rarity']} background">
          <img class="absolute bottom-0 right-0" src="${card['caracter']}" alt="${card['name']}">
          <div
            class="w-3.5 h-3.5 bg-black border border-[#bea301] absolute z-20 flex justify-center items-center top-0 rotate-45">
            <p class="${card['txt-color']} text-xs -rotate-45">${card['power']}</p>
          </div>
        </div>
        <div class="flex relative -mt-0.5">
          <div class="w-1 h-1 border border-[#bea301] bg-black absolute rotate-45 -left-1.5 top-1 z-10"></div>
          <div class="w-2 h-2 border border-[#bea301] bg-black absolute rotate-45 -left-1 top-0.5"></div>
          <div class="w-21.5 h-3 border border-[#bea301] flex justify-center items-center rounded-full">
            <p class="${card['txt-color']} text-[6px]">${card['name']}</p>
          </div>
          <div class="w-2 h-2 border border-[#bea301] bg-black absolute rotate-45 -right-1 top-0.5"></div>
          <div class="w-1 h-1 border border-[#bea301] bg-black absolute rotate-45 -right-1.5 top-1"></div>
        </div>
        <div>

        </div>
        <div class="flex relative items-center -mt-2">
          <div class="flex items-center relative -top-0.25">
            <div class="w-0.75 h-0.75 bg-[#BEA301] rotate-45"></div>
            <hr class="w-5 border-0.5 border-[#BEA301]">
          </div>
          <p class="text-[7px] ${card['txt-color']}">${card['rarity']}</p>
          <div class="flex items-center relative -top-0.25">
            <hr class="w-5 border-0.5 border-[#BEA301]">
            <div class="w-0.75 h-0.75  bg-[#BEA301] rotate-45"></div>
          </div>
        </div>
        <p class="text-[5px] ${card['txt-color']} -mt-1.75">${card['role']}</p>
        <div class="border border-[#BEA301] py-0.25 px-1 flex items-center justify-center rounded-full -mt-1">
          <p class="text-[5px] ${card['txt-color']}">${card['element']}</p>
        </div>
        <div class="flex relative w-full justify-center items-end">
          <div class="flex flex-col items-center absolute -bottom-1 left-0.5">
            <p class="text-[5px] text-[#BEA301]">${card['atk']} Pt</p>
            <div class="border border-[#BEA301] flex items-center justify-center rounded-full w-5.5 h-5.5">
              <img src="imgs/atk icon.png" alt=" swords">
            </div>
          </div>
          <p class="text-[4.5px] text-[#bea301]">“<span class="${card['txt-color']}"> ${card['description']} </span>"</p>
          <div class="flex flex-col items-center absolute -bottom-1 right-0.5">
            <p class="text-[5px] text-[#BEA301]">${card['def']} Pt</p>
            <div class="border border-[#BEA301] flex items-center justify-center rounded-full w-5.5 h-5.5">
              <img src="imgs/def icon.png" alt=" shield">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col items-center gap-1">
      <div class="flex items-center justify-center gap-2">
        <p class="text-[10px] text-white">$ <span>${price}</span> USD</p>
        <p class="text-[7.5px] text-white">Quantity : <span>${quantity}</span></p>
      </div>
      <div class="flex items-center gap-1">
        <div class="border border-white flex justify-center items-center py-1 px-1 rounded-full"><p class="text-[7px] text-white cart-${card.id} cursor-pointer">Add To Cart</p></div>
        <div class="flex items-center gap-1 border border-white rounded-full pr-1">
          <img src="imgs/heart.png" alt="heart">
          <p class="text-[8px] text-white fav-${card.id} cursor-pointer">Favorits</p>
        </div>
      </div>
    </div>
  </div>
    `;
    container.appendChild(cardDiv);
    const favBtn = cardDiv.querySelector(`.fav-${card.id}`);
        favBtn.addEventListener("click", () => {
    
    let storedFavs = JSON.parse(localStorage.getItem("favorites")) || [];
    const existingIndex = storedFavs.findIndex(fav => fav.id === card.id);

  
    if (!storedFavs.find(fav => fav.id === card.id)) {
        storedFavs.push(card);
        localStorage.setItem("favorites", JSON.stringify(storedFavs));
        alert(`${card.name} added to favorites!`);
    } else {
        storedFavs.splice(existingIndex, 1);
            localStorage.setItem("favorites", JSON.stringify(storedFavs));
            alert(`${card.name} removed from favorites!`);
    }
});
  });
   displayPagination(totalPages, cards);

}

function displayPagination(totalPages, cards) {
  const paginationContainer = document.getElementById("pagination");
  if (!paginationContainer) return;
  
  paginationContainer.innerHTML = "";

  if (totalPages <= 1) return; 

  const paginationDiv = document.createElement("div");
  paginationDiv.className = "flex items-center justify-center gap-2 mt-4";

  const prevBtn = document.createElement("button");
  prevBtn.innerHTML = "Previous";
  prevBtn.className = `px-4 py-2 text-white border border-white rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-white hover:text-black'}`;
  prevBtn.disabled = currentPage === 1;
  prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      displayCards(cards);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
  paginationDiv.appendChild(prevBtn);


  for (let i = 1; i <= totalPages; i++) {
    const pageBtn = document.createElement("button");
    pageBtn.innerHTML = i;
    pageBtn.className = `px-3 py-2 text-white border border-white rounded cursor-pointer ${i === currentPage ? 'bg-white text-black' : 'hover:bg-white hover:text-black'}`;
    pageBtn.addEventListener("click", () => {
      currentPage = i;
      displayCards(cards);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    paginationDiv.appendChild(pageBtn);
  }


  const nextBtn = document.createElement("button");
  nextBtn.innerHTML = "Next";
  nextBtn.className = `px-4 py-2 text-white border border-white rounded ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-white hover:text-black'}`;
  nextBtn.disabled = currentPage === totalPages;
  nextBtn.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      displayCards(cards);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
  paginationDiv.appendChild(nextBtn);

  paginationContainer.appendChild(paginationDiv);
}

function filterByRarity(rarity) {
  currentPage = 1;
  if (rarity === "Above The Rank") {
    const container = document.getElementById("cardsDisplay");
    container.innerHTML = " <p class ='text-white text-xs'> Not Available Yet . </p>";
    const paginationContainer = document.getElementById("pagination");
    if (paginationContainer) paginationContainer.innerHTML = "";
  } else {
    const filtered = allCards.filter(card => card.rarity === rarity);
    displayCards(filtered);
  }
}
document.addEventListener("DOMContentLoaded", () => {
  loadCards();

  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const rarity = btn.dataset.rarity;
      filterByRarity(rarity);
    });
  });
});

function displayFavorites() {
    const favContainer = document.getElementById("favoritesDisplay");
    favContainer.innerHTML = "";

    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if(favorites.length === 0){
        favContainer.innerHTML = "<p class='text-white'>No favorite cards yet!</p>";
        return;
    }

    favorites.forEach(card => {
      const price = prices[card.rarity];
const quantity = quantities[card.rarity];
        const cardDiv = document.createElement("div");
        cardDiv.innerHTML = `
       <div class="w-39.5 h-64 border border-white flex flex-col justify-around items-center xl:scale-160 xl:mt-20 xl:mx-20 xl:my-30 2xl:scale-200 2xl:mt-40">
    <div class="w-35.5 h-47.5 bg-black flex justify-center items-center">
      <div class="w-33 h-45.25 border border-[#bea301] flex flex-col items-center justify-evenly overflow-hidden">
        <div class="w-31  border border-[#bea301] relative">
          <img  class="animate-pulse" src="${card['bg-img']}" alt="${card['rarity']} background">
          <img class="absolute bottom-0 right-0" src="${card['caracter']}" alt="${card['name']}">
          <div
            class="w-3.5 h-3.5 bg-black border border-[#bea301] absolute z-20 flex justify-center items-center top-0 rotate-45">
            <p class="${card['txt-color']} text-xs -rotate-45">${card['power']}</p>
          </div>
        </div>
        <div class="flex relative -mt-0.5">
          <div class="w-1 h-1 border border-[#bea301] bg-black absolute rotate-45 -left-1.5 top-1 z-10"></div>
          <div class="w-2 h-2 border border-[#bea301] bg-black absolute rotate-45 -left-1 top-0.5"></div>
          <div class="w-21.5 h-3 border border-[#bea301] flex justify-center items-center rounded-full">
            <p class="${card['txt-color']} text-[6px]">${card['name']}</p>
          </div>
          <div class="w-2 h-2 border border-[#bea301] bg-black absolute rotate-45 -right-1 top-0.5"></div>
          <div class="w-1 h-1 border border-[#bea301] bg-black absolute rotate-45 -right-1.5 top-1"></div>
        </div>
        <div>

        </div>
        <div class="flex relative items-center -mt-2">
          <div class="flex items-center relative -top-0.25">
            <div class="w-0.75 h-0.75 bg-[#BEA301] rotate-45"></div>
            <hr class="w-5 border-0.5 border-[#BEA301]">
          </div>
          <p class="text-[7px] ${card['txt-color']}">${card['rarity']}</p>
          <div class="flex items-center relative -top-0.25">
            <hr class="w-5 border-0.5 border-[#BEA301]">
            <div class="w-0.75 h-0.75  bg-[#BEA301] rotate-45"></div>
          </div>
        </div>
        <p class="text-[5px] ${card['txt-color']} -mt-1.75">${card['role']}</p>
        <div class="border border-[#BEA301] py-0.25 px-1 flex items-center justify-center rounded-full -mt-1">
          <p class="text-[5px] ${card['txt-color']}">${card['element']}</p>
        </div>
        <div class="flex relative w-full justify-center items-end">
          <div class="flex flex-col items-center absolute -bottom-1 left-0.5">
            <p class="text-[5px] text-[#BEA301]">${card['atk']} Pt</p>
            <div class="border border-[#BEA301] flex items-center justify-center rounded-full w-5.5 h-5.5">
              <img src="imgs/atk icon.png" alt=" swords">
            </div>
          </div>
          <p class="text-[4.5px] text-[#bea301]">“<span class="${card['txt-color']}"> ${card['description']} </span>"</p>
          <div class="flex flex-col items-center absolute -bottom-1 right-0.5">
            <p class="text-[5px] text-[#BEA301]">${card['def']} Pt</p>
            <div class="border border-[#BEA301] flex items-center justify-center rounded-full w-5.5 h-5.5">
              <img src="imgs/def icon.png" alt=" shield">
            </div>
          </div>
        </div>
      </div>
    </div>
   <div class="flex flex-col items-center gap-1">
      <div class="flex items-center justify-center gap-2">
        <p class="text-[10px] text-white">$ <span>${price}</span> USD</p>
        <p class="text-[7.5px] text-white">Quantity : <span>${quantity}</span></p>
      </div>
      <div class="flex items-center gap-1">
        <div class="border border-white flex justify-center items-center py-1 px-1 rounded-full"><p class="text-[7px] text-white cart-${card.id} cursor-pointer">Add To Cart</p></div>
        <div class="flex items-center gap-1 border border-white rounded-full pr-1">
          <img src="imgs/heart.png" alt="heart">
          <p class="text-[8px] text-white fav-${card.id} cursor-pointer">Favorits</p>
        </div>
      </div>
    </div>
  </div>
    `;
        favContainer.appendChild(cardDiv);
        const favBtn = cardDiv.querySelector(`.fav-${card.id}`);
        favBtn.addEventListener("click", () => {
            let storedFavs = JSON.parse(localStorage.getItem("favorites")) || [];
            storedFavs = storedFavs.filter(fav => fav.id !== card.id);
            localStorage.setItem("favorites", JSON.stringify(storedFavs));
            alert(`${card.name} removed from favorites!`);
            displayFavorites();
        });
    });
}
document.addEventListener("DOMContentLoaded", () => {
    displayFavorites();
});
