import {
  createReducer,
  INITIAL_STATE,
  listActions
} from '../../utils/reducer.helper';
import { ACTIONS } from '../../utils/constants';

export default createReducer({
  types: listActions(ACTIONS.FETCH_POSTS, {
    dataSelector: ({ data }) => data
  }),
  initialState: INITIAL_STATE
});
