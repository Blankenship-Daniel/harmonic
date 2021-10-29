import { Operators } from "./Schema";

type operators = {
  [key: string]: Function;
};

export class Api {
  static async runQuery(predicate: string, operator: string, query: string) {
    const response = await fetch("mock-api/api.json");
    const store = await response.json();
    const operationHandlers: operators = Operators.getOperator(store);
    const operation = operationHandlers[operator];
    return operation(predicate, query);
  }
}
