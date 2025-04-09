"use client";

import type { Todo } from "@/types/todo";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { toggleTodo } from "@/lib/actions/todo";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function Todos({ todos }: { todos: Todo[] }) {
  return (
    <div className="divide-y divide-zinc-950/5 dark:divide-white/5 mt-8 max-w-xl">
      {todos.map((todo) => (
        <TodoItem key={todo.id} item={todo} />
      ))}
    </div>
  );
}

export function TodoItem({ item }: { item: Todo }) {
  const router = useRouter();
  const [selected, setSelected] = useState(item.done ?? false);

  const handleCheck = async (id: string, done: boolean) => {
    setSelected(done);
    await toggleTodo(id, done);
    router.refresh();
  };

  return (
    <div key={item.id} className="flex items-center space-x-3">
      <Checkbox
        checked={selected}
        onChange={() => handleCheck(item.id, !item.done)}
      />
      <p className={cn("text-sm/6 py-3", selected && "line-through")}>
        {item.title}
      </p>
    </div>
  );
}
