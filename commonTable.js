import React from 'react';
import { withStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Loader from './Loader';
import NoDataAvailable from './NoDataAvailable';


const tablePaginationStyles = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5)
  }
}));


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.grey,
    color: theme.palette.common.black,
    fontFamily: 'Lato !important',
    lineHeight: 1,
    padding: 8
  },
  body: {
    fontFamily: 'Lato !important',
    lineHeight: 1,
    padding: 8,
    '& .MuiButton-root': {
      fontSize: 12
    }
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const styles = theme => ({
  table: {
    minWidth: '100%',
    maxHeight: '70vh'
  },
  isSorted: {
    color: '#039ee3 !important',
    '& svg': {
      fill: '#039ee3'
    }
  }
});

function TablePaginationActions(props) {
  const classes = tablePaginationStyles();
  const theme = useTheme();
  const { page, rowsPerPage, onChangePage, count } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick}
        disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

function CommonTable(props) {

  const { classes, headers, count,
    rowsPerPageOptions, loading, pagination, paginationServer } = props;
  let { rows } = props;

  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);


  const cellDataFormat = (data, row, index) => {
    if (typeof data === 'boolean')
      return (data ? <span className="bv-yes">Yes</span> : <span className="bv-no">No</span>)
    else if (typeof data === 'function')
      return data(row, index);
    else
      return data;
  }

  const tableRow = (row, index) => {
    return (
      <StyledTableRow key={index}>
        {
          Object.keys(row).map((col, index) => (
            <StyledTableCell key={`s_table_cell_${index}`}>
              {cellDataFormat(row[col], row, index)}
            </StyledTableCell>
          ))
        }
      </StyledTableRow>
    )
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <TableContainer className={props.styleClasses || classes.table}>
        <Table stickyHeader aria-label="customized table">
          <TableHead>
            <TableRow>
              {
                headers.map((row, index) => (
                  <StyledTableCell align="left" key={`s_cell_${index}`}>
                    {row.sort ?
                      (
                        <TableSortLabel
                          className={ row.isSorted ? classes.isSorted : ''}
                          active={true}
                          direction={row.sortDirection && row.sortDirection.toLowerCase()}
                          onClick={() => props.onSortClick(row.id, row.sortDirection, index)}
                        >
                          {row.name}
                        </TableSortLabel>
                      ) :
                      row.name
                    }
                  </StyledTableCell>
                ))
              }
            </TableRow>
          </TableHead>
          {
            !loading && rows && rows.length > 0 &&
            (
              <>
                <TableBody>
                  {paginationServer ? rows.map((row, index) => tableRow(row, index)) :
                    (rowsPerPage > 0
                      ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      : rows
                    ).map((row, index) => tableRow(row, index))
                  }
                </TableBody>
              </>
            )
          }
        </Table>
        {
          loading && <Loader />
        }
        {
          !loading && rows && rows.length === 0 &&
          (
            <NoDataAvailable />
          )
        }
      </TableContainer>
      {
        rows && rows.length > 0 && pagination &&
        <TablePagination
          component="div"
          rowsPerPageOptions={rowsPerPageOptions ? rowsPerPageOptions : [5, 10, 25, 50, { label: 'All', value: -1 }]}
          colSpan={0}
          count={paginationServer ? count : rows.length}
          rowsPerPage={!paginationServer ? rowsPerPage : props.rowsPerPage}
          page={!paginationServer ? page : props.page}
          SelectProps={{
            inputProps: { 'aria-label': 'rows per page' },
            native: true,
          }}
          onChangePage={!paginationServer ? handleChangePage : props.handleChangePage}
          onChangeRowsPerPage={!paginationServer ? handleChangeRowsPerPage : props.handleChangeRowsPerPage}
          ActionsComponent={(prop) => TablePaginationActions({ ...props, ...prop })}
        />
      }
    </>
  );
}

export default withStyles(styles)(CommonTable);