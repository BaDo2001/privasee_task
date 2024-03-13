import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react';

const CreateQuestion = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography>Create a question</Typography>

      <TextField label="Question" variant="outlined" />
      <TextField label="Assigned to" variant="outlined" />
      <TextField label="Properties" variant="outlined" />
      <TextField label="Answer" variant="outlined" />
      <TextField label="Description" variant="outlined" />
    </Box>
  );
};

export default CreateQuestion;
