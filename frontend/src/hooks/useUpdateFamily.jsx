import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/api';
import { toast } from 'react-hot-toast';

const useUpdateFamily = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => api.put('/family/', data).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries(['profile']);
      toast.success('Профиль успешно обновлен');
    },
  });
};

export default useUpdateFamily;
