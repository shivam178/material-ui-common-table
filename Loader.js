import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import ReactLoading from "react-loading";
import { CircularProgress } from '@material-ui/core';

const styles = theme => ({
  root: {
    display: 'table',
    width: '100%',
    height: '70vh'
  },
  branchdiv: {
    width: '10%',
    textAlign: '-webkit-center',
    display: 'table-cell',
    verticalAlign: 'middle'
  },
  pText: {
    fontSize: '14px',
    fontFamily: "Montserrat",
    fontWeight: 500,
    color: "#000"
  }

});


class Loader extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      primaryText: this.props.primaryText || 'Loading Data... Please wait',
    };
  }


  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root} style={{ height: this.props.height ? this.props.height : "70vh" }}>
        <div className={classes.branchdiv}>
          {/* spokes , cylon */}
          <CircularProgress />
          {/* <ReactLoading type={'balls'} color="#1976d2" className="center_aligned" />
                    <div className={classes.pText + " center_aligned"}> {this.state.primaryText}</div> */}
        </div>
      </div>
    )
  }
};


export default withStyles(styles)(Loader);

