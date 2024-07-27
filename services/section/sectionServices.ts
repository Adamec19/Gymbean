import { AxiosRequestConfig } from 'axios';

import { makeRequest } from '../ApiService';
import { endpoints } from '@/config/endpoints';
import { Section, SectionUpdate } from './sectionServices.types';

export const getAllSection = (config: AxiosRequestConfig = {}) => {
  return makeRequest<Section[]>(
    'get',
    `${endpoints.section.getAll}`,
    undefined,
    config,
    true
  );
};

export const createSection = (
  request: SectionUpdate,
  config: AxiosRequestConfig = {}
) => {
  return makeRequest<void>(
    'post',
    endpoints.section.createSectionTodo,
    request,
    config
  );
};

export const deleteSection = async (
  idSection: string,
  config: AxiosRequestConfig = {}
): Promise<void> => {
  return makeRequest<void>(
    'delete',
    endpoints.section.deleteSection.replace('{id}', idSection),
    null,
    config
  );
};
