import { useQuery } from '@tanstack/react-query';
import api from '@/api';

const useBabysitter = (id) =>
  useQuery({
    queryKey: ['babysitter', id],
    queryFn: ({ signal }) => api.get(`/babysitter/${id}`, { signal }).then((res) => res.data),
    enabled: !!id,
  });

export default useBabysitter;
