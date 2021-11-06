import React, { useEffect, useState } from "react";
import { InitializeGoogleApiClient } from "./initialize_client";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import { FetchAllSearchQuery } from "./search_console/search_console";
import { DataGrid } from "@mui/x-data-grid";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import "date-fns";

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "date",
    headerName: "Date",
    width: 150,
  },
  {
    field: "page",
    headerName: "Page",
    width: 300,
  },
  {
    field: "query",
    headerName: "Query",
    width: 250,
  },
  {
    field: "clicks",
    headerName: "Clicks",
    width: 150,
  },
  {
    field: "impressions",
    headerName: "Impressions",
    width: 190,
  },
  {
    field: "ctr",
    headerName: "CTR",
    width: 110,
  },
  {
    field: "position",
    headerName: "Position",
    width: 160,
  },
];

const Search = () => {
  const [selectedstartDate, setSelectedstartDate] = useState(
    new Date("2021-04-01")
  );
  const [selectedendDate, setSelectedendDate] = useState(
    new Date("2021-05-01")
  );
  const [startDate, setstartDate] = useState(null);
  const [endDate, setendDate] = useState(null);

  useEffect(() => {
    console.log(selectedstartDate.toJSON());
    const date = selectedstartDate.getDate();
    let month = selectedstartDate.getMonth();
    const imonth = parseInt(month) + 1;
    month = imonth.toString();
    const year = selectedstartDate.getFullYear();
    console.log(
      `start ${year}-${("0" + month).slice(-2)}-${("0" + date).slice(-2)}`
    );
    setstartDate(
      `${year}-${("0" + month).slice(-2)}-${("0" + date).slice(-2)}`
    );
  }, [selectedstartDate]);

  useEffect(() => {
    const date1 = selectedendDate.getDate();
    let month1 = selectedendDate.getMonth();
    const imonth1 = parseInt(month1) + 1;
    month1 = imonth1.toString();
    const year1 = selectedendDate.getFullYear();
    console.log(
      `end ${year1}-${("0" + month1).slice(-2)}-${("0" + date1).slice(-2)}`
    );
    setendDate(
      `${year1}-${("0" + month1).slice(-2)}-${("0" + date1).slice(-2)}`
    );
  }, [selectedendDate]);

  useEffect(() => {
    window.gapi.load("client:auth2", () => {
      window.gapi.client.init({
        apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        scope:
          "https://www.googleapis.com/auth/tagmanager.edit.containers https://www.googleapis.com/auth/tagmanager.readonly",
      });
    });
  }, []);
  const [rows, setrows] = useState([]);

  const FetchQuery = async () => {
    const result = await FetchAllSearchQuery(startDate, endDate);
    const result_rows = result?.rows;
    if (result_rows) {
      // console.log("result", result_rows);
      let modified_rows = [];
      for (let i = 0; i < result_rows.length; i++) {
        const obj = result_rows[i];
        const new_obj = {
          ...obj,
          id: i,
          query: obj.keys[0],
          page: obj.keys[1],
          date: obj.keys[2],
          device: obj.keys[3],
          keys: undefined,
        };
        modified_rows.push(new_obj);
      }
      console.log("final_data", modified_rows);
      setrows(modified_rows);
    }
  };

  return (
    <React.Fragment>
      <Flex>
        <Button
          onClick={InitializeGoogleApiClient}
          style={{ backgroundColor: "#3f51b5", color: "white" }}
        >
          Initialize Client
        </Button>
        <Button
          onClick={FetchQuery}
          style={{ backgroundColor: "#3f51b5", color: "white" }}
        >
          Fetch Query
        </Button>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Flex>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="start-date"
              label="Start Date"
              value={selectedstartDate}
              onChange={(date) => setSelectedstartDate(date)}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
              style={{ marginLeft: 20 }}
            />
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="end-date"
              label="End Date"
              value={selectedendDate}
              onChange={(date) => setSelectedendDate(date)}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
              style={{ marginLeft: 20 }}
            />
          </Flex>
        </MuiPickersUtilsProvider>
      </Flex>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={90}
        rowsPerPageOptions={[15, 10, 5]}
        // checkboxSelection
        // disableSelectionOnClick
      />
    </React.Fragment>
  );
};

export default Search;
