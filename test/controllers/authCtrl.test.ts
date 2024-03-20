import { Request, Response } from 'express';
import * as userService from '../../src/services/userService';
import * as authController from '../../src/controllers/authCtrl';
import { StatusCode } from '../../src/utils/enums';
import { User } from '../../src/utils/types';

// Mocking the user service
jest.mock('../../src/services/userService');
jest.mock('uuid', () => ({
  v4: jest.fn().mockReturnValue('84c22964-c123-481e-9c20-e94776bc8b5c'), // Custom UUID value
}));

// Test suite for Auth Controller
describe('Auth Controller', () => {
  // Mocked request and response objects
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as unknown as Response;

  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test suite for createUser endpoint
  describe('createUser', () => {
    test('should create a new user', () => {
      // Define request body
      const requestBody = {
        username: 'testuser',
        password: 'testpassword',
      };

      const createdUser = new User('testuser', 'testpassword');
      // Mock request object
      const mockRequest = { body: requestBody } as Request;

      const expectedUser = createdUser;
      // Mock return value of createUser function
      (userService.createUser as jest.Mock).mockReturnValueOnce(expectedUser);

      // Call createUser controller function
      authController.createUser(mockRequest, res);

      // Assertions
      expect(userService.createUser).toHaveBeenCalledWith(createdUser);
      expect(res.status).toHaveBeenCalledWith(StatusCode.CREATED);
      expect(res.json).toHaveBeenCalledWith(expectedUser);
    });

    test('should return 400 if required fields are missing', () => {
      // Mock request object with empty body
      const mockRequest = { body: {} } as Request;

      // Call createUser controller function
      authController.createUser(mockRequest, res);

      // Define expected response
      const expectedResponse = {
        message: 'Please provide username and password.',
      };

      // Assertions
      expect(res.status).toHaveBeenCalledWith(StatusCode.BAD_REQUEST);
      expect(res.json).toHaveBeenCalledWith(expectedResponse);
    });
  });

  // Test suite for loginUser endpoint
  describe('loginUser', () => {
    test('should return JWT token for valid user credentials', () => {
      process.env.JWT_SECRET = 'test_secret';
      // Define request body
      const requestBody = {
        username: 'testuser',
        password: 'testpassword',
      };

      // Mock user object
      const user = new User(requestBody.username, requestBody.password);

      // Mock return value of getUserByUsername function
      (userService.getUserByUsername as jest.Mock).mockReturnValueOnce(user);

      // Mock request object
      const mockRequest = { body: requestBody } as Request;

      // Call loginUser controller function
      authController.loginUser(mockRequest, res);

      // Assertions
      expect(userService.getUserByUsername).toHaveBeenCalledWith(requestBody.username);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ token: expect.any(String) }));
    });

    test('should return 401 if invalid user credentials', () => {
      // Define request body
      const requestBody = {
        username: 'testuser',
        password: 'wrongpassword',
      };

      // Mock return value of getUserByUsername function
      (userService.getUserByUsername as jest.Mock).mockReturnValueOnce(undefined);

      // Mock request object
      const mockRequest = { body: requestBody } as Request;

      // Call loginUser controller function
      authController.loginUser(mockRequest, res);

      // Define expected response
      const expectedResponse = {
        message: 'Invalid username or password.',
      };

      // Assertions
      expect(userService.getUserByUsername).toHaveBeenCalledWith(requestBody.username);
      expect(res.status).toHaveBeenCalledWith(StatusCode.UNAUTHORIZED);
      expect(res.json).toHaveBeenCalledWith(expectedResponse);
    });
  });


});
