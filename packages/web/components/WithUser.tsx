import { useEffect, useRef } from 'react';
import {
  useGetLoginUserQuery,
  loggedIn,
  initialized,
  useDispatch,
} from '@what-is-grass/shared';

const WithUser: React.FC = ({ children }) => {
  const { data: user, isLoading } = useGetLoginUserQuery();
  const previousLoaingState = useRef(isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(loggedIn(user));
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (previousLoaingState.current && !isLoading) {
      dispatch(initialized());
    }
    previousLoaingState.current = isLoading;
  }, [isLoading, dispatch]);

  return <>{children}</>;
};

export default WithUser;
