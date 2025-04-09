"use client";

import { Todo } from "@/types/todo";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { toggleTodo } from "@/lib/actions/todo";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export function TodoList({ data }: { data: Todo[] }) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleCheck = (id: string) => {
    startTransition(async function () {
      await toggleTodo(id, true);
    });
    router.refresh();
  };

  return (
    <div className="divide-zinc-950/5 dark:divide-white/5 divide-y mt-8 max-w-xl">
      {data.map((todo) => (
        <div key={todo.id} className="py-2 flex items-center space-x-3">
          <Checkbox
            checked={todo.done ?? false}
            onChange={() => handleCheck(todo.id)}
          />
          <p className={cn("text-sm/6", todo.done && "line-through")}>
            {todo.title}
          </p>
        </div>
      ))}
    </div>
  );
}
