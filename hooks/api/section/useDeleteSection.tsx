import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { deleteSection } from '@/services/section';

export type UseDeleteSectionOptions = Omit<
  UseMutationOptions<void, AxiosError, string>,
  'mutationKey' | 'mutationFn'
>;

export const useDeleteSection = (options?: UseDeleteSectionOptions) => {
  return useMutation<void, AxiosError, string>({
    mutationKey: ['deleteSection'],
    mutationFn: async (idSection: string) => {
      return deleteSection(idSection);
    },
    ...options,
  });
};
