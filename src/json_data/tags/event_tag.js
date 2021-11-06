export const event_tag = (dimension_data, trigger_id) => {
  console.log("EVENT TAG", dimension_data, trigger_id);
  return {
    name: `${dimension_data.name} Tag`,
    type: "gaawe",
    parameter: [
      {
        type: "template",
        key: "eventName",
        value: `${dimension_data.pname}`,
      },
      {
        type: "list",
        key: "eventParameters",
        list: [
          {
            type: "map",
            map: [
              {
                type: "template",
                key: "name",
                value: `${dimension_data.pname}`,
              },
              {
                type: "template",
                key: "value",
                value: `{{${dimension_data.pname}}}`,
              },
            ],
          },
        ],
      },
      {
        type: "tagReference",
        key: "measurementId",
        value: "Google Analytics GA4 Configuration",
      },
    ],
    firingTriggerId: [trigger_id],
    tagFiringOption: "oncePerEvent",
  };
};

// {
//   "name": "my_tag",
//   "type": "gaawe",
//   "parameter": [
//     {
//       "type": "template",
//       "key": "eventName",
//       "value": "my_event"
//     },
//     {
//       "type": "tagReference",
//       "key": "measurementId",
//       "value": "Google Analytics GA4 Configuration"
//     },
//     {
//       "type": "list",
//       "key": "eventParameters",
//       "list": [
//         {
//           "type": "map",
//           "map": [
//             {
//               "type": "template",
//               "key": "name",
//               "value": "some_paraName"
//             },
//             {
//               "type": "template",
//               "key": "value",
//               "value": "{{dlv_var}}"
//             }
//           ]
//         }
//       ]
//     }
//   ],
//   "firingTriggerId": [
//     "14"
//   ]
// }
