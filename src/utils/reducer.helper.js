const COMMON_ACTIONS = ['START', 'SUCCESS', 'ERROR', 'RESET'];

export const getActionTypes = action => ({
  START: `${action}_START`,
  SUCCESS: `${action}_SUCCESS`,
  ERROR: `${action}_ERROR`,
  RESET: `${action}_RESET`
});
const isInType = (type = '', types = []) => types.includes(type);

export const INITIAL_STATE = {
  loading: false,
  error: null,
  data: null
};

const listMapper = ({
  dataSelector = ({ data }) => data,
  storeKey = 'data'
} = {}) => ({
  START: state => ({
    ...state,
    loading: true
  }),
  SUCCESS: (state, { data }) => ({
    ...state,
    [storeKey]: dataSelector({ data }),
    loading: false,
    error: null
  }),
  ERROR: (state, { error }) => ({
    ...state,
    error,
    loading: false
  }),
  RESET: () => INITIAL_STATE
});

const commonActions = (action = {}, mapper) => {
  const actions = getActionTypes(action);
  return Object.keys(actions).reduce((acc, key) => {
    if (COMMON_ACTIONS.includes(key)) {
      acc.push({ type: actions[key], mapper: mapper[key] });
    }
    return acc;
  }, []);
};

export const createReducer = ({
  types = [],
  initialState = INITIAL_STATE
} = {}) => {
  const getCurrentState = {};
  types.forEach(({ type, mapper = () => initialState }) => {
    getCurrentState[type] = mapper;
  });

  return (state = initialState, action) =>
    !isInType(action.type, Object.keys(getCurrentState))
      ? state
      : getCurrentState[action.type](state, action);
};

export const listActions = (action, config) =>
  commonActions(action, listMapper(config));
