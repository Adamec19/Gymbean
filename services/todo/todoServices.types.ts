export type Priority = 'High' | 'Medium' | 'Low';

export type CreateTodo = Omit<Todo, 'id'>;

export type Todo = {
  id: string;
  sectionId: string;
  deadline: number;
  name: string;
  description: string;
  isDone: boolean;
  priority: { id: number; value: Priority };
};
