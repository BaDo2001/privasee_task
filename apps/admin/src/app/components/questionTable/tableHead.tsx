import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import { default as MuiTableHead } from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React, { FC } from 'react';
import { Question } from '../../../lib/types';

interface HeadCell {
  id: keyof Question;
  label: string;
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
];

const TableHead: FC = () => (
  <MuiTableHead>
    <TableRow>
      <TableCell width={64} />

      {headCells.map((headCell) => (
        <TableCell key={headCell.id}>{headCell.label}</TableCell>
      ))}
      <TableCell width={64} />
    </TableRow>
  </MuiTableHead>
);

export default TableHead;
