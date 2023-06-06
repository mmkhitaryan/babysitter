import { useMutation } from '@tanstack/react-query';
import api from '@/api';

const useLogin = () => {
  return useMutation({
    mutationFn: (data) => api.post('/login/', data).then((res) => res.data),
  });
};

export default useLogin;
