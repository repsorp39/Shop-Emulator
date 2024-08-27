const express = require("express");
const basicAuth = require("../middlewares/simpleAuth");
const handleLogout = require("../controllers/logoutController");
const verifyJWT = require("../middlewares/verifyJWT");
const adminAuth = require("../middlewares/adminAuth");
const multer = require("../middlewares/multer");
const {
  productAdd,
  formProduct,
  getSingleProduct,
} = require("../controllers/productController");
const {
  homeAccessControl,
  loginRouteAccess,
  registerRouteAccess,
} = require("../controllers/accessControl");
const handleLogin = require("../controllers/loginHandler");
const handleRegister = require("../controllers/registerController");
const { getAllUser, deleteUser } = require("../controllers/userControllers");
const searchHandler = require("../controllers/searchController");
const {
  addToCart,
  getCart,
  validateCart,
} = require("../controllers/cartController");
const {
  getHistorique,
  deleteHistory,
  getCartInfo,
} = require("../controllers/historiqueController");
const router = express.Router();

router.get("^/$|index(.ejs)?", basicAuth, homeAccessControl);
router.get("/login(.ejs)?", basicAuth, loginRouteAccess);
router.get("/signup(.ejs)?", basicAuth, registerRouteAccess);
router.get("/logout", handleLogout);
router.post("/register", handleRegister);
router.post("/login", handleLogin);

//admin routes
router
  .route("/new")
  .post(verifyJWT, adminAuth, multer, productAdd)
  .get(verifyJWT, adminAuth, formProduct);

//product
router.get("/prod/:id", getSingleProduct);

//user management
router.get("/manage-user", verifyJWT, adminAuth, getAllUser);
router.get("/deluser/:id", verifyJWT, adminAuth, deleteUser);

//enable search
router.post("/search", basicAuth, searchHandler);

//cart handler
router.post("/cart", basicAuth, addToCart);
router.get("/cart", verifyJWT, getCart);
router.get("/cart/:id", verifyJWT, validateCart);

//history handler
router.get("/histo", verifyJWT, getHistorique);
router.get("/delhisto/:id", deleteHistory);
router.get("/search-cart/:id", verifyJWT, getCartInfo);
module.exports = router;
