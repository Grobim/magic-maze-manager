import { connect } from 'react-redux';

import ReloadSnackbar from 'components/Snackbars/ReloadSnackbar';

const mapStateToProps = ({
  app: {
    ui: {
      global: {
        snackbars: {
          reload
        }
      }
    }
  }
}) => ({
  open: reload
});

export default connect(mapStateToProps)(ReloadSnackbar);
