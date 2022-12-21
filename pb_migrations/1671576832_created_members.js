migrate(
  (db) => {
    const collection = new Collection({
      id: "w3e4rhoam26idgx",
      created: "2022-12-20 22:53:52.476Z",
      updated: "2022-12-20 22:53:52.476Z",
      name: "members",
      type: "base",
      system: false,
      schema: [
        {
          system: false,
          id: "h93gfcfo",
          name: "name",
          type: "text",
          required: true,
          unique: false,
          options: {
            min: null,
            max: null,
            pattern: "",
          },
        },
        {
          system: false,
          id: "vkymikcd",
          name: "birthday",
          type: "date",
          required: true,
          unique: false,
          options: {
            min: "",
            max: "",
          },
        },
      ],
      listRule: null,
      viewRule: null,
      createRule: null,
      updateRule: null,
      deleteRule: null,
      options: {},
    });

    return Dao(db).saveCollection(collection);
  },
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("w3e4rhoam26idgx");

    return dao.deleteCollection(collection);
  }
);
