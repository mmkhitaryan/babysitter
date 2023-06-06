import { useQuery } from '@tanstack/react-query';
import api from '@/api';

const useProfile = () =>
  useQuery({
    queryKey: ['profile'],
    queryFn: ({ signal }) => api.get('/user/', { signal }).then((res) => res.data),
    staleTime: 1000 * 30,
  });

export default useProfile;
