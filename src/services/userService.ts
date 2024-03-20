import { User } from '../utils/types';


const users: User[] = [{
  username: 'hemant',
  password: '12345',
  id: '2bcb7f96-f680-456c-90d3-2f0b5ec81765',
}];

export function createUser (newUser: User): User {
  users.push(newUser);
  return newUser;
}

export function getUserByUsername (username: string): User | undefined {
  return users.find(user => user.username === username);
}

export function changeUsername (userId: string, newUsername: string): User | undefined {
  const userIndex = users.findIndex(user => user.id === userId);
  if (userIndex === -1) {
    return undefined; // User not found
  }
  users[userIndex].username = newUsername;
  return users[userIndex];
}
