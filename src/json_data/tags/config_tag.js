export const config_tag = (measurement_id) => {
  return {
    name: "Google Analytics GA4 Configuration",
    type: "gaawc",
    parameter: [
      {
        type: "boolean",
        key: "sendPageView",
        value: "true",
      },
      {
        type: "boolean",
        key: "enableSendToServerContainer",
        value: "false",
      },
      {
        type: "template",
        key: "measurementId",
        value: measurement_id,
      },
    ],
    firingTriggerId: ["2147479553"],
    tagFiringOption: "oncePerEvent",
  };
};
