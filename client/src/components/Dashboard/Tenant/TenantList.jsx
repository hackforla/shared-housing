import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core/';
import { TenantListItem } from './TenantListItem';

const columns = [
  { id: 'name', label: 'TENANT NAME', minWidth: 30 },
  { id: 'unitMatch', label: 'UNIT MATCHES', minWidth: 30 },
  { id: 'handicap', label: 'HANDICAP ONLY?', minWidth: 30 },
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 350,
  },
});

export function TenantList({ tenants }) {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {tenants.map(tenant => {
              return <TenantListItem columns={columns} tenant={tenant} />;
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

TenantList.propTypes = {
  tenants: PropTypes.shape([]).isRequired,
};

export default TenantList;
