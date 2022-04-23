// import Ajv from "ajv";
// import addFormat from "ajv-formats";
// import turnSchema from "../data/turnSchema.js";

// const ajv = new Ajv();
// addFormat(ajv);
// const validate = ajv.compile(turnSchema);

// function loginValidation(req, res, next) {
//   const valid = validate(req.body);
//   if (valid) {
//     next();
//   } else {
//     res.status(400).send(validate.errors);
//   }
// }

// export default loginValidation;