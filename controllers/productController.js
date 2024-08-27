const Product = require("../models/Product");

const productAdd = async (req, res, next) => {
  try {
    if (req.body.editState) {
      await Product.updateOne({ _id: req.body.id }, { ...req.body });
    } else {
      const { description, name, categorie, price } = req.body;
      if (!req?.file || !description || !name || !price)
        return res.status(400).json({ message: "Missing fields!" });

      const src = `${req.protocol}://${req.get("host")}/media/${
        req.file.filename
      }`;
      await Product.create({
        name,
        categorie,
        price,
        src,
        description,
      });
    }
    res.redirect("/");
  } catch (err) {
    res.json({ err: err.message });
    next(err);
  }
};

const getAllProduct = async () => {
  const products = await Product.find({}).sort({ price: 1 });
  return products;
};

const formProduct = async (req, res) => {
  try {
    // two possible case, we can render form update or form add
    const user = { ...req.userInfo };
    const update_id = req?.query?.upd;

    if (!update_id) {
      const edit = {
        state: false,
        productUpd: {},
      };
      return res.render("new-product", { user, edit });
    }
    //edit case
    const foundProduct = await Product.findOne({ _id: update_id });
    if (!foundProduct) return res.redirect("/");
    //else
    const edit = {
      state: true,
      product: foundProduct,
    };
    return res.render("new-product", { user, edit });
  } catch (err) {
    console.log(err);
  }
};

const getSingleProduct = async (req,res) =>{
   
  try{
    const product = await Product.findOne({_id:req.params.id});
    res.json(product)
  }catch(err){
    console.log(err);
  }
}
module.exports = { productAdd, getAllProduct, formProduct , getSingleProduct};
