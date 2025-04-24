import { getUserByEmail } from "../util/db/repository/getUserByEmail";

export const getUserAuthStatus = async (email: string, providerId: string) => {
  const user = await getUserByEmail(email);

  if (!user) {
    return {
      needsOnboarding: true,
      user: null,
      email,
      providerId,
    };
  }
  return {
    needsOnboarding: false,
    user,
  };
};
