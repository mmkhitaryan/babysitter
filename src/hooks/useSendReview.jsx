import api from '@/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

const useSendReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, text, rating }) => api.post(`/reviews/${id}`, { id, text, rating }).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries(['reviews']);
      toast.success('Отзыв успешно отправлен');
    },
  });
};

export default useSendReview;
