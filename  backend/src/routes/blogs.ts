import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { verify } from 'hono/jwt';
import { createBlogInput, updateBlogInput } from 'loh-medium-common';

export const blogRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		JWT_SECRET: string;
	};
	Variables: {
		userId: string;
	};
}>();

// Middleware for JWT verification
blogRouter.use('/*', async (c, next) => {
	const jwt = c.req.header('Authorization');
	if (!jwt) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
	const token = jwt.split(' ')[1];
	const payload = await verify(token, c.env.JWT_SECRET);
	if (!payload || typeof payload.id !== 'string') {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
	c.set('userId', payload.id);
	await next();
});

// Bulk get posts (consider adding pagination)
blogRouter.get('/bulk', async (c) => {
	const prisma = new PrismaClient({ datasourceUrl: c.env?.DATABASE_URL }).$extends(withAccelerate());
	const posts = await prisma.post.findMany({});
	return c.json(posts);
});

// Get a specific post by ID
blogRouter.get('/:id', async (c) => {
	const id = c.req.param('id');
	const prisma = new PrismaClient({ datasourceUrl: c.env?.DATABASE_URL }).$extends(withAccelerate());

	try {
		const post = await prisma.post.findUnique({ where: { id } });
		if (!post) {
			c.status(404);
			return c.json({ error: "Post not found" });
		}
		return c.json(post);
	} catch (error) {
		console.error("Error fetching post:", error);
		c.status(500);
		return c.json({ error: "Error fetching post" });
	}
});

// Add a new post
blogRouter.post('/add', async (c) => {
	try {
		const body = await c.req.json();
		const { success } = createBlogInput.safeParse(body);
		if (!success) {
			c.status(411);
			return c.json({ message: "wrong inputs" });
		}
		console.log("Request Body:", body);
		const userId = c.get('userId');
		console.log("User ID:", userId);

		const prisma = new PrismaClient({ datasourceUrl: c.env?.DATABASE_URL }).$extends(withAccelerate());
		const post = await prisma.post.create({
			data: {
				title: body.title,
				content: body.content,
				authorId: userId,
			},
		});
		console.log("Created Post:", post);
		return c.json({ id: post.id });
	} catch (error) {
		console.error("Error creating post:", error);
		c.status(500);
		return c.json({ error: "Internal Server Error: Unable to create post." });
	}
});

// Update an existing post
blogRouter.put('/update', async (c) => {
	const userId = c.get('userId');
	const prisma = new PrismaClient({ datasourceUrl: c.env?.DATABASE_URL }).$extends(withAccelerate());
	const body = await c.req.json();
	const { success } = updateBlogInput.safeParse(body);
	if (!success) {
		c.status(411);
		return c.json({ message: "wrong inputs" });
	}
	console.log("Received userId:", userId);
	console.log("Received post ID:", body.id);
	console.log("New title:", body.title);
	console.log("New content:", body.content);

	try {
		const updatedPost = await prisma.post.update({
			where: {
				id: body.id,
				authorId: userId,
			},
			data: {
				title: body.title,
				content: body.content,
			},
		});
		console.log("Updated post:", updatedPost);
		return c.json({ message: 'Post updated successfully' });
	} catch (error) {
		console.error("Error updating post:", error);
		c.status(500);
		return c.json({ error: "Error updating post" });
	}
});
