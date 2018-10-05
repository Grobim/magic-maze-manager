import { connect } from 'react-redux';

import withWidth, { isWidthDown } from '@material-ui/core/withWidth';

import Fab from 'components/Fab';

const mapStateToProps = ({
  app: {
    ui: {
      global: {
        snackbars
      }
    }
  }
}, {
  width
}) => ({
  shouldSlideUp: Boolean((snackbars.reload ||
    snackbars.default.opened ||
    snackbars.login.opened) && isWidthDown('sm', width))
});

export default withWidth()(connect(mapStateToProps)(Fab));
