const logError = require("./logError");

const errorHandler = (err, req, res, next) => {
  logError(err);//enrégistre l'erreur dans un fichier

  if (req.accepts("html")) {
    res.render("error", {
      nameError: err.name,
      message: err.message,
    });
  } else {
    res.status(500).send("Something broke!");
  }
};

module.exports = errorHandler;
