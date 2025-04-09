import { Metadata } from "next";
import { Heading } from "@/components/ui/heading";
import { Input, InputGroup } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { AddTodo } from "@/app/(app)/home/add";
import { Todos } from "@/components/todos";
import { fetchTodo } from "@/lib/actions/todo";

export const metadata: Metadata = { title: "Home" };

export default async function Home() {
  const data = await fetchTodo();
  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-sm:w-full sm:flex-1">
          <Heading>Todo List</Heading>
        </div>
        <AddTodo>Add Todo</AddTodo>
      </div>
      <Todos todos={data} />
    </>
  );
}
