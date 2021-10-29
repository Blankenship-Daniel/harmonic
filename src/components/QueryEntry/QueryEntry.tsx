import React, { FormEvent, useContext, useEffect, useState } from "react";
import { Operators, Predicates, Query } from "../../Schema";
import { QueryContext } from "../QueryBuilder/QueryBuilder";

const PREDICATE_INITIAL_STATE = Object.keys(Predicates.VALUES)[0];
const OPERATOR_INITIAL_STATE = Operators.VALUES[0];
const QUERY_INITIAL_STATE = "";

type QueryEntryProps = {
  queryId: string;
  onQueryUpdate: Function;
};

const QueryEntry = ({ queryId, onQueryUpdate }: QueryEntryProps) => {
  const context = useContext(QueryContext);
  const [predicate, setPredicate] = useState(PREDICATE_INITIAL_STATE);
  const [operator, setOperator] = useState(OPERATOR_INITIAL_STATE);
  const [query, setQuery] = useState(QUERY_INITIAL_STATE);

  useEffect(() => {
    onQueryUpdate(context, queryId, {
      predicate,
      operator,
      query,
    });
  }, []);

  const onPredicate = (newPredicate: string) => {
    setPredicate(newPredicate);
    onQueryUpdate(context, queryId, {
      predicate: newPredicate,
      operator,
      query,
    });
  };

  const onOperator = (newOperator: string) => {
    setOperator(newOperator);
    onQueryUpdate(context, queryId, {
      predicate,
      operator: newOperator,
      query,
    });
  };

  const onQuery = (newQuery: string) => {
    setQuery(newQuery);
    onQueryUpdate(context, queryId, {
      predicate,
      operator,
      query: newQuery,
    });
  };

  return (
    <form
      id={queryId}
      className="QueryForm"
      onSubmit={(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
      }}
    >
      {Predicates.toHtml(onPredicate)}
      {Operators.toHtml(onOperator)}
      {Query.toHtml(onQuery)}
    </form>
  );
};

export default QueryEntry;
