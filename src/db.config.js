
import dotenv from "dotenv"; //환경변수 관리
import { PrismaClient } from "@prisma/client";


export const prisma = new PrismaClient({ log: ["query"] });

dotenv.config();

