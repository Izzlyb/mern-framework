import express from "express";
import dotenv from "dotenv";
import userRoutes from './routes/userRoutes.js';
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";



dotenv.config();

const port = process.env.PORT || 9000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use('/api/users', userRoutes);

app.get("/", (req, res) => res.send(`Server is ready and listening:`));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));


// - ** POST /api/users** - Register a user
// - ** POST /api/users/auth** - Authentification a user and get token
// - ** POST /api/users/logout** - Logout user and clear cookie
// - ** GET /api/users/profile** - Get user and clear cookie
// - ** PUT /api/users/profile** - Update profile
