import api from '@/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useDeleteCertificate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => api.delete(`/certificates/${id}`).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries(['certificates']);
    },
    onError: () => {
      toast.error('Что-то пошло не так.');
    },
  });
};

export default useDeleteCertificate;
