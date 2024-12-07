export interface Customer {
  companyLegalName: string;
  tin: string;
  address_1: string;
  address_2: string | null;
  email: string;
  phone: string;
  shortDescription: string | null;
}