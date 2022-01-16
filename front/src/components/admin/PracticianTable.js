import React,{ useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
// import professionals from '../../data/pro-data';
import { Checkbox, Chip } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { alpha } from '@mui/material/styles';
import VisibilityIcon from '@mui/icons-material/Visibility';
// import ViewFiles from './ViewFiles';
import TabModal from '../shared/TabModal';
import axios from 'axios';

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
            Practicians
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const columns = [
  {
    id: 'nom',
    numeric: false,
    disablePadding: true,
    label: 'Firtname',
  },
  {
    id: 'prenom',
    numeric: false,
    disablePadding: true,
    label: 'Lastname',
  },
  {
    id: 'nom_medicine',
    numeric: true,
    disablePadding: false,
    label: 'Practice',
  },
  {
    id: 'tel',
    numeric: false,
    disablePadding: false,
    label: 'Phone Number',
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'Status',
  },
  {
    id: 'view',
    numeric: false,
    disablePadding: false,
    label: 'View Files',
  },
];

export default function PracticianTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [selected, setSelected] = React.useState([]);
  const [openViewFiles, setopenViewFiles] = React.useState(false);
  const [allPracticians, setallPracticians] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:2021/getAllPros')
      .then(response => {
        if (response.data) {
          setallPracticians(response.data);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = allPracticians.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  return (
    <Paper sx={{ width: '100%' }}>
      <EnhancedTableToolbar numSelected={selected.length} />

      <TableContainer >
        <Table >
          <TableHead>
            <TableRow>
              {/* <TableCell align="center" colSpan={2}>
                Country
              </TableCell> */}
              {/* <TableCell align="center" colSpan={3}>
                Details
              </TableCell> */}
            </TableRow>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  indeterminate={selected.length > 0 && selected.length < allPracticians.length}
                  checked={allPracticians.length > 0 && selected.length === allPracticians.length}
                  onChange={handleSelectAllClick}
                  inputProps={{
                    'aria-label': 'select all Practicians',
                  }}
                />
              </TableCell>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={'left'}
                  style={{ top: 57, minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {allPracticians
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.code}
                    aria-checked={isItemSelected}

                    selected={isItemSelected}
                  >
                    <TableCell >
                      <Checkbox
                        color="primary"
                        onClick={(event) => handleClick(event, row.id)}
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                      align="left"
                    >
                      {row.nom}
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                      align="left"
                    >
                      {row.prenom}
                    </TableCell>
                    <TableCell align="left">{row.nom_medicine}</TableCell>
                    <TableCell align="left">{row.tel}</TableCell>
                    <TableCell align="left">
                      <Chip
                        size='small'
                        label={ row.status.data[0] ===  1 ? 'verified' : 'pending'}
                        style={{borderColor: row.status.data[0] ===  1 ? 'green':'red'}}
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell align="left">
                      <IconButton size="large" onClick={() => setopenViewFiles(true)} >
                        <VisibilityIcon/>
                      </IconButton>
                    </TableCell>
                    <TabModal
                      // eslint-disable-next-line max-len
                      files={[row.cv, row.diplome]}
                      open={openViewFiles}
                      setopen={setopenViewFiles}/>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={allPracticians.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
