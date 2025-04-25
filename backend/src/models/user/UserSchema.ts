import { z } from "zod";

export const UserTypeEnum = z.enum(["STUDENT", "TEACHER", "BOTH"]);
export const AccountStatusEnum = z.enum(["NEW", "PENDING", "VERIFIED"]);

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  type: UserTypeEnum,
  createdAt: z.coerce.date(), 
  updatedAt: z.coerce.date(),
  provider: z.string(),
  providerId: z.string(),
  accountStatus: AccountStatusEnum
});
