import { call, put, race, take, takeEvery } from 'redux-saga/effects';
import { ACTIONS } from '../../utils/constants';

function* handleCallbacks(action) {
  const {
    subTypes: { START, SUCCESS, ERROR },
    onSuccess,
    onError
  } = action;
  yield take(START);
  const { success, error } = yield race({
    success: take(SUCCESS),
    error: take(ERROR)
  });
  if (success && onSuccess && typeof onSuccess === 'function') {
    onSuccess(success.data);
  }
  if (error && onError && typeof onError === 'function') {
    onError(error);
  }
}

function* handleApiCalls(action) {
  const { request, subTypes, ...options } = action;
  const { START, SUCCESS, ERROR } = subTypes;
  yield put({ type: START });
  try {
    const response = (yield call(request)) || {};
    yield put({ type: SUCCESS, data: response.data });
  } catch (err) {
    yield put({ type: ERROR, err });
  }
}

function* watchAll() {
  yield takeEvery(ACTIONS.COMMON_API_CALL, handleApiCalls);
  yield takeEvery(ACTIONS.COMMON_API_CALL, handleCallbacks);
}

export default watchAll;
