import { combineReducers } from 'redux';

import user from './user';
import ui from './ui';
import profile from './profile';

const app = combineReducers({
  user,
  ui,
  profile
});

export default app;
