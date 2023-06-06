import { useQuery } from '@tanstack/react-query';
import api from '@/api';

const useBabysitters = (params) =>
  useQuery({
    queryKey: ['babysitters', params],
    queryFn: ({ signal }) => api.get('/babysitters/', { params, signal }).then((res) => res.data),
  });

export default useBabysitters;
