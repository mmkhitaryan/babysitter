import api from '@/api';
import { useQuery } from '@tanstack/react-query';

const useCertificates = () =>
  useQuery({
    queryKey: ['certificates'],
    queryFn: ({ signal }) => api.get('/certificates/', { signal }).then((res) => res.data),
  });

export default useCertificates;
