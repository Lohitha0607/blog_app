
# Inkwell
Inkwell is a full-stack blogging platform that allows users to sign up, sign in, read, and publish blogs. Built with a modern tech stack, this application emphasizes secure authentication and a seamless user experience.
Visit the site here ->>>>   https://blog-app-five-neon-17.vercel.app/


## Features

- User Authentication: Secure sign-up and sign-in processes using JWT (JSON Web Tokens) for authorization.
- Blog Management: Users can create, edit, delete, and view blogs, ensuring an intuitive and user-friendly interface.
- Postgres Database: Utilizes Prisma with PostgreSQL for efficient data management and relational integrity.
- Common Logic Package: Published an npm package ("loh-medium-common") for reusable logic across frontend and backend, promoting code reusability.
- Responsive Design: Built with Tailwind CSS, the application provides a responsive layout that adjusts to various screen sizes.


## Tech Stack

**Frontend:** React, Tailwind CSS

**Backend:** Hono (Cloudflare), Node.js, Express

**Database:** PostgreSQL (managed by Prisma)

**Authentication:**  JWT (JSON Web Tokens)

**Validation:**  Zod



## Screenshots

![App Screenshot](https://i.imgur.com/B87gdoO.png)

![App Screenshot](https://i.imgur.com/AzfIPPE.png)

![App Screenshot](https://i.imgur.com/Dc5OW2n.png)




## Installation
Fork and Clone the Repository

```bash
  git clone https://github.com/Lohitha0607/BlogApp.git  
```
Navigate to the Project Directory
```bash
  cd BlogApp
```
Setting Up the Frontend  
```bash
  cd frontend
  npm install
  npm run dev
```  
Now you can access Inkwell by visiting http://localhost:5173/ in your web browser.