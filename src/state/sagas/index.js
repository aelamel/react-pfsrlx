import { all } from 'redux-saga/effects';
import postsSagas from './posts';
import watchAll from './apiSaga';

function* rootSaga() {
  yield all([watchAll(), postsSagas()]);
}

export default rootSaga;
