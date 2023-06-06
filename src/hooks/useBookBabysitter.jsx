import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/api';
import { toast } from 'react-hot-toast';

const useBookBabysitter = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, hours, startTime }) =>
      api
        .put(`/babysitter/${id}/book`, { hours, start_time: new Date(startTime).toISOString() })
        .then((res) => res.data),
    onSuccess: () => {
      toast.success('Няня забронирована успешно');
      queryClient.invalidateQueries(['babysitters']);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.error);
    },
  });
};

export default useBookBabysitter;
