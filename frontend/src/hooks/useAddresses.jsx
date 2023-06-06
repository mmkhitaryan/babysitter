import api from '@/api';
import { useQuery } from '@tanstack/react-query';

const useAddresses = () =>
  useQuery({
    queryKey: ['addresses'],
    queryFn: ({ signal }) => api.get('/addresses', { signal }).then((res) => res.data),
  });

export default useAddresses;
