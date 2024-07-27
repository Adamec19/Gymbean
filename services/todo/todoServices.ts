import { AxiosRequestConfig } from 'axios';

import { makeRequest } from '../ApiService';
import { CreateTodo, Todo } from './todoServices.types';
import { endpoints } from '../../config/endpoints';

export const createSectionTodo = (
  request: CreateTodo,
  config: AxiosRequestConfig = {}
) => {
  return makeRequest<void>(
    'post',
    endpoints.todo.addTodo.replace('{id}', request.sectionId),
    request,
    config
  );
};

export const updateSectionTodo = (
  request: Todo,
  config: AxiosRequestConfig = {}
) => {
  return makeRequest<void>(
    'put',
    endpoints.todo.updateTodo
      .replace('{id}', request.sectionId)
      .replace('{todoId}', request.id),
    request,
    config
  );
};
