export type Todo = {
  id: string;
  title: string;
  updatedAt: Date | null;
  createdAt: Date | null;
  done: boolean | null;
  userId: string;
};
