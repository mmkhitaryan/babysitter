import { useTitle as useTitleLib } from 'react-use';

const useTitle = (title) => {
  useTitleLib(`${title} — Baby Bee`);
};

export default useTitle;
