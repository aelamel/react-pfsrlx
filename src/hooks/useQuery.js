import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const useQuery = ({
  action,
  consumer = true,
  selector = state => state,
  resetAction,
  resetOnUnmount = true,
  lazy = true
} = {}) => {
  const dispatch = useDispatch();

  const get = config => dispatch(action(config));
  const { loading, error, loaded, data } = useSelector(state =>
    consumer ? selector(state) : emptyObj
  );
  useEffect(() => {
    if (!lazy) {
      get(params);
    }
    return () => {
      if (resetOnUnmount && action) {
        dispatch(resetAction());
      }
    };
  }, [lazy]);
  return {
    get,
    loading,
    error,
    loaded,
    data
  };
};

export default useQuery;
