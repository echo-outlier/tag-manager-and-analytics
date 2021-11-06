export const InitializeGoogleApiClient = async () => {
  await loadTagManagerClient();
  await loadAnalyticsClient();
  await loadSearchConsoleClient();
  await authenticate();
};

async function authenticate() {
  try {
    await window.gapi.auth2.getAuthInstance().signIn({
      scope:
        "https://www.googleapis.com/auth/tagmanager.edit.containers https://www.googleapis.com/auth/tagmanager.readonly https://www.googleapis.com/auth/analytics.edit https://www.googleapis.com/auth/analytics.readonly https://www.googleapis.com/auth/analytics.edit https://www.googleapis.com/auth/analytics.readonly https://www.googleapis.com/auth/webmasters https://www.googleapis.com/auth/webmasters.readonly",
    });
    console.log("Sign-in successful");
  } catch (err) {
    console.error("Error signing in", err.result);
  }
}

async function loadTagManagerClient() {
  try {
    await window.gapi.client.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);
    window.gapi.client.load(
      "https://content.googleapis.com/discovery/v1/apis/tagmanager/v2/rest"
    );
    console.log("GAPI client loaded for Tag Manager API");
  } catch (err) {
    console.log("Error loading GAPI client for Tag Manager API", err.result);
  }
}

async function loadAnalyticsClient() {
  window.gapi.client.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);
  await window.gapi.client
    .load(
      "https://analyticsadmin.googleapis.com/$discovery/rest?version=v1alpha"
    )
    .then(
      function () {
        console.log("GAPI client loaded for Analytics API");
      },
      function (err) {
        console.error("Error loading GAPI client for API", err);
      }
    );
}

async function loadSearchConsoleClient() {
  window.gapi.client.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);
  await window.gapi.client
    .load(
      "https://content.googleapis.com/discovery/v1/apis/searchconsole/v1/rest"
    )
    .then(
      function () {
        console.log("Search Console client loaded for Analytics API");
      },
      function (err) {
        console.error("Error loading GAPI client for API", err);
      }
    );
}
