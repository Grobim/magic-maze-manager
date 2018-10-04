const globalSelector = state => state.app.ui.global;
const drawerOpenedSelector = state => globalSelector(state).drawerOpened;

export {
  globalSelector,
  drawerOpenedSelector
};
