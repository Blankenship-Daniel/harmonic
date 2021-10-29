export type PredicateValues = {
  [key: string]: string;
};

export class Predicates {
  static readonly VALUES: PredicateValues = {
    "Company ID": "id",
    "Company Name": "name",
    Description: "description",
  };
  static toHtml(handler: any) {
    return (
      <select
        onChange={(event) => {
          handler(event.target.value);
        }}
      >
        {Object.keys(this.VALUES).map((predicate) => {
          return (
            <option key={predicate} value={predicate}>
              {predicate}
            </option>
          );
        })}
      </select>
    );
  }
}

export class Operators {
  static getOperator(store: any[]) {
    return {
      Contains: (predicate: string, query: string) => {
        const sanitizedQuery = query === "" ? undefined : query;
        return store.filter((entry) =>
          entry[predicate].toString().includes(sanitizedQuery)
        );
      },
      "Does not contain": (predicate: string, query: string) => {
        const sanitizedQuery = query === "" ? undefined : query;
        return store.filter(
          (entry) => !entry[predicate].toString().includes(sanitizedQuery)
        );
      },
      "Is exactly": (predicate: string, query: string) =>
        store.filter((entry) => entry[predicate].toString() === query),
      "Is empty": (predicate: string, query: string) =>
        store.filter((entry) => !!entry[predicate] === false),
      "Is not empty": (predicate: string, query: string) =>
        store.filter((entry) => !!entry[predicate] === true),
    };
  }
  static readonly VALUES = [...Object.keys(this.getOperator([]))];
  static toHtml(handler: any) {
    return (
      <select
        onChange={(event) => {
          handler(event.target.value);
        }}
      >
        {this.VALUES.map((predicate) => (
          <option key={predicate} value={predicate}>
            {predicate}
          </option>
        ))}
      </select>
    );
  }
}

export class Query {
  static toHtml(handler: any) {
    return (
      <input
        onKeyUp={(event: any) => {
          handler(event.target.value);
        }}
        type="text"
        name="query"
      />
    );
  }
}
