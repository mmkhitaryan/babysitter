import { AnimatePresence, m } from 'framer-motion';

const ErrorMessage = ({ children }) => {
  return (
    <AnimatePresence>
      {children && (
        <m.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ease: 'easeInOut' }}
          className='text-xs text-center text-negative font-semibold'
        >
          {children}
        </m.div>
      )}
    </AnimatePresence>
  );
};

export default ErrorMessage;
