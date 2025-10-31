export interface User {
    id: number;
    username: string;
    companyName: string;
    email: string;
}

export interface Entry {
  id: number;
  createdAt: string;
  name: string;
  phoneNumber: string;
  email: string;
  message: string;
  visualized: boolean;
}
