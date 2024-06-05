import React, { useContext } from "react";
import { GetTheAppContext } from "../../context/AppContext";
import { TablaGeneric } from "./table";
const EmployeeList = () => {
  const { dataGetAllemployee } = useContext(GetTheAppContext);

  return <TablaGeneric title="EMPLEADOS" data={dataGetAllemployee || []} />;
};

export default EmployeeList;
