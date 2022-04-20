const turnSchema = {
    type: "object",
    properties: {
      email: { type: "string", format: "email" },
      turns: { type: "integer" },
      date: { type: "string"}
    },
    required: ["email", "turns", "date"],
    additionalProperties: false,
  };
  
  export default turnSchema;