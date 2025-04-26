import prisma from '../index';

export const getUser = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email }
  });
};

