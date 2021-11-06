export const user_id_dimension = (dimension_data) => {
  return {
    parameterName: dimension_data.pname,
    displayName: dimension_data.name,
    scope: dimension_data.type,
  };
};
