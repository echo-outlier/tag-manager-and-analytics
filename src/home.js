import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Button, useScrollTrigger } from "@material-ui/core";
import { InitializeGoogleApiClient } from "./initialize_client";
import {
  fetchCustomDimension,
  createCustomDimension,
  fetchAllAnalyticsAccounts,
  fetchAllAnalyticsProperties,
  createDataStream,
} from "./analytics/analytics";
import {
  fetchAllTags,
  fetchAllTrigger,
  fetchAllVariables,
  CreateConfigTag,
  createEventTag,
  createEventTrigger,
  createDataLayerVariable,
  FetchAllTagManagerAccounts,
  FetchAllTagManagerContainers,
  FetchAllTagManagerWorkspaces,
} from "./tag_manager/tag_manager";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@material-ui/core";

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const Home = () => {
  const [dimension_type, setdimension_type] = useState("EVENT");
  const [dimension_data, setdimension_data] = useState(null);
  const [pname, setpname] = useState("");
  const [dname, setdname] = useState("");
  const [webstream_formdata, setwebstream_formdata] = useState({
    defaultURI: "",
    displayName: "",
  });
  const [trigger_id, settrigger_id] = useState(null);

  const [all_workspace, setall_workspace] = useState([]);
  const [selected_workspace, setselected_workspace] = useState("");
  const [all_accounts, setall_accounts] = useState([]);
  const [selected_account, setselected_account] = useState("");
  const [all_properties, setall_properties] = useState([]);
  const [selected_property, setselected_property] = useState("");
  const [gta_accounts, setgta_accounts] = useState([]);
  const [selected_gtaaccount, setselected_gtaaccount] = useState([]);
  const [all_containers, setall_containers] = useState([]);
  const [selected_container, setselected_container] = useState("");
  const [measurement_id, setmeasurement_id] = useState(false);

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

  useEffect(() => {
    console.log(selected_workspace);
  }, [selected_workspace]);

  useEffect(() => {
    console.log(gta_accounts, all_containers);
  }, [gta_accounts, all_containers]);

  useEffect(() => {
    setdimension_data({
      name: dname,
      pname: pname,
      type: dimension_type,
    });
  }, [dname, pname, dimension_type]);

  useEffect(() => {
    if (trigger_id) {
      createEventTag(
        selected_workspace,
        dimension_data,
        trigger_id,
        measurement_id
      );
      createDataLayerVariable(selected_workspace, pname);
      createDimesions();
    }
  }, [trigger_id]);

  const createDimesions = async () => {
    await createCustomDimension(selected_property, dimension_data);
  };

  const configureAllTags = async () => {
    await CreateConfigTag(selected_workspace, measurement_id);
    const id = await createEventTrigger(selected_workspace, dimension_data);
    console.log("id", id.triggerId);
    settrigger_id(id.triggerId);
  };

  const allaccounts_gta = async () => {
    const accounts = await FetchAllTagManagerAccounts();
    console.log("accoutns", accounts);
    setgta_accounts(accounts.account);
  };

  const allaccounts_analytics = async () => {
    const accounts = await fetchAllAnalyticsAccounts();
    setall_accounts(accounts.accounts);
  };

  const fetchAllContainer = async (account_path) => {
    const containers = await FetchAllTagManagerContainers(account_path);
    console.log("container", containers);
    setall_containers(containers.container);
  };

  const fetchAllWorkspaces = async (container_path) => {
    console.log("container_path", container_path);
    const workspaces = await FetchAllTagManagerWorkspaces(container_path);
    console.log("container", workspaces);
    setall_workspace(workspaces.workspace);
  };

  const fetchAllProperties = async (property_id) => {
    const properties = await fetchAllAnalyticsProperties(property_id);
    setall_properties(properties.properties);
    console.log(properties);
  };

  const createMeasurementId = async () => {
    const webstream = await createDataStream(
      selected_property,
      webstream_formdata
    );
    setmeasurement_id(webstream.measurementId);
    console.log("measurementid", webstream);
  };

  useEffect(() => {
    console.log(webstream_formdata, selected_property, measurement_id);
  }, [webstream_formdata, selected_property, measurement_id]);

  return (
    <React.Fragment>
      <Flex>
        <Button
          onClick={InitializeGoogleApiClient}
          style={{ backgroundColor: "#3f51b5", color: "white" }}
        >
          Initialize API
        </Button>
        <Button
          onClick={() => {
            allaccounts_gta();
            allaccounts_analytics();
          }}
          style={{ backgroundColor: "#3f51b5", color: "white" }}
        >
          Start
        </Button>
      </Flex>
      <Flex>
        <FormControl style={{ width: "200px", display: "flex", gap: "20px" }}>
          <InputLabel id="account-select">Select Analytics Account</InputLabel>
          <Select
            style={{ minWidth: 200 }}
            labelId="account-select"
            id="account-select-tag"
            value={selected_account}
            onChange={(e) => {
              fetchAllProperties(e.target.value);
              setselected_account(e.target.value);
            }}
          >
            {all_accounts.map((account) => {
              return (
                <MenuItem key={account.name} value={account.name}>
                  {account.displayName}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl style={{ width: "200px", display: "flex", gap: "20px" }}>
          <InputLabel id="account-select-gta">Select GTA Account</InputLabel>
          <Select
            style={{ minWidth: 200 }}
            labelId="account-select-gta"
            id="account-select-tag-gta"
            value={selected_gtaaccount}
            onChange={(e) => {
              fetchAllContainer(e.target.value);
              setselected_gtaaccount(e.target.value);
            }}
          >
            {gta_accounts.map((account) => {
              return (
                <MenuItem key={account.path} value={account.path}>
                  {account.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl style={{ width: "200px", display: "flex", gap: "20px" }}>
          <InputLabel id="property-select">
            Select Analytics Property
          </InputLabel>
          <Select
            style={{ minWidth: 200 }}
            labelId="property-select"
            id="property-select-id"
            value={selected_property}
            onChange={(e) => {
              // FetchAllWorkspaces(e.target.value);
              setselected_property(e.target.value);
            }}
          >
            {all_properties.map((property) => {
              return (
                <MenuItem key={property.name} value={property.name}>
                  {property.displayName}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl style={{ width: "200px", display: "flex", gap: "20px" }}>
          <InputLabel id="container-select">Select GTA Container</InputLabel>
          <Select
            style={{ minWidth: 200 }}
            labelId="container-select"
            id="container-select-id"
            value={selected_container}
            onChange={(e) => {
              fetchAllWorkspaces(e.target.value);
              setselected_container(e.target.value);
            }}
          >
            {all_containers.map((container) => {
              return (
                <MenuItem key={container.path} value={container.path}>
                  {container.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl style={{ width: "200px", display: "flex", gap: "20px" }}>
          <InputLabel id="workspace-select">Select GTA Workspace</InputLabel>
          <Select
            style={{ minWidth: 200 }}
            labelId="workspace-select"
            id="workspace-select-id"
            value={selected_workspace}
            onChange={(e) => {
              // fetchAllWorkspaces(e.target.value);
              setselected_workspace(e.target.value);
            }}
          >
            {all_workspace.map((workspace) => {
              return (
                <MenuItem key={workspace.path} value={workspace.path}>
                  {workspace.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Flex>
      {/* CREATE MEASUREMENT ID */}
      <Flex>
        <FormControl style={{ width: "200px", display: "flex", gap: "20px" }}>
          <TextField
            value={webstream_formdata.displayName}
            onChange={(e) => {
              setwebstream_formdata((prev) => {
                return { ...prev, displayName: e.target.value };
              });
            }}
            label="Data Stream Name"
          />

          <TextField
            value={webstream_formdata.defaultURI}
            onChange={(e) => {
              setwebstream_formdata((prev) => {
                return { ...prev, defaultURI: e.target.value };
              });
            }}
            label="Data Stream Default URL"
          />
          <Button
            onClick={createMeasurementId}
            style={{ backgroundColor: "#3f51b5", color: "white" }}
          >
            Create
          </Button>
        </FormControl>
      </Flex>
      {/* ALL CUSTOM DIMENSTION FORM DATA */}
      <Flex>
        <FormControl style={{ width: "200px", display: "flex", gap: "20px" }}>
          <InputLabel id="input-select">Dimension Type</InputLabel>
          <Select
            style={{ minWidth: 200 }}
            labelId="input-select"
            id="demo-simple-select"
            value={dimension_type}
            onChange={(e) => setdimension_type(e.target.value)}
          >
            <MenuItem value="EVENT">Event</MenuItem>
            <MenuItem value="USER">User</MenuItem>
          </Select>
          <TextField
            value={dname}
            onChange={(e) => setdname(e.target.value)}
            label="Dimension Name"
          />
          <TextField
            value={pname}
            onChange={(e) => setpname(e.target.value)}
            label="Event Parameter Name "
          />
          <Button
            onClick={configureAllTags}
            style={{ backgroundColor: "#3f51b5", color: "white" }}
          >
            Submit
          </Button>
        </FormControl>
      </Flex>
    </React.Fragment>
  );
};

export default Home;
