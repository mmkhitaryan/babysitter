import api from '@/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useDeleteBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => api.delete('/current_order').then((res) => res.data),
    onSuccess: () => {
      queryClient.removeQueries(['current-booking']);
    },
    onError: () => {
      toast.error('Что-то пошло не так.');
    },
  });
};

export default useDeleteBooking;
