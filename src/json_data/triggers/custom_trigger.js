export const custom_trigger = (dimension_data) => {
  return {
    name: `${dimension_data.name} Trigger`,
    type: "customEvent",
    customEventFilter: [
      {
        type: "equals",
        parameter: [
          {
            type: "template",
            key: "arg0",
            value: "{{_event}}",
          },
          {
            type: "template",
            key: "arg1",
            value: `${dimension_data.pname}`,
          },
        ],
      },
    ],
  };
};
