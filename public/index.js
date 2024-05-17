const baseUrl = "https://amazonscraper-api.onrender.com";
const input = document.getElementById("input");
const botao = document.getElementById("submitBtn");
const errorNoInsert = document.getElementById("NoInsert");
const errorUnknown = document.getElementById("UnknownError");
const loading = document.getElementById("loading");

botao.addEventListener("click", PostText);

async function PostText() {
  const productName = input.value;
  if (productName === "") {
    errorNoInsert.style.display = "block";
  } else {
    try {
      errorNoInsert.style.display = "none";
      loading.style.display = "flex";
      const response = await fetch(baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        body: productName,
      });
      const responseData = await response.json();

      if (!response.ok) {
        errorUnknown.style.display = "block";
        throw new Error("An error ocurred. Server's console for details.");
      }

      cardSection = document.getElementById("card-section");
      cardSection.innerHTML = "";
      loading.style.display = "none";

      responseData.forEach((product) => {
        let card = document.createElement("div");
        const img = document.createElement("img");
        const imgBackground = document.createElement("div");
        const title = document.createElement("h2");
        const cardBotoom = document.createElement("div");
        const stars = document.createElement("h4");
        const reviewNumber = document.createElement("h4");

        title.textContent = product.productTitle;
        img.src = product.productImg;
        stars.innerHTML = `<i class="fa-solid fa-star"></i> ${product.productStars}`;
        reviewNumber.innerHTML = `<i class="fa-solid fa-user"></i> ${product.productReviewNumber}`;

        card.setAttribute("class", "card");
        img.setAttribute("class", "card-img");
        imgBackground.setAttribute("class", "card-img-background");
        title.setAttribute("class", "card-title");
        cardBotoom.setAttribute("class", "card-bottom");
        stars.setAttribute("class", "card-stars");
        reviewNumber.setAttribute("class", "card-review");

        cardSection.appendChild(card);
        card.appendChild(imgBackground);
        imgBackground.appendChild(img);
        card.appendChild(title);
        card.appendChild(cardBotoom);
        cardBotoom.appendChild(stars);
        cardBotoom.appendChild(reviewNumber);
      });

      const divisionTop = document.getElementById("divisionTop");
      divisionTop.style.display = "block";
      const divisionBottom = document.getElementById("divisionBottom");
      divisionBottom.style.display = "block";
    } catch (error) {
      console.error(error.message);
    }
  }
}
