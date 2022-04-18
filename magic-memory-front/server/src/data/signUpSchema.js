const signUpSchema = {
  type: "object",
  properties: {
    email: { type: "string", format: "email" },
    password: { type: ["string", "integer"], minLength: 6 },
    lastname: { type: "string", minLength: 1 },
    firstname: { type: "string", minLength: 1 },
    nickname: { type: "string", minLength: 1 },
  },
  required: ["email", "password", "lastname", "firstname", "nickname"],
  additionalProperties: false,
};

export default signUpSchema;
