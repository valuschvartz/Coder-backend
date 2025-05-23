import { usersService } from "../services/index.js";
import { createHash, passwordValidation } from "../utils/index.js";
import jwt from 'jsonwebtoken';
import UserDTO from '../dto/User.dto.js';
import dotenv from 'dotenv';
dotenv.config();

const SECRET = process.env.JWT_SECRET || 'tokenSecretJWT';

const register = async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;
        if (!first_name || !last_name || !email || !password)
            return res.status(400).send({ status: "error", error: "Incomplete values" });

        const exists = await usersService.getUserByEmail(email);
        if (exists)
            return res.status(400).send({ status: "error", error: "User already exists" });

        const hashedPassword = await createHash(password);
        const user = { first_name, last_name, email, password: hashedPassword };
        const result = await usersService.create(user);

        res.send({ status: "success", payload: result._id });
    } catch (error) {
        console.error("Error en register:", error);
        res.status(500).send({ status: "error", error: "Internal server error" });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).send({ status: "error", error: "Incomplete values" });

        const user = await usersService.getUserByEmail(email);
        if (!user)
            return res.status(404).send({ status: "error", error: "User doesn't exist" });

        const isValidPassword = await passwordValidation(user, password);
        if (!isValidPassword)
            return res.status(400).send({ status: "error", error: "Incorrect password" });

        const userDto = UserDTO.getUserTokenFrom(user);
        const token = jwt.sign(userDto, SECRET, { expiresIn: "1h" });

        res.cookie('coderCookie', token, { maxAge: 3600000 }).send({ status: "success", message: "Logged in" });
    } catch (error) {
        console.error("Error en login:", error);
        res.status(500).send({ status: "error", error: "Internal server error" });
    }
};

const current = async (req, res) => {
    try {
        const cookie = req.cookies['coderCookie'];
        if (!cookie)
            return res.status(401).send({ status: "error", error: "Unauthorized" });

        const user = jwt.verify(cookie, SECRET);
        res.send({ status: "success", payload: user });
    } catch (error) {
        console.error("Error en current:", error);
        res.status(401).send({ status: "error", error: "Invalid or expired token" });
    }
};

const unprotectedLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).send({ status: "error", error: "Incomplete values" });

        const user = await usersService.getUserByEmail(email);
        if (!user)
            return res.status(404).send({ status: "error", error: "User doesn't exist" });

        const isValidPassword = await passwordValidation(user, password);
        if (!isValidPassword)
            return res.status(400).send({ status: "error", error: "Incorrect password" });

        const token = jwt.sign(user, SECRET, { expiresIn: "1h" });
        res.cookie('unprotectedCookie', token, { maxAge: 3600000 }).send({ status: "success", message: "Unprotected Logged in" });
    } catch (error) {
        console.error("Error en unprotectedLogin:", error);
        res.status(500).send({ status: "error", error: "Internal server error" });
    }
};

const unprotectedCurrent = async (req, res) => {
    try {
        const cookie = req.cookies['unprotectedCookie'];
        if (!cookie)
            return res.status(401).send({ status: "error", error: "Unauthorized" });

        const user = jwt.verify(cookie, SECRET);
        res.send({ status: "success", payload: user });
    } catch (error) {
        console.error("Error en unprotectedCurrent:", error);
        res.status(401).send({ status: "error", error: "Invalid or expired token" });
    }
};

export default {
    current,
    login,
    register,
    unprotectedLogin,
    unprotectedCurrent
};