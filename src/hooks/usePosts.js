import useQuery from './useQuery';
import { fetchPosts as action } from '../state/actions/posts';

const selector = state => state.posts;
const usePosts = (config = {}) => useQuery({ action, selector, ...config });

export default usePosts;
