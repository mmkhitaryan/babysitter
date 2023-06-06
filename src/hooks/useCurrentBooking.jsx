import { useQuery } from '@tanstack/react-query';
import api from '@/api';

const useCurrentBooking = () =>
  useQuery({
    queryKey: ['current-booking'],
    queryFn: ({ signal }) => api.get('/current_order/', { signal }).then((res) => res.data),
    staleTime: 1000 * 30,
  });

export default useCurrentBooking;
