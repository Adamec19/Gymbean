import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { updateSectionTodo } from '@/services/todo/todoServices';
import { Todo } from '@/services/todo/todoServices.types';

export type UseUpdateSectionTodoOptions = Omit<
  UseMutationOptions<void, AxiosError, Todo>,
  'mutationKey' | 'mutationFn'
>;

export const useUpdateSectionTodo = (options?: UseUpdateSectionTodoOptions) => {
  return useMutation<void, AxiosError, Todo>({
    mutationKey: ['updateSectionTodo'],
    mutationFn: async (request: Todo) => {
      return updateSectionTodo(request);
    },
    ...options,
  });
};
