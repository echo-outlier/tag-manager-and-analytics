import { user_id_dimension } from "../json_data/dimesions/userid";

export const fetchAllAnalyticsAccounts = async () => {
  try {
    const data = await window.gapi.client.analyticsadmin.accounts.list({});
    console.log(data.result);
    return data.result;
  } catch (err) {
    console.log(err);
  }
};

export const fetchAllAnalyticsProperties = async (property_id) => {
  try {
    const data = await window.gapi.client.analyticsadmin.properties.list({
      filter: `parent:${property_id}`,
    });
    console.log(data.result);
    return data.result;
  } catch (err) {
    console.log(err);
  }
};

export const fetchCustomDimension = async (selected_property) => {
  try {
    const data =
      await window.gapi.client.analyticsadmin.properties.customDimensions.list({
        parent: selected_property,
      });
    console.log(data.result);
  } catch (err) {
    console.log(err);
  }
};

export const createCustomDimension = async (
  selected_property,
  dimension_data
) => {
  try {
    const data =
      await window.gapi.client.analyticsadmin.properties.customDimensions.create(
        {
          parent: selected_property,
          ...user_id_dimension(dimension_data),
        }
      );
    console.log(data.result);
  } catch (err) {
    console.log("error", err);
  }
};

export const createDataStream = async (
  selected_property,
  datastream_formdata
) => {
  try {
    const data =
      await window.gapi.client.analyticsadmin.properties.webDataStreams.create({
        parent: selected_property,
        resource: {
          defaultUri: datastream_formdata.defaultURI,
          displayName: datastream_formdata.displayName,
        },
      });
    console.log(data.result);
    return data.result;
  } catch (err) {
    console.log("error", err);
  }
};
