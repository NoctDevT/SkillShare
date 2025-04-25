import { User } from 'prisma/app/generated/prisma/client';
import prisma from '../index';

export const getUserByEmail = async (email: string): Promise<User | null>  => { 
  return await prisma.user.findUnique({ where: { email } });
};
