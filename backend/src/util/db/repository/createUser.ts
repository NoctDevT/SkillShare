import prisma from '../index';

export const createUser = async (email: string, providerId: string) => {
    return await prisma.user.create({
      data: {
        email,
        accountStatus: 'PENDING',
        providerId: providerId
      },
    });
  };