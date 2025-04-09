import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "@/auth-schema";

export const todos = pgTable("todos", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
  done: boolean("done"),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

export const events = pgTable("events", {
  id: text("id").primaryKey(),
  title: text("title"),
  date: timestamp("date"),
  location: text("location"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

export const transactions = pgTable("transactions", {
  id: text("id").primaryKey(),
  amount: text("amount"),
  eventId: text("event_id")
    .notNull()
    .references(() => events.id, { onDelete: "cascade" }),
  paymentMethod: text("payment_method"),
  paymentStatus: text("payment_status"),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});
