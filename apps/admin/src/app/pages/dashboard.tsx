import React from 'react';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

import QuestionTable from '@/components/questionTable';
import { useQuestionContext } from '@/contexts/QuestionContext';

const Dashboard = () => {
  const {
    questions: { isLoading, data },
  } = useQuestionContext();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Button color="primary" component={Link} sx={{ alignSelf: 'flex-end' }} to="/create" variant="contained">
        Create new question
      </Button>

      <Box sx={{ alignSelf: 'center' }}>{isLoading ? <CircularProgress /> : null}</Box>

      {data ? <QuestionTable /> : null}
    </Box>
  );
};

export default Dashboard;
