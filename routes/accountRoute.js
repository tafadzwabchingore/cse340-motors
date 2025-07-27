// Required Resources 
const express = require("express")
const router = new express.Router() 
const utilities = require("../utilities")
const accountController = require("../controllers/accountController")
const regValidate = require('../utilities/account-validation')

// Route to Build Login View
router.get("/login", utilities.handleErrors(accountController.buildLogin))

// Route to Build Registration View
router.get("/register", utilities.handleErrors(accountController.buildRegister))

// Process Management view
router.get(
  "/", 
  utilities.checkLogin,
  utilities.handleErrors(accountController.buildManagement))

// Process the registration data
router.post(
  "/register",
  regValidate.registrationRules(),
  regValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
)

// Process the login request
router.post(
  "/login",
  regValidate.loginRules(),
  regValidate.checkLoginData,
  utilities.handleErrors(accountController.accountLogin)
)

module.exports = router;