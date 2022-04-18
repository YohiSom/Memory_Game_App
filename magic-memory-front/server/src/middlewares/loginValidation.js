import Ajv from "ajv";
import addFormat from "ajv-formats";
import loginSchema from "../data/loginSchema.js";

const ajv = new Ajv();
addFormat(ajv);
const validate = ajv.compile(loginSchema);

function loginValidation(req, res, next) {
  const valid = validate(req.body);
  if (valid) {
    next();
  } else {
    res.status(400).send(validate.errors);
  }
}

export default loginValidation;
