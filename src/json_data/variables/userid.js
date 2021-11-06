export const userId_dlv = (pname) => {
  return {
    name: `${pname}`,
    type: "v",
    parameter: [
      {
        type: "integer",
        key: "dataLayerVersion",
        value: "2",
      },
      {
        type: "boolean",
        key: "setDefaultValue",
        value: "false",
      },
      {
        type: "template",
        key: "name",
        value: `${pname}`,
      },
    ],
  };
};
