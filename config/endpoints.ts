import { Endpoints } from '@/types/types';

export const endpoints: Endpoints = {
  todo: {
    addTodo: '/sections/{id}/todos',
    updateTodo: '/sections/{id}/todos/{todoId}',
  },
  section: {
    getAll: '/sections',
    createSectionTodo: '/sections',
    deleteSection: '/sections/{id}',
  },
};
