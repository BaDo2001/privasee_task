import TableCell, { TableCellProps } from '@mui/material/TableCell';
import { default as MuiTableHead } from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React, { FC } from 'react';

type HeadCell = {
  id: string;
  label: string;
  align?: TableCellProps['align'];
};

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
        <TableCell key={headCell.id} sx={{ fontWeight: 'bold' }} align={headCell.align}>
          {headCell.label}
        </TableCell>
      ))}
      <TableCell width={64} />
    </TableRow>
  </MuiTableHead>
);

export default TableHead;
