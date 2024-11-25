
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";


export const prisma = new PrismaClient({ log: ["query"] });

dotenv.config();

