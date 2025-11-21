
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
let carts = [];
let allCards = [];
let deck = [];
let Hand = [0, 0, 0, 0, 0];
let inHand = [];
let handCount = 0;
let opposantHandCount = 0;
let opposantHand = [0, 0, 0, 0, 0];
let opposantCards = [];

let playDeck = JSON.parse(localStorage.getItem("deck")) || [];
let opposantPlayDeck = JSON.parse(localStorage.getItem("Cards")) || [];

async function loadCards() {
  const res = await fetch("cards.json");
  const data = await res.json();
  allCards = data.cards;
  localStorage.setItem("Cards", JSON.stringify(allCards));
  displayCards(allCards);
}

function displayCards(cards) {
  const container = document.getElementById("cardsDisplay");
  if (container) {
    container.innerHTML = "";
  }


  cards.forEach(card => {
    const price = prices[card.rarity];
    const storedQuantities = JSON.parse(localStorage.getItem("quantities")) || quantities;
    const quantity = storedQuantities[card.rarity];
    const cardDiv = document.createElement("div");

    const storedCarts = JSON.parse(localStorage.getItem("carts")) || [];
    const storedFavs = JSON.parse(localStorage.getItem("favorites")) || [];
    const isInCart = storedCarts.find(cart => cart.id === card.id);
    const isInFavorits = storedFavs.find(fav => fav.id === card.id);
    const buttonText = isInCart ? "Added To Cart" : "Add To Cart";
    const buttonColor = isInCart ? "text-[#bea301]" : "text-white";
    const buttonColorFav = isInFavorits ? "text-[#bea301]" : "text-white";

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
        <div class="border border-white flex justify-center items-center py-1 px-1 rounded-full"><p class="text-[7px] ${buttonColor} cart-${card.id} cursor-pointer">${buttonText}</p></div>
        <div class="flex items-center gap-1 border border-white rounded-full py-1 px-3">
          <p class="text-[8px] ${buttonColorFav} fav-${card.id} cursor-pointer">Favorits</p>
        </div>
      </div>
    </div>
  </div>
    `;
    if (container) {
      container.appendChild(cardDiv);
    }
    const favBtn = cardDiv.querySelector(`.fav-${card.id}`);
    favBtn.addEventListener("click", () => {

      let storedFavs = JSON.parse(localStorage.getItem("favorites")) || [];
      const existingIndex = storedFavs.findIndex(fav => fav.id === card.id);


      if (!storedFavs.find(fav => fav.id === card.id)) {
        storedFavs.push(card);
        localStorage.setItem("favorites", JSON.stringify(storedFavs));
      } else {
        storedFavs.splice(existingIndex, 1);
        localStorage.setItem("favorites", JSON.stringify(storedFavs));
      }
      updateFavorisButtons();
      displayCards(allCards);
    });
    const cartBtn = cardDiv.querySelector(`.cart-${card.id}`);
    cartBtn.addEventListener("click", () => {

      let storedCarts = JSON.parse(localStorage.getItem("carts")) || [];
      const existingIndex2 = storedCarts.findIndex(cart => cart.id === card.id);




      if (!storedCarts.find(cart => cart.id === card.id)) {
        const cartItem = { ...card, quantityOrder: 1 };
        storedCarts.push(cartItem);
        localStorage.setItem("carts", JSON.stringify(storedCarts));

      } else {
        storedCarts.splice(existingIndex2, 1);
        localStorage.setItem("carts", JSON.stringify(storedCarts));
      }
      displayCarts();
      updateCartCounter();
      updateTotalPrice();
      updateCartButtons();
      displayCards(allCards);
    });
  });

}
function updateCartCounter() {
  const storedCarts = JSON.parse(localStorage.getItem("carts")) || [];
  const counterElement = document.querySelectorAll(".counts");

  counterElement.forEach((count) => {
    if (count) {
      count.textContent = storedCarts.length;
    } else {
      console.error("Counter element with id 'counts' not found!");
    }
  });

}
function updateTotalPrice() {
  const storedCarts = JSON.parse(localStorage.getItem("carts")) || [];
  let totalPrice = 0;

  storedCarts.forEach(card => {
    const cardPrice = prices[card.rarity];
    const quantity = card.quantityOrder || 1;
    totalPrice += cardPrice * quantity;
  });

  const totalElement = document.getElementById("total");
  if (totalElement) {
    totalElement.textContent = totalPrice.toFixed(2);
  }
}
function filterByRarity(rarity) {
  if (rarity === "Above The Rank") {
    const container = document.getElementById("cardsDisplay");
    container.innerHTML = " <p class ='text-white text-xs'> Not Available Yet . </p>";
  } else {
    const filtered = allCards.filter(card => card.rarity === rarity);
    displayCards(filtered);
  }
}
document.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("quantities")) {
    localStorage.setItem("quantities", JSON.stringify(quantities));
  }
  loadCards();
  updateCartCounter();
  updateTotalPrice();
  updateCartButtons();
  updateFavorisButtons();
  // playDisplay(playDeck);
  // updateDeckCounter(playDeck);
  // drawCard();
  restack();

  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const rarity = btn.dataset.rarity;
      filterByRarity(rarity);
    });
  });
});

function displayFavorites() {
  const favContainer = document.getElementById("favoritesDisplay");
  if (favContainer) {
    favContainer.innerHTML = "";
  }

  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  // if (favorites.length === 0) {
  //   favContainer.innerHTML = "<p class='text-white'>No favorite cards yet!</p>";
  //   return;
  // }

  favorites.forEach(card => {
    const price = prices[card.rarity];
    const quantity = quantities[card.rarity];
    const cardDiv = document.createElement("div");

    const storedCarts = JSON.parse(localStorage.getItem("carts")) || [];
    const storedFavs = JSON.parse(localStorage.getItem("favorites")) || [];
    const isInCart = storedCarts.find(cart => cart.id === card.id);
    const isInFavorits = storedFavs.find(fav => fav.id === card.id);
    const buttonText = isInCart ? "Added To Cart" : "Add To Cart";
    const buttonColor = isInCart ? "text-[#bea301]" : "text-white";
    const buttonColorFav = isInFavorits ? "text-[#bea301]" : "text-white";

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
        <div class="border border-white flex justify-center items-center py-1 px-1 rounded-full"><p class="text-[7px] ${buttonColor} cart-${card.id} cursor-pointer">${buttonText}</p></div>
        <div class="flex items-center gap-1 border border-white rounded-full py-1 px-3">
          <p class="text-[8px] ${buttonColorFav} fav-${card.id} cursor-pointer">Favorits</p>
        </div>
      </div>
    </div>
  </div>
    `;
    if (favContainer) {
      favContainer.appendChild(cardDiv);
    }
    const favBtn = cardDiv.querySelector(`.fav-${card.id}`);
    favBtn.addEventListener("click", () => {
      let storedFavs = JSON.parse(localStorage.getItem("favorites")) || [];
      storedFavs = storedFavs.filter(fav => fav.id !== card.id);
      localStorage.setItem("favorites", JSON.stringify(storedFavs));
      updateFavorisButtons();
      displayFavorites();
    });
    const cartBtn = cardDiv.querySelector(`.cart-${card.id}`);
    cartBtn.addEventListener("click", () => {

      let storedCarts = JSON.parse(localStorage.getItem("carts")) || [];
      const existingIndex2 = storedCarts.findIndex(cart => cart.id === card.id);



      if (!storedCarts.find(cart => cart.id === card.id)) {
        storedCarts.push(card);
        localStorage.setItem("carts", JSON.stringify(storedCarts));
      } else {
        storedCarts.splice(existingIndex2, 1);
        localStorage.setItem("carts", JSON.stringify(storedCarts));
      }
      displayCarts();
      updateCartCounter();
      updateTotalPrice();
      displayFavorites();
    });
  });
}
document.addEventListener("DOMContentLoaded", () => {
  displayFavorites();
});
function displayCarts() {
  const cartContainer = document.getElementById("cartDisplay");
  if (cartContainer) {
    cartContainer.innerHTML = "";
  }

  const carts = JSON.parse(localStorage.getItem("carts")) || [];

  if (carts.length === 0) {
    if (cartContainer) {
      cartContainer.innerHTML = "<p class='text-black text-xl font-bold'>Nothing added to cart yet!</p>";
      return;
    }
  }

  carts.forEach((card, index) => {
    const price = prices[card.rarity];
    const quantity = quantities[card.rarity];
    const cardDiv = document.createElement("div");
    let quantityOrder = card.quantityOrder || 1;

    cardDiv.innerHTML = `
       <div class="bg-[#D6B601] w-88 h-35 flex items-center rounded-[5px] relative">
            <div class="w-35.5 h-47.5 bg-black flex justify-center items-center scale-65 -ml-5">
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
            <div>
              <p class="text-black text-base font-bold">${card['name']}</p>
              <p class="text-black text-base">${card['rarity']}</p>
              <p class="text-black text-basej">$${price} USD </p>
              <p class="text-black text-base">In Stock</p>
              <div class="flex gap-6">
                <p class="text-black text-base">Quantity</p>
                <div class="flex items-center gap-0.5">
                  <div class=" py-1 px-3 rounded-sm bg-black flex justify-center items-center">
                    <p class="text-[#BEA301] text-sm qty-display-${index}">${quantityOrder}</p>
                  </div>
                  <div class="flex flex-col gap-0.5">
                    <div class="w-3 h-3 rounded-[2px] bg-[#584B00] flex justify-center items-center increase cursor-pointer active:bg-[#2c2601]"><i
                        class="fi fi-rr-angle-small-up text-xs text-[#A79843] pt-1"></i></div>
                    <div class="w-3 h-3 rounded-[2px] bg-[#584B00] flex justify-center items-center decrease cursor-pointer active:bg-[#2c2601]"><i
                        class="fi fi-rr-angle-small-down text-xs text-[#A79843] pt-1"></i></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-5 h-5 rounded-full bg-black flex justify-center items-center absolute top-0.5 right-0.5 rm-${card['id']} cursor-pointer"><i
                class="fi fi-rr-cross-small text-base text-[#BEA301] pt-1.5"></i></div>
          </div>
    `;
    if (cartContainer) {
      cartContainer.appendChild(cardDiv);
    }
    const rmBtn = cardDiv.querySelector(`.rm-${card['id']}`);
    rmBtn.addEventListener("click", () => {
      let storedCarts = JSON.parse(localStorage.getItem("carts")) || [];
      storedCarts = storedCarts.filter(rm => rm.id !== card.id);
      localStorage.setItem("carts", JSON.stringify(storedCarts));

      displayCarts();
      updateCartCounter();
      updateTotalPrice();
      updateCartButtons();
    });

    const augmentation = cardDiv.querySelector(".increase");
    const abaissement = cardDiv.querySelector(".decrease");
    const qtyDisplay = cardDiv.querySelector(`.qty-display-${index}`);

    augmentation.addEventListener("click", () => {
      if (quantityOrder < quantity) {
        quantityOrder++;
        qtyDisplay.textContent = quantityOrder;

        let storedCarts = JSON.parse(localStorage.getItem("carts")) || [];
        const cartIndex = storedCarts.findIndex(cart => cart.id === card.id);
        if (cartIndex !== -1) {
          storedCarts[cartIndex].quantityOrder = quantityOrder;
          localStorage.setItem("carts", JSON.stringify(storedCarts));
        }
        updateTotalPrice();
      }
    });

    abaissement.addEventListener("click", () => {
      if (quantityOrder > 1) {
        quantityOrder--;
        qtyDisplay.textContent = quantityOrder;

        let storedCarts = JSON.parse(localStorage.getItem("carts")) || [];
        const cartIndex = storedCarts.findIndex(c => c.id === card.id);
        if (cartIndex !== -1) {
          storedCarts[cartIndex].quantityOrder = quantityOrder;
          localStorage.setItem("carts", JSON.stringify(storedCarts));
        }
        updateTotalPrice();
      }
    });

  });
}

function updateCartButtons() {
  const storedCarts = JSON.parse(localStorage.getItem("carts")) || [];
  const cartIds = storedCarts.map(cart => String(cart.id));

  document.querySelectorAll('[class*="cart-"]').forEach(btn => {
    const match = btn.className.match(/cart-([^\s]+)/);
    if (match) {
      const cardId = String(match[1]);
      if (cartIds.includes(cardId)) {
        btn.textContent = "Added To Cart";
        btn.className = `text-[7px] text-[#bea301] cart-${cardId} cursor-pointer`;
      } else {
        btn.textContent = "Add To Cart";
        btn.className = `text-[7px] text-white cart-${cardId} cursor-pointer`;
      }
    }
  });
}
function updateFavorisButtons() {
  const storedFavs = JSON.parse(localStorage.getItem("favorites")) || [];
  const favIds = storedFavs.map(fav => String(fav.id));

  document.querySelectorAll('[class*="fav-"]').forEach(btn => {
    const match = btn.className.match(/fav-([^\s]+)/);
    if (match) {
      const cardId = String(match[1]);
      if (favIds.includes(cardId)) {
        btn.textContent = "Favorits";
        btn.className = `text-[7px] text-[#bea301] fav-${cardId} cursor-pointer`;
      } else {
        btn.textContent = "Favorits";
        btn.className = `text-[7px] text-white fav-${cardId} cursor-pointer`;
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  displayCarts();
});

const cartIcon = document.querySelectorAll(".cart");
cartIcon.forEach((cart) => {
  cart.addEventListener("click", () => {
    const cartPopUp = document.querySelector("#cartpopup");
    cartPopUp.classList.toggle('hidden')
  })
});

function deckDisplay() {
  const deckCardsContainer = document.getElementById("deckDisplay");
  if (deckCardsContainer) {
    deckCardsContainer.innerHTML = "";
  }

  const deck = JSON.parse(localStorage.getItem("deck")) || [];

  // if (deck.length === 0) {
  //   if(deckContainer){
  //     deckContainer.innerHTML = "<p class='text-[#bea301]'>No items in your deck yet.</p>";
  //   return;
  //   }
    
  // }

  deck.forEach(card => {
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
          <p class="text-[4.5px] text-[#bea301]">"<span class="${card['txt-color']}"> ${card['description']} </span>"</p>
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
      <div class="flex items-center justify-center">
        <p class="text-sm text-white">Quantity : <span>${card.quantityOrder || 1}</span></p>
      </div>
    </div>
  </div>
    `;
    if (deckCardsContainer) {
      deckCardsContainer.appendChild(cardDiv);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const order = document.getElementById("order");

  let deck = JSON.parse(localStorage.getItem("deck")) || [];

  function saveDeck() {
    localStorage.setItem("deck", JSON.stringify(deck));
  }

  function safeDeckDisplay() {
    if (typeof deckDisplay === "function") {
      deckDisplay();
    }
  }

  if (order) {
    order.addEventListener("click", () => {
      const storedCarts = JSON.parse(localStorage.getItem("carts")) || [];

      if (storedCarts.length > 0) {

        deck = deck.concat(storedCarts);

        saveDeck();

        localStorage.setItem("carts", JSON.stringify([]));

        if (typeof displayCarts === "function") displayCarts();
        if (typeof updateCartCounter === "function") updateCartCounter();
        if (typeof updateTotalPrice === "function") updateTotalPrice();

        safeDeckDisplay();

        alert("Your order has been added to the deck!");
      } else {
        alert("Your cart is empty!");
      }
    });
  }
  safeDeckDisplay();
});
const header = document.querySelector(".header");

window.addEventListener("scroll", function () {
  header.classList.toggle("stick", window.scrollY > 0);
});

const q1 = document.querySelector(".q1")
if (q1) {
  q1.addEventListener("click", () => {
    document.querySelector(".a1").classList.toggle("hidden");
  });
}

const q2 = document.querySelector(".q2")
if (q2) {
  q2.addEventListener("click", () => {
    document.querySelector(".a2").classList.toggle("hidden");
  });
}

const q3 = document.querySelector(".q3")
if (q3) {
  q3.addEventListener("click", () => {
    document.querySelector(".a3").classList.toggle("hidden");
  });
}

const q4 = document.querySelector(".q4")
if (q4) {
  q4.addEventListener("click", () => {
    document.querySelector(".a4").classList.toggle("hidden");
  });
}

const q5 = document.querySelector(".q5")
if (q5) {
  q5.addEventListener("click", () => {
    document.querySelector(".a5").classList.toggle("hidden");
  });
}

// function playDisplay(deck) {
//   const ownedCardsContainer = document.getElementById("playDeckDisplay");
//   ownedCardsContainer.innerHTML = "";

//   if (deck.length === 0) {
//     ownedCardsContainer.innerHTML = "<p class='text-[#bea301]'>No items in your deck.</p>";
//     return;
//   }

//   deck.forEach(card => {
//     const cardDiv = document.createElement("div");


//     cardDiv.innerHTML = `
//     <div class="w-35.5 h-47.5 bg-black flex justify-center items-center scale-70 xl:scale-120 2xl:scale-180 -mt-6 -mb-6 xl:mt-6 xl:mb-6 2xl:mt-20 2xl:mb-20">
//       <div class="w-33 h-45.25 border border-[#bea301] flex flex-col items-center justify-evenly overflow-hidden">
//         <div class="w-31  border border-[#bea301] relative">
//           <img  class="animate-pulse" src="${card['bg-img']}" alt="${card['rarity']} background">
//           <img class="absolute bottom-0 right-0" src="${card['caracter']}" alt="${card['name']}">
//           <div
//             class="w-3.5 h-3.5 bg-black border border-[#bea301] absolute z-20 flex justify-center items-center top-0 rotate-45">
//             <p class="${card['txt-color']} text-xs -rotate-45">${card['power']}</p>
//           </div>
//         </div>
//         <div class="flex relative -mt-0.5">
//           <div class="w-1 h-1 border border-[#bea301] bg-black absolute rotate-45 -left-1.5 top-1 z-10"></div>
//           <div class="w-2 h-2 border border-[#bea301] bg-black absolute rotate-45 -left-1 top-0.5"></div>
//           <div class="w-21.5 h-3 border border-[#bea301] flex justify-center items-center rounded-full">
//             <p class="${card['txt-color']} text-[6px]">${card['name']}</p>
//           </div>
//           <div class="w-2 h-2 border border-[#bea301] bg-black absolute rotate-45 -right-1 top-0.5"></div>
//           <div class="w-1 h-1 border border-[#bea301] bg-black absolute rotate-45 -right-1.5 top-1"></div>
//         </div>
//         <div>

//         </div>
//         <div class="flex relative items-center -mt-2">
//           <div class="flex items-center relative -top-0.25">
//             <div class="w-0.75 h-0.75 bg-[#BEA301] rotate-45"></div>
//             <hr class="w-5 border-0.5 border-[#BEA301]">
//           </div>
//           <p class="text-[7px] ${card['txt-color']}">${card['rarity']}</p>
//           <div class="flex items-center relative -top-0.25">
//             <hr class="w-5 border-0.5 border-[#BEA301]">
//             <div class="w-0.75 h-0.75  bg-[#BEA301] rotate-45"></div>
//           </div>
//         </div>
//         <p class="text-[5px] ${card['txt-color']} -mt-1.75">${card['role']}</p>
//         <div class="border border-[#BEA301] py-0.25 px-1 flex items-center justify-center rounded-full -mt-1">
//           <p class="text-[5px] ${card['txt-color']}">${card['element']}</p>
//         </div>
//         <div class="flex relative w-full justify-center items-end">
//           <div class="flex flex-col items-center absolute -bottom-1 left-0.5">
//             <p class="text-[5px] text-[#BEA301]">${card['atk']} Pt</p>
//             <div class="border border-[#BEA301] flex items-center justify-center rounded-full w-5.5 h-5.5">
//               <img src="imgs/atk icon.png" alt=" swords">
//             </div>
//           </div>
//           <p class="text-[4.5px] text-[#bea301]">"<span class="${card['txt-color']}"> ${card['description']} </span>"</p>
//           <div class="flex flex-col items-center absolute -bottom-1 right-0.5">
//             <p class="text-[5px] text-[#BEA301]">${card['def']} Pt</p>
//             <div class="border border-[#BEA301] flex items-center justify-center rounded-full w-5.5 h-5.5">
//               <img src="imgs/def icon.png" alt=" shield">
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//     </div>
//     `;
//     ownedCardsContainer.appendChild(cardDiv);
//   });
// }

function updateDeckCounter(storeddeck) {
  const counterElement = document.querySelector(".deckCounter");
  let counter = 0;
  storeddeck.forEach(card => {
    counter += card.quantityOrder;
  })
  counterElement.textContent = counter;
  counter--;
}


function drawCard() {
  let StartGameDraw = 0;
  const summonAvaibality = document.getElementById("summon");
  const drawing = document.querySelector("#Drawer");
  let count = 0;
  drawing.addEventListener("click", () => {
    for (let i = 0; i < Hand.length; i++) {
      const index = playDeck.length;
      const randCard = Math.floor(Math.random() * index);
      const card = playDeck[randCard];
      if (Hand[i] === 0) {
        const hand = document.querySelector(`#hand-${i + 1}`);
        hand.innerHTML = ` <div id="card-${i + 1}-${count} " class="w-35.5 h-47.5 bg-black flex justify-center items-center scale-38 xl:scale-80 2xl:scale-115 cursor-grab" draggable="true"
            ondragstart="dragstartHandler(event)">
      <div class="w-33 h-45.25 border border-[#bea301] flex flex-col items-center justify-evenly overflow-hidden">
        <div class="w-31  border border-[#bea301] relative">
          <img draggable = 'false'   class="animate-pulse" src="${card['bg-img']}" alt="${card['rarity']} background">
          <img draggable = 'false'  class="absolute bottom-0 right-0" src="${card['caracter']}" alt="${card['name']}">
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
              <img draggable = 'false'  src="imgs/atk icon.png" alt=" swords">
            </div>
          </div>
          <p class="text-[4.5px] text-[#bea301]">"<span class="${card['txt-color']}"> ${card['description']} </span>"</p>
          <div class="flex flex-col items-center absolute -bottom-1 right-0.5">
            <p class="text-[5px] text-[#BEA301]">${card['def']} Pt</p>
            <div class="border border-[#BEA301] flex items-center justify-center rounded-full w-5.5 h-5.5">
              <img draggable = 'false'  src="imgs/def icon.png" alt=" shield">
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    `;
        Hand[i] = 1;
        summonAvaibality.textContent = "Used"
        drawing.classList.replace("bg-[#bea301]", "bg-[#ece5bf]");
        drawing.classList.replace("cursor-pointer", "cursor-not-allowed")
        drawing.setAttribute("disabled", "true");
        handCount++;
        if (handCount <= 5) {
          document.getElementById("inhand").textContent = handCount;
        } else {
          document.getElementById("inhand").textContent = "0";
        }
        if (playDeck[randCard].quantityOrder > 1) {
          playDeck[randCard].quantityOrder--;
          updateDeckCounter(playDeck);
          count++;
        } else {
          playDeck.splice(randCard, 1);
          updateDeckCounter(playDeck);
          playDisplay(playDeck);
          count++;
        }
        if (StartGameDraw === 1) {
          break;
        }
      }

    }
    StartGameDraw = 1;
  })

}
function dragstartHandler(ev) {
  ev.dataTransfer.setData("card", ev.target.id);
  ev.target.classlist.add("cursor-grab");
}

function dragoverHandler(ev) {
  ev.preventDefault();
}

function dropHandler(ev) {
  ev.preventDefault();
  const data = ev.dataTransfer.getData("card");
  const atkBtn = document.getElementById("atk");
  const defBtn = document.getElementById("def");


  if (ev.target.classList.contains('slot') && ev.target.childElementCount == 0) {
    ev.target.appendChild(document.getElementById(data));
    const slotsAvailability = document.querySelectorAll(".slot");
    slotsAvailability.forEach(slot => {
      slot.removeAttribute("ondrop", "ondragover");
    })
    let match = data.match(/card-([^\s]+)-[^\s]+/);
    if (match) {
      let index = parseInt(match[1]);
      Hand[index - 1] = 0;
      handCount--;
      document.getElementById("inhand").textContent = handCount;
    }
    ev.target.addEventListener("click", () => {
      if (!(ev.target.classList.contains('atk')) && !(ev.target.classList.contains('def'))) {
        const statutTab = document.getElementById("statut");
        statutTab.classList.toggle("hidden");

        atkBtn.replaceWith(atkBtn.cloneNode(true));
        defBtn.replaceWith(defBtn.cloneNode(true));

        const atkBtnNew = document.getElementById("atk");
        const defBtnNew = document.getElementById("def");

        atkBtnNew.addEventListener("click", () => {
          ev.target.classList.remove('def', 'rotate-90', 'scale-70', 'bg-green-600');
          ev.target.classList.add('bg-red-600', 'atk');
          statutTab.classList.toggle("hidden");
        })

        defBtnNew.addEventListener("click", () => {
          ev.target.classList.remove('atk', 'bg-red-600');
          ev.target.classList.add('rotate-90', 'scale-70', 'bg-green-600', 'def');
          statutTab.classList.toggle("hidden");
        })
      }
    })
  }
}
const endTurnBtn = document.getElementById("endTurn");
let turn = 0;

// endTurnBtn.addEventListener("click", () => {
//   const hands = document.querySelectorAll(".hand");
//   const slots = document.querySelectorAll(".slot");
//   let isHandempty = 0;
//   let isSlotempty = 0;
//   let i = 0;

//   for (i = 0; i < hands.length; i++) {
//     if (hands[i].childElementCount != 0) {
//       isHandempty = 1;
//       break;
//     }
//   }
//   for (i = 0; i < slots.length; i++) {
//     if (slots[i].childElementCount != 0 && (slots[i].classList.contains("atk") || slots[i].classList.contains("def"))) {
//       isSlotempty = 1;
//       break;
//     }
//   }
//   if (isHandempty == 0 || isSlotempty == 0) {
//     alert("You Need To Play And Draw A Card!!");

//   } else {
//     endTurnBtn.classList.remove("bg-blue-600", "cursor-pointer");
//     endTurnBtn.classList.add("bg-gray-600", "cursor-not-allowed");
//     endTurnBtn.setAttribute("disabled", "true");
//     document.getElementById("turn").textContent = "Opposant Turn";
//     turn = 1;
//     opposant();
//   }
// })
let StartOppGameDraw = 0;
function opposant() {
  console.log(opposantHandCount);
  const summonAvaibality = document.getElementById("summon");
  const drawing = document.querySelector("#Drawer");

  if (turn == 1) {
    for (let i = 0; i < opposantHand.length; i++) {
      const index = opposantPlayDeck.length;
      const randCard = Math.floor(Math.random() * index);
      const card = opposantPlayDeck[randCard];
      const storedQuantities = JSON.parse(localStorage.getItem("quantities")) || quantities;
      let quantity = storedQuantities[card.rarity];
      if (opposantHand[i] === 0) {
        opposantCards[i] = opposantPlayDeck[randCard];
      }
      opposantHand[i] = 1;
      opposantHandCount++;
      if (opposantHandCount <= 5) {
        document.getElementById("opphand").textContent = opposantHandCount;
        console.log(opposantHandCount);
      } else {
        document.getElementById("opphand").textContent = "0";
      }
      if (quantity > 1) {
        quantity--;
      } else {
        opposantPlayDeck.splice(randCard, 1);
      }
      if (StartOppGameDraw === 1) {
        break;
      }
    }
  }
  StartOppGameDraw = 1;

  const opposantSlots = document.querySelectorAll(".oppSlot");
  console.log(opposantHandCount);
  for (let i = 0; i < opposantSlots.length; i++) {
    if (opposantSlots[i].childElementCount == 0) {
      const cardOpp = opposantCards[i];
      const cardDiv = document.createElement('div');
      cardDiv.innerHTML = `
             <div class="w-35.5 h-47.5 bg-black flex justify-center items-center scale-38 xl:scale-80 2xl:scale-115 cursor-pointer" draggable="true"
                ondragstart="dragstartHandler(event)">
          <div class="w-33 h-45.25 border border-[#bea301] flex flex-col items-center justify-evenly overflow-hidden">
            <div class="w-31  border border-[#bea301] relative">
              <img draggable = 'false'   class="animate-pulse" src="${cardOpp['bg-img']}" alt="${cardOpp['rarity']} background">
              <img draggable = 'false'  class="absolute bottom-0 right-0" src="${cardOpp['caracter']}" alt="${cardOpp['name']}">
              <div
                class="w-3.5 h-3.5 bg-black border border-[#bea301] absolute z-20 flex justify-center items-center top-0 rotate-45">
                <p class="${cardOpp['txt-color']} text-xs -rotate-45">${cardOpp['power']}</p>
              </div>
            </div>
            <div class="flex relative -mt-0.5">
              <div class="w-1 h-1 border border-[#bea301] bg-black absolute rotate-45 -left-1.5 top-1 z-10"></div>
              <div class="w-2 h-2 border border-[#bea301] bg-black absolute rotate-45 -left-1 top-0.5"></div>
              <div class="w-21.5 h-3 border border-[#bea301] flex justify-center items-center rounded-full">
                <p class="${cardOpp['txt-color']} text-[6px]">${cardOpp['name']}</p>
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
              <p class="text-[7px] ${cardOpp['txt-color']}">${cardOpp['rarity']}</p>
              <div class="flex items-center relative -top-0.25">
                <hr class="w-5 border-0.5 border-[#BEA301]">
                <div class="w-0.75 h-0.75  bg-[#BEA301] rotate-45"></div>
              </div>
            </div>
            <p class="text-[5px] ${cardOpp['txt-color']} -mt-1.75">${cardOpp['role']}</p>
            <div class="border border-[#BEA301] py-0.25 px-1 flex items-center justify-center rounded-full -mt-1">
              <p class="text-[5px] ${cardOpp['txt-color']}">${cardOpp['element']}</p>
            </div>
            <div class="flex relative w-full justify-center items-end">
              <div class="flex flex-col items-center absolute -bottom-1 left-0.5">
                <p class="text-[5px] text-[#BEA301]">${cardOpp['atk']} Pt</p>
                <div class="border border-[#BEA301] flex items-center justify-center rounded-full w-5.5 h-5.5">
                  <img draggable = 'false'  src="imgs/atk icon.png" alt=" swords">
                </div>
              </div>
              <p class="text-[4.5px] text-[#bea301]">"<span class="${cardOpp['txt-color']}"> ${cardOpp['description']} </span>"</p>
              <div class="flex flex-col items-center absolute -bottom-1 right-0.5">
                <p class="text-[5px] text-[#BEA301]">${cardOpp['def']} Pt</p>
                <div class="border border-[#BEA301] flex items-center justify-center rounded-full w-5.5 h-5.5">
                  <img draggable = 'false'  src="imgs/def icon.png" alt=" shield">
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
        `;
      opposantSlots[i].appendChild(cardDiv);
      opposantHand[i] = 0;
      opposantHandCount--;
      document.getElementById("opphand").textContent = opposantHandCount;
      const randStatut = Math.floor(Math.random() * 2);
      if (randStatut == 1) {
        opposantSlots[i].classList.add('bg-red-600', 'atk');
      } else {
        opposantSlots[i].classList.add('rotate-90', 'scale-70', 'bg-green-600', 'def');
      }
      endTurnBtn.classList.remove("bg-gray-600", "cursor-not-allowed");
      endTurnBtn.classList.add("bg-blue-600", "cursor-pointer");
      endTurnBtn.removeAttribute("disabled");
      document.getElementById("turn").textContent = "Your Turn";
      turn = 0;
      summonAvaibality.textContent = "Available"
      drawing.classList.replace("bg-[#ece5bf]", "bg-[#bea301]");
      drawing.classList.replace("cursor-not-allowed", "cursor-pointer")
      drawing.removeAttribute("disabled");
      const slotsAvailability = document.querySelectorAll(".slot");
      slotsAvailability.forEach(slot => {
        slot.setAttribute("ondrop", "dropHandler(event)");
        slot.setAttribute("ondragover", "dragoverHandler(event)");
      })
      break;
    }
  }

}
// function restack(){
//  const cardDisplay = document.getElementById("cardsDisplay");
 
//   const firstDiv = cardDisplay.querySelector("div div p:nth-child(2)");
//   const text = firstDiv.innerHTML;
//   const match = text.match(/Quantity : ([0-9]+)/);
//   const theTarget = match[1];
//   if(theTarget<10){
//    console.log(oneCard);
//   }
// }
// restack();


function shipest(){
  const storedCards = [...allCards];
  console.log();
  console.log(storedCards);
  let cardId = 0;
  let min = 10;
  storedCards.forEach(card=>{
   let price = prices[card.rarity];
   if(price<min){
    min = price;
    cardId = card.id;
   }
  })
  const index = storedCards.findIndex(card => card.id == cardId);
  console.log(storedCards[index]);
}
shipest();