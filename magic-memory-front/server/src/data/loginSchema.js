const loginSchema = {
  type: "object",
  properties: {
    email: { type: "string", format: "email" },
    password: { type: ["string", "integer"], minLength: 6 },
  },
  required: ["email", "password"],
  additionalProperties: false,
};

export default loginSchema;
