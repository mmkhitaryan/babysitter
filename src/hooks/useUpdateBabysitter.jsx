import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/api';
import { toast } from 'react-hot-toast';

const useUpdateBabysitter = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => api.put('/babysitter/', data).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries(['profile']);
      toast.success('Профиль отправлен на модерацию');
    },
  });
};

export default useUpdateBabysitter;
