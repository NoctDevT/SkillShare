import { z } from 'zod';

export const CreateUserSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  type: z.enum(['STUDENT', 'TEACHER', 'BOTH']),
});

export type PublicUser = {
    id: string;
    name: string;
    type: 'STUDENT' | 'TEACHER' | 'BOTH';
  };

export type CreateUserInput = z.infer<typeof CreateUserSchema>;
