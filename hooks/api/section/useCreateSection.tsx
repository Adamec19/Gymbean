import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { createSection } from '@/services/section';
import { SectionUpdate } from '@/services/section/sectionServices.types';

export type UseCreateSectionOptions = Omit<
  UseMutationOptions<void, AxiosError, SectionUpdate>,
  'mutationKey' | 'mutationFn'
>;

export const useCreateSection = (options?: UseCreateSectionOptions) => {
  return useMutation<void, AxiosError, SectionUpdate>({
    mutationKey: ['createSection'],
    mutationFn: async (request: SectionUpdate) => {
      return createSection(request);
    },
    ...options,
  });
};
