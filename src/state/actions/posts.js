import { ACTIONS } from '../../utils/constants';
import { getActionTypes } from '../../utils/reducer.helper';
import axios from 'axios';

export const fetchPosts = ({ onSuccess, onError } = {}) => ({
  type: ACTIONS.COMMON_API_CALL,
  subTypes: getActionTypes(ACTIONS.FETCH_POSTS),
  request: () =>
    axios.get('https://jsonplaceholder.typicode.com/posts?_limit=20'),
  onSuccess,
  onError
});
