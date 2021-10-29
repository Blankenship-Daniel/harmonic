import React, { createContext, useState } from "react";
import QueryEntry from "../QueryEntry/QueryEntry";
import { v4 as uuidv4 } from "uuid";

export const QueryContext = createContext({});

const QueryBuilder = () => {
  const handleQueryUpdate = (context: any, queryId: string, fields: any) => {
    const query = {
      [queryId]: `predicate=${fields.predicate}&operator=${fields.operator}&query=${fields.query}`,
    };
    setQueryMap({
      ...context,
      ...query,
    });
  };

  const [queryMap, setQueryMap] = useState({});
  const [queryEntries, setQueryEntries] = useState([
    <QueryEntry queryId={uuidv4()} onQueryUpdate={handleQueryUpdate} />,
  ]);

  return (
    <QueryContext.Provider value={queryMap}>
      <div className="QueryBuilder">
        <section className="SearchBar">
          <section className="Queries">
            {queryEntries.map((query, i) => (
              <div key={`query-${i}`} className="Query">
                <span>{i === 0 ? "WHERE" : "AND"}</span> {query}
              </div>
            ))}
          </section>
          <button
            onClick={() => {
              setQueryEntries([
                ...queryEntries,
                <QueryEntry
                  queryId={uuidv4()}
                  onQueryUpdate={handleQueryUpdate}
                />,
              ]);
            }}
          >
            Add New Filter
          </button>
        </section>
        <button>Search</button>
        <div className="Response">
          <pre>{JSON.stringify(queryMap, null, 2)}</pre>
        </div>
      </div>
    </QueryContext.Provider>
  );
};

export default QueryBuilder;
