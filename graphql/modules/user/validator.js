const schema = {
  collectionName: "users",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "User Validation",
      required: ["name"],
      properties: {
        name: {
          bsonType: "string",
          description: "'name' must be a string and is required",
        },
      },
    },
  },
};
