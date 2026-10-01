"use server";

import { todos } from "@/database/schema";
import { db } from "@/database/drizzle";
import { randomUUID } from "node:crypto";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { and, eq } from "drizzle-orm";
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

export const fetchTodo = async (): Promise<Todo[]> => {
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
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return {
      success: false,
      message: "You are not logged in.",
    };
  }

  // Only the owner's to-do matches, so nobody can tick off someone else's.
  const updated = await db
    .update(todos)
    .set({ done })
    .where(and(eq(todos.id, id), eq(todos.userId, session.user.id)))
    .returning();

  if (updated.length === 0) {
    return {
      success: false,
      message: "To-do not found.",
    };
  }

  return {
    success: true,
  };
};
