import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/api';
import { toast } from 'react-hot-toast';

const useUpdateBabysitterAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (avatar) => {
      const fd = new FormData();
      fd.append('avatar', avatar);

      return api.post('/babysitter/avatar', fd).then((res) => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['profile']);
      toast.success('Аватарка успешно загружена');
    },
  });
};

export default useUpdateBabysitterAvatar;
