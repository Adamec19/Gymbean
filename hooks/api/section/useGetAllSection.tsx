import { useQuery } from '@tanstack/react-query';

import { getAllSection } from '@/services/section';

type UseGetAllSectionProps = {
  forceEnabled?: boolean;
};

export function useGetAllSection({
  forceEnabled = true,
}: UseGetAllSectionProps) {
  return useQuery({
    queryKey: ['sections'],
    queryFn: async () => {
      return getAllSection();
    },
    enabled: forceEnabled,
  });
}
