"use server";

import { todos } from "@/database/schema";
import { db } from "@/database/drizzle";
import { randomUUID } from "node:crypto";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { eq } from "drizzle-orm";
import { Todo } from "@/types/todo";

export const addTodo = async (title: string) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return {
      success: false,
      message: "You are not logged in.",
    };
  }

  await db.insert(todos).values({
    id: randomUUID(),
    title: title,
    userId: session?.user?.id,
    createdAt: new Date(),
  });

  return {
    success: true,
  };
};

export const fetchTodo = async (search?: string): Promise<Todo[]> => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("You are not logged in.");
  }

  const data = await db
    .select()
    .from(todos)
    .where(eq(todos.userId, session?.user?.id));
  return data;
};

export const toggleTodo = async (id: string, done: boolean) => {
  return db.update(todos).set({ done }).where(eq(todos.id, id)).returning();
};
