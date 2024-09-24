import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign } from 'hono/jwt';
import { signupInput, signinInput } from 'loh-medium-common';

// Create userRouter
export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

// Helper function to log environment variables for debugging
function logEnvVariables(c: any) {
  console.log('DATABASE_URL:', c.env.DATABASE_URL ? 'Set' : 'Not Set');
  console.log('JWT_SECRET:', c.env.JWT_SECRET ? 'Set' : 'Not Set');
}

// Signup Route
userRouter.post('/signup', async (c) => {
  logEnvVariables(c);  // Log env variables to check if they are accessible

  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);

  if (!success) {
    c.status(400); // Use 400 Bad Request for invalid inputs
    return c.json({
      message: 'Invalid input data',
    });
  }

  // Initialize Prisma client with Accelerate extension
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    // Create the new user in the database
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password, // (In future, hash password before storing it)
      },
    });

    // Sign the JWT with the user's ID
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ jwt });
  } catch (e) {
    c.status(403); // Use 403 Forbidden if something goes wrong (e.g., user already exists)
    console.error('Signup Error:', e); // Log the actual error for debugging
    return c.json({ error: 'Error while signing up' });
  }
});

// Signin Route
userRouter.post('/signin', async (c) => {
  logEnvVariables(c);  // Log env variables to check if they are accessible

  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);

  if (!success) {
    c.status(400); // Use 400 Bad Request for invalid inputs
    return c.json({
      message: 'Invalid input data',
    });
  }

  // Initialize Prisma client with Accelerate extension
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    // Find the user in the database by email
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (!user) {
      c.status(403); // Use 403 Forbidden if the user is not found
      return c.json({ error: 'User not found' });
    }

    // (In future, compare hashed password here)

    // Sign the JWT with the user's ID
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ jwt });
  } catch (e) {
    c.status(403); // Use 403 Forbidden if something goes wrong
    console.error('Signin Error:', e); // Log the actual error for debugging
    return c.json({ error: 'Error while signing in' });
  }
});
