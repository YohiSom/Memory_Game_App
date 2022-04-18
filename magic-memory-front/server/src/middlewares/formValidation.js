import Ajv from "ajv";
import addFormat from "ajv-formats";
import signUpSchema from "../data/signUpSchema.js";

const ajv = new Ajv();
addFormat(ajv);

const validate = ajv.compile(signUpSchema);

function formValidation(req, res, next) {
  const valid = validate(req.body);
  if (valid) {
    next();
  } else {
    res.status(400).send(validate.errors);
  }
}

export default formValidation;
