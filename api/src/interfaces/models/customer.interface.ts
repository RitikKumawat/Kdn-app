export interface ICustomerModel extends Document {
  firstName: string;
  lastName: string;
  contactNumber: string;
  address: string;
  region: string;
  boxNumber: string;
}
