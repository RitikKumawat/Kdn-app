import { object, string } from "yup";

export const customerAddSchema = object({
  firstName: string().required("First Name is required"),
  lastName: string().required("Last Name is required"),
  contactNumber: string().required("Contact number is required"),
  address: string().required("Address is required"),
});
