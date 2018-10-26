import React from "react";
import { render } from "react-dom";
import _ from "lodash";
import namor from "namor";
import Axios from "axios";
// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

const range = len => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = () => {
  const statusChance = Math.random();
  return {
    firstName: namor.generate({ words: 1, numbers: 0 }),
    lastName: namor.generate({ words: 1, numbers: 0 }),
    age: Math.floor(Math.random() * 30),
    visits: Math.floor(Math.random() * 100),
    progress: Math.floor(Math.random() * 100),
    status:
      statusChance > 0.66
        ? "relationship"
        : statusChance > 0.33
          ? "complicated"
          : "single"
  };
};

export function makeData(len = 50) {
  return range(len).map(d => {
    return {
      ...newPerson()
      // children: range(10).map(newPerson)
    };
  });
}

export const Logo = () => (
  <div
    style={{
      margin: "1rem auto",
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center"
    }}
  >
    For more examples, visit {""}
    <br />
    <a href="https://github.com/react-tools/react-table" target="_blank">
      <img
        src="https://github.com/react-tools/media/raw/master/logo-react-table.png"
        style={{ width: `150px`, margin: ".5em auto .3em" }}
      />
    </a>
  </div>
);

export const Tips = () => (
  <div style={{ textAlign: "center" }}>
    <em>Tip: Hold shift when sorting to multi-sort!</em>
  </div>
);

const rawData = makeData();

const requestData = (pageSize, page, sorted, filtered) => {
  return new Promise((resolve, reject) => {
    // You can retrieve your data however you want, in this case, we will just use some local data.
    //let filteredData = rawData;
    Axios.get("http://localhost:3500/applicant").then(res => {
      // Update react-table
      let filteredData = res.data;
      // You can use the filters in your request, but you are responsible for applying them.
      if (filtered.length) {
        filteredData = filtered.reduce((filteredSoFar, nextFilter) => {
          return filteredSoFar.filter(row => {
            return (row[nextFilter.id] + "").includes(nextFilter.value);
          });
        }, filteredData);
      }
      // You can also use the sorting in your request, but again, you are responsible for applying it.
      const sortedData = _.orderBy(
        filteredData,
        sorted.map(sort => {
          return row => {
            if (row[sort.id] === null || row[sort.id] === undefined) {
              return -Infinity;
            }
            return typeof row[sort.id] === "string"
              ? row[sort.id].toLowerCase()
              : row[sort.id];
          };
        }),
        sorted.map(d => (d.desc ? "desc" : "asc"))
      );

      // You must return an object containing the rows of the current page, and optionally the total pages number.
      const res1 = {
        rows: sortedData.slice(pageSize * page, pageSize * page + pageSize),
        pages: Math.ceil(filteredData.length / pageSize)
      };

      // Here we'll simulate a server response with 500ms of delay.
      setTimeout(() => resolve(res1), 500);
    });
  });
};

class Test extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      pages: null,
      loading: true
    };
    this.fetchData = this.fetchData.bind(this);
  }
  fetchData(state, instance) {
    // Whenever the table model changes, or the user sorts or changes pages, this method gets called and passed the current table model.
    // You can set the `loading` prop of the table to true to use the built-in one or show you're own loading bar if you want.
    this.setState({ loading: true });
    // Request the data however you want.  Here, we'll use our mocked service we created earlier
    requestData(state.pageSize, state.page, state.sorted, state.filtered).then(
      res => {
        // Now just get the rows of data to your React Table (and update anything else like total pages or loading)
        this.setState({
          data: res.rows,
          pages: res.pages,
          loading: false
        });
      }
    );
  }
  render() {
    const { data, pages, loading } = this.state;
    return (
      <div
        className="row justify-content-md-center"
        style={{ padding: "100px" }}
      >
        <div className="col-md-10">
          <div class="card">
            <div class="card-body">
              <ReactTable
                columns={[
                  {
                    Header: "Name",
                    accessor: "name"
                  },
                  {
                    Header: "Company",
                    //   id: "company",
                    accessor: "company"
                  },
                  {
                    Header: "technology",
                    accessor: "technology"
                  },
                  {
                    Header: "phone Number",
                    id: "phoneNumber",
                    accessor: "phoneNumber"
                  }
                ]}
                pageSizeOptions={[5, 10, 15, 18, 20, 30]}
                manual // Forces table not to paginate or sort automatically, so we can handle it server-side
                data={data}
                pages={pages} // Display the total number of pages
                loading={loading} // Display the loading overlay when we need it
                onFetchData={this.fetchData} // Request new data when things change
                filterable
                defaultPageSize={18}
                className=" -highlight"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Test;
