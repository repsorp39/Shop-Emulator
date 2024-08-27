const Product = require("../models/Product");

const searchHandler = async (req, res) => {
  const query = req.body?.q?.trim()?.toLowerCase();
  if (!query) return res.redirect("/");
  const user = { ...req.userInfo };
  const rawData = await Product.find();

  const products = rawData.filter(
    (prod) =>
      prod.categorie.toLowerCase().includes(query) ||
      prod.name.toLowerCase().includes(query)
  );

  const queryInfo = {
    name: query,
    success: products.length > 0 ? true : false,
    resultsNumber: products.length.toString().padStart(2, "0"),
  };
  res.render("index", { user, products, queryInfo });
};

module.exports = searchHandler;
