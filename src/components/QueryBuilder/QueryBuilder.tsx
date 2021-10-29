import React, { FormEvent, useEffect, useState } from "react";
import { Api } from "../../Api";
import { Operators, Predicates, Query } from "../../Schema";

const PREDICATE_INITIAL_STATE = Object.keys(Predicates.VALUES)[0];
const OPERATOR_INITIAL_STATE = Operators.VALUES[0];
const QUERY_INITIAL_STATE = "";
const QUERY_RESPONSE_INITIAL_STATE = [{}];
const DATA_STORE_INITIAL_STATE = [{}];

const QueryBuilder = () => {
  const [predicate, setPredicate] = useState(PREDICATE_INITIAL_STATE);
  const [operator, setOperator] = useState(OPERATOR_INITIAL_STATE);
  const [query, setQuery] = useState(QUERY_INITIAL_STATE);
  const [queryResponse, setQueryResponse] = useState(
    QUERY_RESPONSE_INITIAL_STATE
  );
  const [dataStore, setDataStore] = useState(DATA_STORE_INITIAL_STATE);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("mock-api/api.json");
      const store = await response.json();
      setDataStore(store);
    };

    fetchData();
  }, []);

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const response = await Api.runQuery(
      Predicates.VALUES[predicate],
      operator,
      query
    );
    setQueryResponse(response);
  };

  const onPredicateChange = (newPredicate: string) => {
    setPredicate(newPredicate);
  };

  const onOperatorChange = (newOperator: string) => {
    setOperator(newOperator);
  };

  const onSearch = (newQuery: string) => {
    setQuery(newQuery);
  };

  return (
    <div className="QueryBuilder">
      <section className="SearchBar">
        <form
          className="QueryForm"
          onSubmit={(event: FormEvent<HTMLFormElement>) => {
            handleFormSubmit(event);
          }}
        >
          <span>where</span>
          {Predicates.toHtml(onPredicateChange)}
          {Operators.toHtml(onOperatorChange)}
          {Query.toHtml(onSearch)}
          <input type="submit" value="Search" />
        </form>
      </section>
      <div className="Response">
        <section className="DataStore">
          <h3>API</h3>
          <pre>{JSON.stringify(dataStore, null, 4)}</pre>
        </section>
        <section className="QueryResponse">
          <h3>Query Response</h3>
          <pre>{JSON.stringify(queryResponse, null, 4)}</pre>
        </section>
      </div>
    </div>
  );
};

export default QueryBuilder;
