import api from '@/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

const useUploadCertificate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ formData }) => api.post('/certificates/', formData).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries(['certificates']);
      toast.success('Сертификат успешно загружен');
    },
  });
};

export default useUploadCertificate;
