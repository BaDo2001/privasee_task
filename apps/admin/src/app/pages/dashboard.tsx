import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getQuestions } from '../../lib/api';
import QuestionTable from '../components/questionTable';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const Dashboard = () => {
  const { isLoading, data, error } = useQuery({ queryKey: ['questions'], queryFn: () => getQuestions({}) });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Button variant="contained" color="primary" sx={{ alignSelf: 'flex-end' }} component={Link} to="/create">
        Create new question
      </Button>

      <Box sx={{ alignSelf: 'center' }}>
        {isLoading && <CircularProgress />}
        {error && <div>Error: {error.stack}</div>}
        {!isLoading && !data && <div>No data</div>}
      </Box>

      {data && <QuestionTable questions={data.data} />}
    </Box>
  );
};

export default Dashboard;
