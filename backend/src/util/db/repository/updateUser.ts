import { User } from 'prisma/app/generated/prisma/client';
import prisma from '../index';

export const updateUser = async (UserObj: User) => {
    const {email} = UserObj;
    try {
        const updatedUser = await prisma.user.update({
            where: { email },
            data: UserObj,
        });

        return updatedUser;
    } catch (error) {
        throw new Error(`Failed to update user:  ${(error as Error).message}`);
    }
};
