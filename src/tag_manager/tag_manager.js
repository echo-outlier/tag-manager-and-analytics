import { config_tag } from "../json_data/tags/config_tag";
import { event_tag } from "../json_data/tags/event_tag";
import { custom_trigger } from "../json_data/triggers/custom_trigger";
import { userId_dlv } from "../json_data/variables/userid";

export const FetchAllTagManagerAccounts = async () => {
  try {
    const data = await window.gapi.client.tagmanager.accounts.list({});
    console.log(data.result);
    return data.result;
  } catch (err) {
    console.log("ERROR", err.result);
  }
};

export const FetchAllTagManagerContainers = async (container_path) => {
  try {
    const data = await window.gapi.client.tagmanager.accounts.containers.list({
      parent: container_path,
    });
    console.log(data.result);
    return data.result;
  } catch (err) {
    console.log("ERROR", err.result);
  }
};

export const FetchAllTagManagerWorkspaces = async (workspace_path) => {
  try {
    const data =
      await window.gapi.client.tagmanager.accounts.containers.workspaces.list({
        parent: workspace_path,
      });
    console.log(data.result);
    return data.result;
  } catch (err) {
    console.log("ERROR", err.result);
  }
};

export const CreateConfigTag = async (parent_path, measurement_id) => {
  try {
    const data =
      await window.gapi.client.tagmanager.accounts.containers.workspaces.tags.create(
        {
          parent: parent_path,
          ...config_tag(measurement_id),
        }
      );
    console.log("Created Configuration Tag");
    console.log(data.result);
  } catch (err) {
    console.log("ERROR", err.result);
  }
};

export const createEventTrigger = async (parent_path, dimension_data) => {
  try {
    const data =
      await window.gapi.client.tagmanager.accounts.containers.workspaces.triggers.create(
        {
          parent: parent_path,
          ...custom_trigger(dimension_data),
        }
      );
    console.log("Created Event Trigger");
    console.log("data", data.result);
    return data.result;
  } catch (err) {
    console.log(err);
  }
};

export const createEventTag = async (
  parent_path,
  dimension_data,
  trigger_id,
  measurement_id
) => {
  try {
    const data =
      await window.gapi.client.tagmanager.accounts.containers.workspaces.tags.create(
        {
          parent: parent_path,
          ...event_tag(dimension_data, trigger_id),
        }
      );
    console.log("Created Event Tag");
    console.log(data.result);
    return data.result;
  } catch (err) {
    console.log(err.result);
  }
};

export const createDataLayerVariable = async (parent_path, pname) => {
  try {
    const data =
      await window.gapi.client.tagmanager.accounts.containers.workspaces.variables.create(
        {
          parent: parent_path,
          ...userId_dlv(pname),
        }
      );
    console.log("Created DataLayer Variable");
    console.log(data.result);
  } catch (err) {
    console.log(err.result);
  }
};

export const fetchAllTags = () => {
  window.gapi.client.tagmanager.accounts.containers.workspaces.tags
    .list({ parent: process.env.REACT_APP_TAG_MANAGER_WORKSPACE })
    .then(
      (res) => {
        console.log(res.result);
      },
      (err) => {
        console.log(err.result);
      }
    );
};

export const fetchAllTrigger = () => {
  window.gapi.client.tagmanager.accounts.containers.workspaces.triggers
    .list({ parent: process.env.REACT_APP_TAG_MANAGER_WORKSPACE })
    .then(
      (res) => {
        console.log(res.result);
      },
      (err) => {
        console.log(err.result);
      }
    );
};

export const fetchAllVariables = () => {
  window.gapi.client.tagmanager.accounts.containers.workspaces.variables
    .list({ parent: process.env.REACT_APP_TAG_MANAGER_WORKSPACE })
    .then(
      (res) => {
        console.log(res.result);
      },
      (err) => {
        console.log(err.result);
      }
    );
};
