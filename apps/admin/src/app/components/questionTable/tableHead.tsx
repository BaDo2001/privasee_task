import type { FC } from 'react';
import React from 'react';

import type { TableCellProps } from '@mui/material/TableCell';
import TableCell from '@mui/material/TableCell';
import { default as MuiTableHead } from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

interface HeadCell {
  id: string;
  label: string;
  align?: TableCellProps['align'];
}

const headCells: readonly HeadCell[] = [
  {
    id: 'Question',
    label: 'Question',
  },
  {
    id: 'Assigned To',
    label: 'Assigned to',
  },
  {
    id: 'Answered',
    label: 'Answered',
    align: 'center',
  },
];

const TableHead: FC = () => (
  <MuiTableHead>
    <TableRow>
      <TableCell width={64} />

      {headCells.map((headCell) => (
        <TableCell align={headCell.align} key={headCell.id} sx={{ fontWeight: 'bold' }}>
          {headCell.label}
        </TableCell>
      ))}
      <TableCell width={64} />
    </TableRow>
  </MuiTableHead>
);

export default TableHead;
