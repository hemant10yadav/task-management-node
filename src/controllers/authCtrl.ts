import { Request, Response } from 'express';
import { StatusCode } from '../utils/enums';
import { User } from '../utils/types';
import * as userService from '../services/userService';
import Jwt from 'jsonwebtoken';


export const createUser = (req: Request, res: Response) => {
  const { username, password } = req.body;

  // Basic validation
  if (!username || !password) {
    return res.status(StatusCode.BAD_REQUEST).json({
      message:
        'Please provide username and password.',
    });
  }

  const newUser = new User(username, password);

  const createdUser = userService.createUser(newUser);

  return res.status(StatusCode.CREATED).json(createdUser);
};

export const loginUser = (req: Request, res: Response) => {
  const { username, password } = req.body;

  // Find user by username
  const user = userService.getUserByUsername(username);
  if (!user) {
    return res.status(StatusCode.UNAUTHORIZED).json({
      message: 'Invalid username or password.',
    });
  }

  // Verify password
  if (password !== user.password) {
    return res.status(StatusCode.UNAUTHORIZED).json({
      message: 'Invalid username or password.',
    });
  }

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
      message: 'JWT secret is not defined',
    });
  }
  // Generate JWT token
  const token = Jwt.sign({ userId: user.id }, jwtSecret, {
    expiresIn: '1h',
  });

  return res.json({ token });
};


export const changeUsername = (req: Request, res: Response) => {
  const userId = req.params.id; // Assuming userId is provided in the URL params
  const newUsername = req.body.username;

  // Basic validation
  if (!newUsername) {
    return res.status(StatusCode.BAD_REQUEST).json({
      message: 'Please provide a new username',
    });
  }

  const updatedUser = userService.changeUsername(userId, newUsername);
  if (!updatedUser) {
    return res.status(StatusCode.NOT_FOUND).json({
      message: 'User not found',
    });
  }

  return res.json(updatedUser);
};
