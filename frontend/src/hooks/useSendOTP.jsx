import { useMutation } from '@tanstack/react-query';
import api from '@/api';

const useSendOTP = () =>
  useMutation({
    mutationFn: (phone) => api.post('/login/', { phone }).then((res) => res.data),
  });

export default useSendOTP;
