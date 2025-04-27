import { logger } from '@src/util/loggerUtils';
import { Prisma, User } from '../../../prismaGenerated';
import prisma from '../index';
import { getUser } from './getUser';
import { UserInputType } from '@src/models/user/UserSchema';

// using builder pattern approach suggested 
// reusable and allows for partial updates instead of adding overhead on the DB

export const updateUser = async (UserInput: Partial<UserInputType>, authEmail: string): Promise<User> => {
  try {

    const User = await getUser(authEmail);

    if (User) {
      const updateData: Prisma.UserUpdateInput = {};

      if (UserInput.name !== undefined) {
        updateData.name = UserInput.name;
      }

      if (UserInput.type !== undefined) {
        updateData.type = UserInput.type;
      }

      if (UserInput.skills !== undefined) {
        updateData.skills = {
          deleteMany: {},
          create: UserInput.skills,
        };
      }

      if (UserInput.studentSessions !== undefined) {
        updateData.studentSessions = {
          deleteMany: {},
          create: UserInput.studentSessions,
        };
      }

      if (UserInput.teacherSessions !== undefined) {
        updateData.teacherSessions = {
          deleteMany: {},
          create: UserInput.teacherSessions,
        };
      }

      if (UserInput.accountStatus !== undefined) {
        updateData.accountStatus = UserInput.accountStatus;
      }

      if (UserInput.provider !== undefined) {
        updateData.provider = UserInput.provider;
      }

      if (UserInput.providerId !== undefined) {
        updateData.providerId = UserInput.providerId;
      }

      const updatedUser = await prisma.user.update({
        where: { email: authEmail },
        data: updateData,
      });

      return updatedUser;
    } else {
      logger.info("Tried to update an account that does not exist", UserInput);
      throw new Error("An account that does not exist was attempted to be updated");
    }
  } catch (error) {
    throw new Error(`Failed to update user: ${(error as Error).message}`);
  }
};
