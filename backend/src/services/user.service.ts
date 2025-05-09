import { UserCreateSchema, UserOnboardingType, OnboardingSchema } from "../models/user/UserSchema"
import { updateUser, getUserByEmail } from "../util/db";
import { User } from "../prismaGenerated";
import { logger } from "../util/loggerUtils";

export class UserService {
  /**
   * Handles onboarding a user into the system
   * @param authEmail Email from authentication (OIDC AUTH0).
   * @returns Updated User object from the database.
   */
  public static async handleOnboarding(data: UserOnboardingType, authEmail: string): Promise<User> {
    const parsedUser = OnboardingSchema.parse(data);

    try {
      const updatedUser = await updateUser(parsedUser, authEmail);

      if (!updatedUser) {
        logger.error("UserService: handleOnboarding encountered a DB error");
        throw new Error("Database error occurred during onboarding.");
      }

      return updatedUser;
    } catch (error) {
      logger.error("UserService: handleOnboarding error", error);
      throw new Error("An error occurred during onboarding: " + (error instanceof Error ? error.message : String(error)));
    }
  }

  /**
   * Returns a user from the database via email.
   * @param email User email (OIDC EMAIL)
   * @returns User object
   */
  public static async getUser(email: string): Promise<User> {
    try {
      const user = await getUserByEmail(email);

      if (!user) {
        logger.info(`UserService: No user found for email: ${email}`);
        throw new Error("User not found.");
      }

      return user;
    } catch (error) {
      logger.error("UserService: getUserByEmail error", error);
      throw new Error("An error occurred while retrieving user: " + (error instanceof Error ? error.message : String(error)));
    }
  }
}
