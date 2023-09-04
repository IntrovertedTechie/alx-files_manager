import dbClient from '../utils/db';
import sha1 from 'sha1';

export default class UsersController {
  static async postNew(request, response) {
    // Get the email and password from the request body
    const { email, password } = request.body;

    // Check if email and password are provided
    if (!email) {
      return response.status(400).json({ error: 'Missing email' });
    }
    if (!password) {
      return response.status(400).json({ error: 'Missing password' });
    }

    // Check if the email already exists in the database
    const userExists = await dbClient.getUserByEmail(email);
    if (userExists) {
      return response.status(400).json({ error: 'Already exist' });
    }

    // Hash the password using SHA1
    const hashedPassword = sha1(password);

    // Create the new user object
    const newUser = {
      email,
      password: hashedPassword,
    };

    try {
      // Insert the new user into the database
      const result = await dbClient.createUser(newUser);

      // Return the new user with only email and id
      return response.status(201).json({ id: result.id, email: result.email });
    } catch (error) {
      // Handle any database insertion errors here
      return response.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // Implement other methods as needed, e.g., getMe
}
