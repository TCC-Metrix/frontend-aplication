import { useNavigate } from "react-router-dom";
import ErrorPage from "../../ErrorPage/ErrorPage";
import { BasicInput, Button, RadioInput } from "../../../components";
import { GeneralEmployee } from "../../../utils/interfaces/Interfaces";
import { FieldValues, useForm } from "react-hook-form";
import { useUpdateEmployee } from "../../../services/useMutation";
import { toast } from "react-toastify";

type FormValues = {
  name: string | undefined;
  sector: string | undefined;
  email: string | undefined;
}

function UpdateEmployee() {
  const employee = sessionStorage.getItem("employee");
  let employeeData: GeneralEmployee | null = null;
  if (employee) {
    employeeData = JSON.parse(employee);
  } else {
    return <ErrorPage/>
  }

  const putEmployee = useUpdateEmployee(employeeData?.id)

  const initialValues: FormValues = {
    name: employeeData?.name,
    sector: employeeData?.sector,
    email: employeeData?.email,
  }
}