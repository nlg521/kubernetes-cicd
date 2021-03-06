import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import RefreshIcon from '@material-ui/icons/Refresh';
import { RequestConsumer } from './request-context';
import ProductCatalogue from './views/ProductCatalogue';
import { AppView } from './style';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  refreshButton: {
    marginRight: 20,
    marginLeft: 10,
    height: 48,
  },
  menuLogo: {
    fontSize: '32px'
  },
  formControl: {
    margin: 10,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: 10 * 2,
  },
  typography: {
    useNextVariants: true,
  },
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
});
class App extends React.Component {
  state = {
    left: false,
    selectedApp: 'Products',
    anchorEl: null,
    labelWidth: 0,
    userAgentLabelWidth: 0,
    versionLabelWidth: 0,
    appLastUpdate: new Date(),
  }

  handleRefresh = () => {
    console.log('refreshing')
    this.setState({appLastUpdate: new Date()})
  }
  componentDidMount() {
      this.setState({
      })
  }
  render() {
    const { classes } = this.props;
    const productMenu = (<div style={{ display: 'flex', justifyItems: 'center', alignItems: 'center'}}>
      <IconButton onClick={this.handleRefresh} className={classes.refreshButton} color="inherit" aria-label="Menu">
      <RefreshIcon />
    </IconButton>
    </div>
    )
    return (<RequestConsumer>{({ getProduct, listProducts, updateRating }) => (
      <div className={classes.root}>
        <AppBar position="static">
            {productMenu}
        </AppBar>
        <AppView>
          <ProductCatalogue
            getProduct={(id) => getProduct(id)}
            listProducts={() => listProducts()}
            updateRating={(id, value) => updateRating(id, value)}
            lastUpdated={this.state.appLastUpdate}
            />
        </AppView>
      </div>)}
     </RequestConsumer>);
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);