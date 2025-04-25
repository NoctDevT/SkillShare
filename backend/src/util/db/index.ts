import { PrismaClient } from "../../../prisma/app/generated/prisma/client";

const prisma = new PrismaClient()

export default prisma;

export { createUser } from "./repository/createUser";
export { getUserByEmail } from "./repository/getUserByEmail";
export { updateUser } from "./repository/updateUser";