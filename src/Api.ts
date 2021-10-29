import { Operators } from "./Schema";

type operators = {
  [key: string]: Function;
};

export class Api {
  static async fetchStore(mockStore: any[] = []) {
    if (mockStore.length > 0) {
      return mockStore;
    }

    const response = await fetch("mock-api/api.json");
    return await response.json();
  }

  static async runQuery(
    predicate: string,
    operator: string,
    query: string,
    mockStore: any[] = []
  ) {
    const store = await this.fetchStore(mockStore);
    const operationHandlers: operators = Operators.getOperator(store);
    const operation = operationHandlers[operator];
    return operation(predicate, query);
  }

  static buildQuery() {}
}
