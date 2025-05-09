
import { accountStatus } from "../models/user/accountType";
import { getUserByEmail, createUser } from "../util/db";


export const getUserAuthStatus = async (email: string, providerId: string) => {
  const user = await getUserByEmail(email);

  if (!user) {
    await createUser(email, providerId)
    return {
      needsOnboarding: true,
      user: null,
      email,
      providerId
    }
  } else if (user.accountStatus === accountStatus.PENDING) {
    return {
      needsOnboarding: true,
      user: null,
      email,
      providerId,
    }
  }
  return {
    needsOnboarding: false,
    user,
  };
};
