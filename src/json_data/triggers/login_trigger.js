export const login_trigger = (dimension_data) => {
  return {
    name: `${dimension_data.name} Trigger`,
    type: "click",
    filter: [
      {
        type: "contains",
        parameter: [
          {
            type: "template",
            key: "arg0",
            value: "{{Click Classes}}",
          },
          {
            type: "template",
            key: "arg1",
            value: "submitbtn",
          },
        ],
      },
    ],
  };
};
