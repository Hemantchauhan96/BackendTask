import jwt from "jsonwebtoken";
import dotenv from "dotenv";
export type Payload = {
  id: number;
  email: string;
  password: string;
};
dotenv.config();
const secret = process.env.JWT_SECRET;

export const signToken = (payload: Payload) => jwt.sign(payload, secret);

export const verifyToken = (token: string) => jwt.verify(token, secret);
