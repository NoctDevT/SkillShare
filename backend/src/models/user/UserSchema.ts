import { z } from "zod";

export const UserTypeEnum = z.enum(["STUDENT", "TEACHER", "BOTH"]);
export const AccountStatusEnum = z.enum(["NEW", "PENDING", "VERIFIED"]);

export const SkillSchema = z.object({
  id: z.string().uuid().optional(), 
  name: z.string(),
  ownerId: z.string().uuid()
});

export const SessionSchema = z.object({
  id: z.string().uuid().optional(), 
  studentId: z.string().uuid(),
  teacherId: z.string().uuid(),
  topic: z.string(),
  scheduledAt: z.coerce.date(), 
});

export const SkillsArraySchema = z.array(SkillSchema);
export const SessionsArraySchema = z.array(SessionSchema);

export const UserSchema = z.object({
  // id: z.string(), 
  name: z.string(),
  email: z.string().email(),
  type: UserTypeEnum,
  createdAt: z.coerce.date(), 
  updatedAt: z.coerce.date(),
  provider: z.string(),
  providerId: z.string(),
  accountStatus: AccountStatusEnum
});

export const UserCreateSchema = UserSchema.omit({
  createdAt: true,
  updatedAt: true,
  provider: true,
  providerId: true
}).extend({
  name: z.string().optional(), 
  provider: z.string().optional(),
  providerId: z.string().optional(),
  skills: SkillsArraySchema.optional(),
  studentSessions: SessionsArraySchema.optional(),
  teacherSessions: SessionsArraySchema.optional()
});

export const OnboardingSchema = UserSchema.pick({
  name: true,
  type: true,
  accountStatus: true
});

export type UserInputType = z.infer<typeof UserCreateSchema>;
export type UserOnboardingType = z.infer<typeof OnboardingSchema>;
