import api from '@/api';
import { useQuery } from '@tanstack/react-query';

const useReviews = (id) =>
  useQuery({
    queryKey: ['reviews', id],
    queryFn: ({ signal }) => api.get(`/reviews/${id}`, { signal }).then((res) => res.data),
    enabled: !!id,
  });

export default useReviews;
