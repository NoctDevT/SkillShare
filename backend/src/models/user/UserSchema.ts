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

export const UserCreateSchema = z.object({
  name: z.string().optional(),
  email: z.string().email(),
  provider: z.string().optional(),
  providerId: z.string().optional(),
  accountStatus: AccountStatusEnum,
  type: UserTypeEnum,
  skills: SkillsArraySchema.optional(),
  studentSessions: SessionsArraySchema.optional(),
  teacherSessions: SessionsArraySchema.optional(),
})


export const OnboardingSchema = z.object({
  name: z.string(),
  type: UserTypeEnum,
  accountStatus: AccountStatusEnum
});

export type UserInputType = z.infer<typeof UserCreateSchema>;
export type UserOnboardingSchema = z.infer<typeof OnboardingSchema>;

