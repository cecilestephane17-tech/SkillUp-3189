import {
  sqliteTable,
  text,
  integer,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";
export * from "./auth-schema";
export const progress = sqliteTable(
  "progress",
  {
    id: integer().primaryKey({ autoIncrement: true }),
    userId: text().notNull(),
    course: text().notNull(),
    lesson: integer().notNull(),
    createdAt: text().notNull(),
  },
  (t) => [uniqueIndex("progress_unique").on(t.userId, t.course, t.lesson)],
);
export const waitlist = sqliteTable(
  "waitlist",
  {
    id: integer().primaryKey({ autoIncrement: true }),
    course: text().notNull(),
    contact: text().notNull(),
    createdAt: text().notNull(),
  },
  (t) => [uniqueIndex("waitlist_unique").on(t.course, t.contact)],
);
export const messages = sqliteTable("messages", {
  id: integer().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  email: text().notNull(),
  message: text().notNull(),
  createdAt: text().notNull(),
});
