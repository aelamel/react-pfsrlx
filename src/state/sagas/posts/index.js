import { ACTIONS } from '../../../utils/constants';
import { takeEvery } from 'redux-saga/effects';

function* handleFetchPosts() {
  console.log('hello');
}

function* watchPosts() {
  yield takeEvery(ACTIONS.FETCH_POSTS, handleFetchPosts);
}

export default watchPosts;
