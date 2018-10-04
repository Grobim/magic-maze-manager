import { connect } from 'react-redux';

import DefaultSnackbar from 'components/Snackbars/DefaultSnackbar';

import { closeMessage } from 'actions/ui/global';

const mapStateToProps = ({
  app: {
    ui: {
      global: {
        snackbars: {
          default: {
            opened,
            message,
            actionColor,
            color
          }
        }
      }
    }
  }
}) => ({
  open: opened,
  message,
  actionColor,
  color
});

const mapDispatchToProps = dispatch => ({
  onClose: () => {
    dispatch(closeMessage());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DefaultSnackbar);
