const utilities = require("../utilities")
const { body, validationResult } = require("express-validator")
const validate = {}
const accountModel = require("../models/account-model")

/*  **********************************
 *  Registration Data Validation Rules
 * ********************************* */
  validate.registrationRules = () => {
    return [
      // firstname is required and must be string
      body("account_firstname")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 1 })
        .withMessage("Please provide a first name."), // on error this message is sent.
  
      // lastname is required and must be string
      body("account_lastname")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 2 })
        .withMessage("Please provide a last name."), // on error this message is sent.
  
      // valid email is required and cannot already exist in the database
        body("account_email")
        .trim()
        .isEmail()
        .normalizeEmail() // refer to validator.js docs
        .withMessage("A valid email is required.")
        .custom(async (account_email) => {
            const emailExists = await accountModel.checkExistingEmail(account_email)
            if (emailExists){
            throw new Error("Email exists. Please log in or use different email")
            }
        }),
  
      // password is required and must be strong password
      body("account_password")
        .trim()
        .notEmpty()
        .isStrongPassword({
          minLength: 12,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
        })
        .withMessage("Password does not meet requirements."),
    ]
  }

/* ******************************
 * Check data and return errors or continue to registration
 * ***************************** */
validate.checkRegData = async (req, res, next) => {
  const { account_firstname, account_lastname, account_email } = req.body
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    res.render("account/register", {
      errors,
      title: "Registration",
      nav,
      account_firstname,
      account_lastname,
      account_email,
    })
    return
  }
  next()
}

/******************************************Validate Login Data Team Activity******************************************************/

/*  **********************************
 *  Login Data Validation Rules
 * ********************************* */
validate.loginRules = () => {
  return [
    // valid email is required and cannot already exist in the DB
    body("account_email")
    .trim()
    .isEmail()
    .normalizeEmail() // refer to validator.js docs
    .withMessage("A valid email is required.")
    .custom(async (account_email) => {
      const emailExists = await accountModel.checkExistingEmail(account_email)
      if (!emailExists){
        throw new Error("Email not found. Please log in with a different email")
      }
    }),
  ]
}

/* ******************************
* Check data and return errors or continue to Login
* ***************************** */
validate.checkLoginData = async (req, res, next) => {
  const { account_email } = req.body
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    res.render("account/login", {
      errors,
      title: "Login",
      nav,
      account_email,
    })
    return
  }
  next()
}

/*  **********************************
 *  Update Account Data Validation Rules
 *  Assignment 5
 * ********************************* */
validate.accountUpdateRules = () => {
  return [
    // firstname is required and must be string
    body("account_firstname")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Please provide a first name."), // on error this message is sent.

    // lastname is required and must be string
    body("account_lastname")
      .trim()
      .isLength({ min: 2 })
      .withMessage("Please provide a last name."), // on error this message is sent.

    // valid email is required and cannot already exist in the DB
    body("account_email")
    .trim()
    .isEmail()
    .normalizeEmail() // refer to validator.js docs
    .withMessage("A valid email is required.")
  ]
}


/* ******************************
 * Check data and return errors or continue to update account data
 *  Assignment 5
 * ***************************** */
validate.checkAccountUpdateData = async (req, res, next) => {
  const { account_firstname, account_lastname, account_email, account_id} = req.body
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    res.render("/account/account-update", {
      errors,
      title: "Update Account",
      nav,
      account_firstname,
      account_lastname,
      account_email,
      account_id
    })
    return
  }
  next()
}

/*  **********************************
 *  Update Password Validation Rules
 *  Assignment 5
 * ********************************* */
validate.passwordUpdateRules = () => {
  return [
    // password is required and must be strong password
    body("account_password")
      .trim()
      .isStrongPassword({
        minLength: 12,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
      .withMessage("Password does not meet requirements."),
  ]
}

/* ******************************
 * Check data and return errors or continue to update account data
 *  Assignment 5
 * ***************************** */
validate.checkPasswordUpdateData = async (req, res, next) => {
  console.log("Got to checkPasswordUpdateData in account-validation")
  const {account_id} = req.body
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    res.render("/account/update-account", {
      errors,
      title: "Update Account",
      nav,
      account_id
    })
    return
  }
  next()
}

module.exports = validate