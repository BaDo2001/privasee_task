import { useQuery } from '@tanstack/react-query';
import React from 'react';
import QuestionTable from '@/components/questionTable';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useQuestionContext } from '@/contexts/QuestionContext';

const Dashboard = () => {
  const {
    questions: { isLoading, data, error },
  } = useQuestionContext();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Button variant="contained" color="primary" sx={{ alignSelf: 'flex-end' }} component={Link} to="/create">
        Create new question
      </Button>

      <Box sx={{ alignSelf: 'center' }}>
        {isLoading && <CircularProgress />}
        {error && <div>Error: {error.stack}</div>}
        {!isLoading && !data && <div>No data</div>}
      </Box>

      {data && <QuestionTable />}
    </Box>
  );
};

export default Dashboard;
