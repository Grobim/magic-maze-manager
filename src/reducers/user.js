const USER_CONNECT_REQUEST = 'USER_CONNECT_REQUEST';
const USER_CONNECT_SUCCESS = 'USER_CONNECT_SUCCESS';
const USER_CONNECT_ERROR = 'USER_CONNECT_ERROR';

const USER_DISCONNECT_SUCCESS = 'USER_DISCONNECT_SUCCESS';

const USER_STATE_CONNECTING = 'USER_STATE_CONNECTING';
const USER_STATE_CONNECTED = 'USER_STATE_CONNECTED';
const USER_STATE_CONNECTION_ERROR = 'USER_STATE_CONNECTION_ERROR';
const USER_STATE_DISCONNECTED = 'USER_STATE_DISCONNECTED';

const defaultState = {
  state: USER_STATE_DISCONNECTED
};

const user = (state = defaultState, { type, payload } = {}) => {
  switch (type) {
    case USER_CONNECT_REQUEST:
      return {
        ...state,
        state: USER_STATE_CONNECTING
      };
    case USER_CONNECT_SUCCESS:
      return {
        ...state,
        ...payload,
        state: USER_STATE_CONNECTED
      };
    case USER_CONNECT_ERROR:
      return {
        ...state,
        state: USER_STATE_CONNECTION_ERROR
      };
    case USER_DISCONNECT_SUCCESS:
      return defaultState;
    default:
      return state;
  }
};

export {
  USER_CONNECT_REQUEST,
  USER_CONNECT_SUCCESS,
  USER_CONNECT_ERROR,
  USER_DISCONNECT_SUCCESS,
  USER_STATE_CONNECTING,
  USER_STATE_CONNECTED,
  USER_STATE_CONNECTION_ERROR,
  USER_STATE_DISCONNECTED
};

export default user;
