const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Historique = require("../models/Historique");

const addToCart = async (req, res, next) => {
  const userId = req.userInfo.userId;
  if (!userId) return res.sendStatus(401);

  try {
    const { productId, numberBought } = req.body;
    if (!productId || !numberBought)
      return res.status(400).json({ message: "Missing fields" });

    //all cart which isn't get yet has 'waiting' status
    const foundCart = await Cart.findOne({ userId, status: "waiting" });
    if (!foundCart) {
      await Cart.create({
        userId,
        products: [
          {
            productId,
            numberBought,
          },
        ],
      });
      res.sendStatus(201);
    } else {
      //we should verify first if product to be added isn't already present in cart
      let productExist = false;
      for (let i = 0; i < foundCart.products.length; i++) {
        if (foundCart.products[i].productId === productId) {
          foundCart.products[i].numberBought =
            parseInt(foundCart.products[i].numberBought) +
            parseInt(numberBought);
          productExist = true;
        }
      }
      if (productExist) await foundCart.save();
      else {
        //if product don't exist register it now
        foundCart.products = [
          ...foundCart.products,
          {
            productId,
            numberBought,
          },
        ];
        await foundCart.save();
      }
      res.sendStatus(201);
    }
  } catch (err) {
    res.sendStatus(500);
    next(err);
  }
};

const getCart = async (req, res, next) => {
  const user = { ...req.userInfo };
  let cartInfo = {};

  try {
    let foundCart = await Cart.findOne({ userId: user.userId, status: "waiting",})
                              
    if (!foundCart) {
      cartInfo = {
        success: false,
        data: [],
      };
    } else {
      let data = [];
      let totalAmount = 0;
      for (const product of foundCart.products) {
        const { productId, numberBought } = product;
        const { src, name, categorie, price } = await Product.findOne({
          _id: productId,
        });

        const cleanInfo = {
          productId,
          src,
          name,
          categorie,
          price,
          numberBought,
          total: numberBought * price,
        };
        totalAmount += cleanInfo.total;
        data.push(cleanInfo);
      }
      cartInfo = {
        success: true,
        cartId: foundCart._id,
        totalAmount,
        data,
      };
    }
    res.render("cart", { user, cartInfo });
  } catch (err) {
    next(err);
    console.log(err);
  }
};

const validateCart = async (req, res, next) => {
  const action = req.query?.action;
  try {
    if (!action) return res.redirect("/cart");

    if (action === "del") {
      await Cart.deleteOne({ _id: req.params.id });
      res.redirect("/cart");
    } else if (action === "get") {
      await Cart.updateOne({ _id: req.params.id }, { status: "validate" });
      await Historique.create({
        userId: req.userInfo.userId,
        cartId: req.params.id,
        cost: req.query?.montant,
      });
      res.redirect("/histo");
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = { addToCart, getCart, validateCart };
