import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

function signToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET);
}

async function signup({ email, name, password }) {
  const existing = await prisma.user.findUnique({ where: { email } });

  if (existing) {
    const err = new Error("Email already in use");
    err.status = 400;
    throw err;
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: { email, name, password: passwordHash },
    });

    const token = signToken({ id: user.id, email: user.email });

    return {
      user: { id: user.id, email: user.email, name: user.name },
      token,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function signin({ email, password }) {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    const err = new Error("Invalid credentials");
    err.status = 401;
    throw err;
  }

  const ok = await bcrypt.compare(password, user.password);

  if (!ok) {
    const err = new Error("Invalid credentials");
    err.status = 401;
    throw err;
  }

  const token = signToken({ id: user.id, email: user.email });

  return {
    user: { id: user.id, email: user.email, name: user.name },
    token,
  };
}

export { signup, signin };
