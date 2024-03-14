import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { Question } from '../../../lib/types';

export type QuestionFormType = Pick<Question, 'Question' | 'Assigned To' | 'Properties' | 'Answer' | 'Question Description'>;

type Props = {
  type: 'create' | 'update';
  defaultValues: Partial<QuestionFormType>;
  action: (data: QuestionFormType) => Promise<void>;
};

const QuestionForm: FC<Props> = ({ type, defaultValues, action }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QuestionFormType>({
    defaultValues,
  });

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation<unknown, AxiosError, QuestionFormType>({
    mutationFn: async (data) => {
      await action({
        ...data,
        'Assigned To': data['Assigned To'] || undefined,
      });

      await queryClient.invalidateQueries({ queryKey: ['questions'] });

      navigate('/');
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutate(data);
  });

  return (
    <form onSubmit={onSubmit}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, px: 20 }}>
        <Typography variant="h1" sx={{ fontSize: 32, mb: 2 }}>
          {type === 'create' ? 'Create a question' : 'Edit question'}
        </Typography>

        {error && <Typography sx={{ color: '#ef4444' }}>{error.message}</Typography>}

        <Box>
          <TextField
            sx={{ width: '100%' }}
            label="Question (required)"
            variant="outlined"
            {...register('Question', { required: 'Question is required' })}
            disabled={type === 'update'}
          />
          <Typography sx={{ color: '#ef4444' }}>{errors.Question?.message}</Typography>
        </Box>

        <TextField label="Answer" variant="outlined" {...register('Answer')} />
        <TextField label="Assigned to" variant="outlined" {...register('Assigned To')} />
        <TextField label="Description" variant="outlined" {...register('Question Description')} disabled={type === 'update'} />
        <TextField label="Properties" variant="outlined" {...register('Properties')} />

        <Button type="submit" variant="contained" disabled={isPending}>
          {type === 'create' ? <>{isPending ? 'Creating...' : 'Create'}</> : <>{isPending ? 'Updating...' : 'Update'}</>}
        </Button>
      </Box>
    </form>
  );
};

export default QuestionForm;
