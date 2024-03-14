import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react';
import { Question } from '../../lib/types';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useMutation } from '@tanstack/react-query';
import { createQuestion } from '../../lib/api';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

type Form = Pick<Question, 'Question' | 'Assigned To' | 'Properties' | 'Answer' | 'Question Description'>;

const CreateQuestion = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    defaultValues: {
      'Question': '',
      'Answer': '',
      'Assigned To': '',
      'Question Description': '',
      'Properties': '',
    },
  });

  const navigate = useNavigate();

  const { mutate, isPending, error } = useMutation<unknown, AxiosError, Form>({
    mutationFn: async (data) => {
      await createQuestion({
        ...data,
        'Assigned To': data['Assigned To'] || undefined,
        'Company Name': 'Test Company',
        '_companyId': 1,
        'Created At': new Date().toISOString(),
        'Updated At': new Date().toISOString(),
        'Created By': 'test@example.com',
        'Updated By': 'test@example.com',
      });

      navigate('/');
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutate(data);
  });

  return (
    <form onSubmit={onSubmit}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, px: 20 }}>
        <Typography variant="h1" sx={{ fontSize: 24 }}>
          Create a question
        </Typography>

        {error && <Typography sx={{ color: '#ef4444' }}>{error.message}</Typography>}

        <Box>
          <TextField
            sx={{ width: '100%' }}
            label="Question (required)"
            variant="outlined"
            {...register('Question', { required: 'Question is required' })}
          />
          <Typography sx={{ color: '#ef4444' }}>{errors.Question?.message ?? ''}</Typography>
        </Box>

        <TextField label="Answer" variant="outlined" {...register('Answer')} />
        <TextField label="Assigned to" variant="outlined" {...register('Assigned To')} />
        <TextField label="Description" variant="outlined" {...register('Question Description')} />
        <TextField label="Properties" variant="outlined" {...register('Properties')} />

        <Button type="submit" variant="contained" disabled={isPending}>
          {isPending ? 'Creating...' : 'Create'}
        </Button>
      </Box>
    </form>
  );
};

export default CreateQuestion;
