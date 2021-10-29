import { Api } from "./Api";

const MOCK_API = [
  {
    id: 1,
    name: "Dunder Mifflin",
    highlights: [
      {
        category: "MAKES_LOTTA_MONEY",
        date_added: "2021-10-21",
        text: "Additional description",
      },
      {
        category: "IS_HARMONIC",
      },
    ],
  },
  {
    id: 2,
    name: "Cash Grab",
    description: "We're legit, we promise ;)",
    highlights: [
      {
        category: "MAKES_LOTTA_MONEY",
        text: "Additional description",
      },
      {
        category: "IS_HARMONIC",
        text: "Additional description",
      },
    ],
  },
];

describe("API", () => {
  describe("Company ID", () => {
    const predicate = "id";
    describe("Contains", () => {
      const operator = "Contains";
      it("should not match empty string", async () => {
        const store = await Api.runQuery(predicate, operator, "", MOCK_API);
        expect(store.length).toBe(0);
      });

      it("should match Company ID", async () => {
        const store = await Api.runQuery(predicate, operator, "1", MOCK_API);
        expect(store.length).toBe(1);
        expect(store[0][predicate]).toBe(1);
      });
    });

    describe("Does not contain", () => {
      const operator = "Does not contain";
      it("should not return matched Company ID", async () => {
        const store = await Api.runQuery(predicate, operator, "1", MOCK_API);
        expect(store.length).toBe(1);
        expect(store[0][predicate]).not.toBe(1);
      });
    });

    describe("Is exactly", () => {
      const operator = "Is exactly";
      it("should return matched Company ID", async () => {
        const store = await Api.runQuery(predicate, operator, "1", MOCK_API);
        expect(store.length).toBe(1);
        expect(store[0][predicate]).toBe(1);
      });
    });

    describe("Is empty", () => {
      const operator = "Is empty";
      it("should not return entries since Company ID exists", async () => {
        const store = await Api.runQuery(predicate, operator, "", MOCK_API);
        expect(store.length).toBe(0);
      });
    });

    describe("Is not empty", () => {
      const operator = "Is not empty";
      it("should return both entries since Company ID exists", async () => {
        const store = await Api.runQuery(predicate, operator, "", MOCK_API);
        expect(store.length).toEqual(MOCK_API.length);
      });
    });
  });

  describe("Company Name", () => {
    const predicate = "name";
    describe("Contains", () => {
      const operator = "Contains";
      it("should not match empty string", async () => {
        const store = await Api.runQuery(predicate, operator, "", MOCK_API);
        expect(store.length).toBe(0);
      });

      it("should match Company Name with only partial string", async () => {
        const store = await Api.runQuery(
          predicate,
          operator,
          "Dunder",
          MOCK_API
        );
        expect(store.length).toBe(1);
        expect(store[0][predicate]).toBe("Dunder Mifflin");
      });
    });

    describe("Does not contain", () => {
      const operator = "Does not contain";
      it("should not match the Company Name with the partial string", async () => {
        const store = await Api.runQuery(
          predicate,
          operator,
          "Dunder",
          MOCK_API
        );
        expect(store.length).toBe(1);
        expect(store[0][predicate]).toBe("Cash Grab");
      });
    });

    describe("Is exactly", () => {
      const operator = "Is exactly";
      it("should not return partial matches", async () => {
        const store = await Api.runQuery(
          predicate,
          operator,
          "Dunder",
          MOCK_API
        );
        expect(store.length).toBe(0);
      });
      it("should return full match", async () => {
        const store = await Api.runQuery(
          predicate,
          operator,
          "Dunder Mifflin",
          MOCK_API
        );
        expect(store.length).toBe(1);
        expect(store[0][predicate]).toBe("Dunder Mifflin");
      });
    });

    describe("Is empty", () => {
      const operator = "Is empty";
      it("should not return entries since Company Name exists", async () => {
        const store = await Api.runQuery(predicate, operator, "", MOCK_API);
        expect(store.length).toBe(0);
      });
    });

    describe("Is not empty", () => {
      const operator = "Is not empty";
      it("should return both entries since Company Name exists", async () => {
        const store = await Api.runQuery(predicate, operator, "", MOCK_API);
        expect(store.length).toEqual(MOCK_API.length);
      });
    });
  });

  describe("Description", () => {
    const predicate = "description";
    describe("Contains", () => {
      const operator = "Contains";
      it("should match Description with only partial string", async () => {
        const store = await Api.runQuery(predicate, operator, ";)", MOCK_API);
        expect(store.length).toBe(1);
        expect(store[0].name).toBe("Cash Grab");
      });
    });

    describe("Does not contain", () => {
      const operator = "Does not contain";
      it("should match Description with only partial string", async () => {
        const store = await Api.runQuery(predicate, operator, ";)", MOCK_API);
        expect(store.length).toBe(1);
        expect(store[0].name).toBe("Dunder Mifflin");
      });
    });

    describe("Is exactly", () => {
      const operator = "Is exactly";
      it("should not return partial matches", async () => {
        const store = await Api.runQuery(predicate, operator, ";)", MOCK_API);
        expect(store.length).toBe(0);
      });

      it("should return full match", async () => {
        const description: string = MOCK_API[1].description || "";
        const store = await Api.runQuery(
          predicate,
          operator,
          description,
          MOCK_API
        );
        expect(store.length).toBe(1);
        expect(store[0][predicate]).toBe(MOCK_API[1].description);
      });
    });

    describe("Is empty", () => {
      const operator = "Is empty";
      it("should return the entry without the predicate", async () => {
        const store = await Api.runQuery(predicate, operator, "", MOCK_API);
        expect(store.length).toBe(1);
        expect(store[0]["name"]).toBe("Dunder Mifflin");
      });
    });

    describe("Is not empty", () => {
      const operator = "Is not empty";
      it("should return the entry where that has the predicate", async () => {
        const store = await Api.runQuery(predicate, operator, "", MOCK_API);
        expect(store.length).toBe(1);
        expect(store[0]["name"]).toBe("Cash Grab");
      });
    });
  });
});
