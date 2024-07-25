import { Document } from 'mongoose';

export default class UserDto {
  email: string;
  id: string;
  isActivated: boolean;

  constructor(model: Document & { email: string; _id: string; isActivated: boolean }) {
    this.email = model.email;
    this.id = model._id.toString(); 
    this.isActivated = model.isActivated;
  }
}
