import { UserSchema } from "@src/models/user/UserSchema";
import { updateUser, getUserByEmail } from "@src/util/db";
import { User } from "prisma/app/generated/prisma/client";
import { logger } from "@src/util/loggerUtils";



export async function handleUserOnboarding(data: unknown): Promise<User> {
  const parsedUser = UserSchema.parse(data);
  const updatedUser =  updateUser(parsedUser)

  if (!updatedUser) {
    logger.error("User.service: Updated User returned Null");
    throw new Error("DB error has occurred");
  }

  return updatedUser;

}

export async function getUserFromDb(email: string ): Promise<User> {
    const UserObj = await getUserByEmail(email);

    if(!UserObj) {
        logger.info(`User not found for email: ${UserObj}`)
        throw new Error("User not found");
    }

    return UserObj;
}