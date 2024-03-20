import { v4 as uuidv4 } from 'uuid';

export class Task {
  id: string;
  title: string;
  description: string;
  creationDate: Date;
  dueDate: Date;
  assignedTo: string;
  category: string;
  status: string;

  constructor (
    title: string,
    description: string,
    dueDate: Date,
    assignedTo: string,
    category: string,
  ) {
    this.id = uuidv4();
    this.title = title;
    this.description = description || '';
    this.creationDate = new Date();
    this.dueDate = dueDate;
    this.assignedTo = assignedTo;
    this.category = category;
    this.status = 'Pending';
  }
}

export class User {
  id: string;
  username: string;
  password: string;
  constructor (username: string, password: string) {
    this.id = uuidv4();
    this.username = username;
    this.password = password;
  }

}

