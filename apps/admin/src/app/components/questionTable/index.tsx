import type { ChangeEvent, FC } from 'react';
import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import { useQuestionContext } from '@/contexts/QuestionContext';

import TableHead from './tableHead';
import Toolbar from './toolbar';

const QuestionTable: FC = () => {
  const { selected, questions, updateSelected } = useQuestionContext();

  const questionsData = useMemo(() => questions.data?.data || [], [questions.data]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id: string) => selected.includes(id);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - questionsData.length) : 0;

  const visibleRows = useMemo(
    () => questionsData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [questionsData, page, rowsPerPage],
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Toolbar />
        <TableContainer>
          <Table aria-labelledby="tableTitle" sx={{ minWidth: 750 }}>
            <TableHead />
            <TableBody>
              {questionsData.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} sx={{ textAlign: 'center' }}>
                    No questions found
                  </TableCell>
                </TableRow>
              )}

              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    aria-checked={isItemSelected}
                    hover
                    key={row.id}
                    onClick={() => {
                      updateSelected(row.id);
                    }}
                    role="checkbox"
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                    tabIndex={-1}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        color="primary"
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell>{row.Question}</TableCell>
                    <TableCell>{row['Assigned To']}</TableCell>
                    <TableCell align="center">{row.Answer ? '✅' : '❌'}</TableCell>
                    <TableCell
                      align="right"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <IconButton component={Link} to={`/edit/${row.id}`}>
                        <ChevronRightIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={questionsData.length}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Paper>
    </Box>
  );
};

export default QuestionTable;
