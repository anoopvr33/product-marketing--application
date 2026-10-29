export type VerificationData = {
  shopName: string;
  category: string;
  contactNumber: string;
  ownerConfirmed: boolean;

  gstNumber: string;
  gstCertificate: File | null;

  state: string;
  district: string;
  city: string;
  locality: string;
  pinCode: string;
  deliveryOptions: string[];

  accountHolder: string;
  accountNumber: string;
  ifscCode: string;
};

export const initialVerificationData: VerificationData = {
  shopName: "",
  category: "",
  contactNumber: "",
  ownerConfirmed: false,

  gstNumber: "",
  gstCertificate: null,

  state: "",
  district: "",
  city: "",
  locality: "",
  pinCode: "",
  deliveryOptions: [],

  accountHolder: "",
  accountNumber: "",
  ifscCode: "",
};

export const verificationSteps = [
  "Basic Information",
  "GST Verification",
  "Address Details",
  "Bank Details",
  "Review & Submit",
];
