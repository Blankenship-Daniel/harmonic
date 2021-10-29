import React, { createContext, useEffect, useState } from "react";
import QueryEntry from "../QueryEntry/QueryEntry";
import { v4 as uuidv4 } from "uuid";
import { Api } from "../../Api";
import { CompanyInterface } from "../../interfaces/CompanyInterface";
import { HighlightInterface } from "../../interfaces/HighlightInterface";

type QueryContextType = {};
type FieldsType = {
  predicate: string;
  operator: string;
  query: string;
};
export const QueryContext = createContext({});

const QueryBuilder = () => {
  const [store, setStore] = useState([]);
  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    const fetchCompanies = async () => {
      const store = await Api.fetchStore();
      setStore(store);
    };

    fetchCompanies();
  }, []);

  const buildSearchString = () => {
    const q: any = Object.values(queryMap).reduce(
      (prev, curr) => (prev === "" ? curr : `${prev}&${curr}`),
      ""
    );
    const encoded = encodeURI(q);
    setSearchString(encoded);
  };

  const handleQueryUpdate = (
    context: QueryContextType,
    queryId: string,
    fields: FieldsType
  ) => {
    const query = {
      [queryId]: `predicate=${fields.predicate}|operator=${fields.operator}|query=${fields.query}`,
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
        <section className="TopNav">
          <section className="SearchBar">
            <section className="Queries">
              {queryEntries.map((query, i) => (
                <div key={`query-${i}`} className="Query">
                  <span>{i === 0 ? "where" : "and"}</span> {query}
                </div>
              ))}
            </section>
            <section className="Actions">
              <button
                className="AddFilterBtn"
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
                + Add New Filter
              </button>
              <button onClick={buildSearchString}>Search</button>
            </section>
          </section>
        </section>

        <section className="QueryString">
          <div className="QueryStringResponse">
            <pre>{JSON.stringify(queryMap, null, 2)}</pre>
          </div>
          <div className="SearchStringResponse">
            <pre>{JSON.stringify(searchString, null, 2)}</pre>
          </div>
        </section>

        <section className="QueryResponse">
          {store.map((company: CompanyInterface) => (
            <div className="QueryResponseEntry">
              <div className="QueryResponseEntryContent">
                <div className="CompanyName">{company.name}</div>
                <div className="CompanyHighlights">
                  {company.highlights.map((highlight: HighlightInterface) => (
                    <div className="Highlight">{highlight.category}</div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </QueryContext.Provider>
  );
};

export default QueryBuilder;
