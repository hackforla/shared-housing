import React from 'react';
import PropTypes from 'prop-types';
import { TableCell, TableRow } from '@material-ui/core/';

export function TenantListItem({ columns, tenant }) {
  return (
    <TableRow hover>
      {columns.map(column => {
        const value = tenant[column.id];
        return (
          <TableCell key={column.id} align={column.align}>
            {column.format && typeof value === 'number'
              ? column.format(value)
              : value}
          </TableCell>
        );
      })}
    </TableRow>
  );
}

TenantListItem.propTypes = {
  columns: PropTypes.shape([]).isRequired,
  tenant: PropTypes.shape({}).isRequired,
};

export default TenantListItem;
