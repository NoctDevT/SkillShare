import prisma from '../index';

export const getUserByEmail = async (email: string) => {
    return await prisma.user.findUnique({ where: { email } });
  };
