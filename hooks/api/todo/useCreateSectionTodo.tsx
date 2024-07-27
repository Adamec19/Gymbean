import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { createSectionTodo } from '@/services/todo/todoServices';
import { CreateTodo } from '@/services/todo/todoServices.types';

export type UseCreateSectionTodoOptions = Omit<
  UseMutationOptions<void, AxiosError, CreateTodo>,
  'mutationKey' | 'mutationFn'
>;

export const useCreateSectionTodo = (options?: UseCreateSectionTodoOptions) => {
  return useMutation<void, AxiosError, CreateTodo>({
    mutationKey: ['createSectionTodo'],
    mutationFn: async (request: CreateTodo) => {
      return createSectionTodo(request);
    },
    ...options,
  });
};
