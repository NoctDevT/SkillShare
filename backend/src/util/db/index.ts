import { PrismaClient } from "../../prismaGenerated";

const prisma = new PrismaClient()

export default prisma;

export { createUser } from "./repository/createUser";
export { getUserByEmail } from "./repository/getUserByEmail";
export { updateUser } from "./repository/updateUser";