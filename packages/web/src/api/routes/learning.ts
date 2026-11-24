import { z } from "zod";
import { ORPCError } from "@orpc/server";
import { eq } from "drizzle-orm";
import { base } from "../__core/app";
import { auth } from "../auth";
import { db } from "../database";
import { progress, waitlist, messages } from "../database/schema";
import { courses, lessonText } from "../../shared/courses";
const protectedBase = base.use(async ({ context, next }) => {
  const session = await auth.api.getSession({ headers: context.headers });
  if (!session) throw new ORPCError("UNAUTHORIZED");
  return next({ context: { user: session.user } });
});
const admin = protectedBase.use(async ({ context, next }) => {
  if (context.user.role !== "admin") throw new ORPCError("FORBIDDEN");
  return next();
});
function accessible(course: string, lesson: number) {
  const c = courses.find((c) => c.id === course);
  return !!c && lesson >= 0 && lesson < c.count && (!!c.free || lesson < 2);
}
export const learning = {
  progress: protectedBase.handler(({ context }) =>
    db.select().from(progress).where(eq(progress.userId, context.user.id)),
  ),
  lesson: protectedBase
    .input(
      z.object({
        course: z.string(),
        lesson: z.number().int(),
        en: z.boolean(),
      }),
    )
    .handler(({ input }) => {
      if (!accessible(input.course, input.lesson))
        throw new ORPCError("FORBIDDEN", {
          message: "Cette leçon n’est pas encore disponible.",
        });
      return { text: lessonText(input.course, input.lesson, input.en) };
    }),
  complete: protectedBase
    .input(z.object({ course: z.string(), lesson: z.number().int() }))
    .handler(async ({ context, input }) => {
      if (!accessible(input.course, input.lesson))
        throw new ORPCError("FORBIDDEN");
      await db
        .insert(progress)
        .values({
          ...input,
          userId: context.user.id,
          createdAt: new Date().toISOString(),
        })
        .onConflictDoNothing();
      return { ok: true };
    }),
  wait: base
    .input(
      z.object({
        course: z.string().max(120),
        contact: z.string().min(5).max(120),
      }),
    )
    .handler(async ({ input }) => {
      await db
        .insert(waitlist)
        .values({ ...input, createdAt: new Date().toISOString() })
        .onConflictDoNothing();
      return { ok: true };
    }),
  contact: base
    .input(
      z.object({
        name: z.string().min(2).max(100),
        email: z.email(),
        message: z.string().min(10).max(4000),
      }),
    )
    .handler(async ({ input }) => {
      await db
        .insert(messages)
        .values({ ...input, createdAt: new Date().toISOString() });
      return { ok: true };
    }),
  admin: admin.handler(async () => ({
    waitlist: await db.select().from(waitlist),
    messages: await db.select().from(messages),
    progress: await db.select().from(progress),
  })),
};
