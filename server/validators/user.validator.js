import { body } from "express-validator";

const nameValidate = [
  body("name")
    .notEmpty()
    .isString()
    .withMessage("Not valid data!")
    .isLength({ min: 3, max: 32 })
    .withMessage("Name should be at least 3 character."),
];
const emailValidate = [
  body("email")
    .notEmpty()
    .isString()
    .withMessage("Not Validate email.")
    .isEmail()
    .withMessage("email is invalid format."),
];

const passwordValidate = [
  body("password").isString().withMessage("Not valid password"),
];

const userValidator = [nameValidate, passwordValidate, emailValidate];
export default userValidator;
