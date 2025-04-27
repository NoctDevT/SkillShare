import prisma from "../../src/util/db";

export async function createTestDbUser() {

    await prisma.user.create({
      data: {
        email: "johnsmith@example.com",
        name: "Placeholder Name",
        type: "STUDENT",
        accountStatus: "NEW",
        provider: "auth0",
        providerId: "auth0|test123",
        createdAt: new Date(),
        updatedAt: new Date(),
        skills: { create: [] },
        studentSessions: { create: [] },
        teacherSessions: { create: [] }
      }
    });
  }
  
  export async function deleteTestUser() {
    await prisma.user.deleteMany({
      where: {
        email: "johnsmith@example.com",
      }
    });
  }
  