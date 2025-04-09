"use client";

import { ComponentProps, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { ErrorMessage, Field, Label } from "@/components/ui/fieldset";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { todoSchema } from "@/lib/validation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { addTodo } from "@/lib/actions/todo";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function AddTodo(props: ComponentProps<typeof Button>) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof todoSchema>>({
    defaultValues: { title: "" },
    resolver: zodResolver(todoSchema),
  });

  function onSubmit(formData: z.infer<typeof todoSchema>) {
    startTransition(async function () {
      const { message } = await addTodo(formData.title);
      if (message) {
        toast.error(message);
      } else {
        router.refresh();
        setIsOpen(false);
      }
    });
  }

  return (
    <>
      <Button
        type="button"
        onClick={() => {
          setIsOpen(true);
          reset();
        }}
        {...props}
      />
      <Dialog open={isOpen} onClose={setIsOpen}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Add Task</DialogTitle>
          <DialogDescription>Add a new task to your list.</DialogDescription>
          <DialogBody>
            <Field>
              <Label htmlFor="title">Title</Label>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <Input id="title" type="title" {...field} />
                )}
              />
              {errors.title && (
                <ErrorMessage>{errors.title.message}</ErrorMessage>
              )}
            </Field>
          </DialogBody>
          <DialogActions>
            <Button type="button" plain onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {isPending ? "Adding task..." : "Add task"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
