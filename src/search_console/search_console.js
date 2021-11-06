export const FetchAllSearchQuery = async (startDate, endDate) => {
  try {
    console.log(startDate, endDate);
    const data = await window.gapi.client.webmasters.searchanalytics.query({
      siteUrl: "sc-domain:meribachat.in",
      resource: {
        startDate: startDate,
        endDate: endDate,
        dimensions: ["QUERY", "PAGE"],
        dimensionFilterGroups: [
          {
            filters: [
              {
                dimension: "QUERY",
                expression: "ajio",
                operator: "CONTAINS",
              },
            ],
          },
        ],
        aggregationType: "byPage",
        rowLimit: 20000,
      },
    });
    console.log(data.result);
    return data.result;
  } catch (err) {
    console.log("ERROR", err.result);
  }
};
