const express = require("express");
const app = express();
var cors = require("cors");
const port = 5000;
const axios = require("axios");
const { JSDOM } = require("jsdom");

app.use(express.text());
app.use(cors());
app.use(express.static("./public"));

app.post("/scrape", (req, res) => {
  async function DoScrape() {
    try {
      let productName = req.body;
      productName = productName.replace(" ", "+");
      const url = `https://www.amazon.com/s?k=${productName}`;
      const responseAxios = await axios.get(url, {
        headers: {
          Accept: "application/json",
          "User-Agent": "axios 0.21.1",
        },
      });
      const data = await responseAxios.data;
      const dom = new JSDOM(data);

      listOfProducts = [];

      const products = dom.window.document.querySelectorAll(
        ".puis-card-container"
      );

      products.forEach((product) => {
        const title = (
          product.querySelector(".a-size-base-plus") ||
          product.querySelector(".a-size-medium")
        ).textContent;
        const img = product.querySelector(".s-image").src;
        const stars = product.querySelector(".a-icon-alt").textContent;
        const reviewNumber = product.querySelector(
          "span.s-underline-text"
        ).textContent;

        listOfProducts.push({
          productTitle: title,
          productImg: img,
          productStars: stars,
          productReviewNumber: reviewNumber,
        });
      });
      res.status(200).send(listOfProducts);
      console.log("Process finished.");
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ error: "An error has occurred on the server" });
    }
  }
  DoScrape();
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});